import React, {useEffect,useState,useRef,useCallback} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar, ActivityIndicator, SafeAreaView, AppState } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import {useSelector} from 'react-redux'
import MapView, {Callout, Marker, Polygon} from 'react-native-maps';
import * as Location from 'expo-location';
import {connect} from 'react-redux'
import {logout} from '../store/actions/auth'

import { Entypo,AntDesign,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../Constants/colors'

import PlayButton from '../Components/Boutons/PlayButton'
import ZoomToMe from '../Components/Boutons/ZoomToMe'
import {isInside} from '../utils/findZone'
import axios from 'axios'
import url from '../Constants/url'

import CalloutGame from '../Components/CalloutGame'
import Avatar from '../Components/Avatar'


const width = Dimensions.get('window').width


const MainScreen = (props) => {
    const userId = useSelector(state => state.userId)
    let mapView = useRef()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [zones, setZones] = useState([])
    const [actualZone, setActualZone] = useState({nom:"",id:""})
    const [isInAZone, setIsInAZone] = useState(false)
    const [elo, setElo] = useState("-")
    const [isEloLoading, setIsEloLoading] = useState(false)
    const [coins, setCoins] = useState()
    const [recentGameMarker, setRecentGameMarker] = useState(null)
    const [inGameMarker, setInGameMarker] = useState([])

    useEffect(() => {
            (async () => { //Request access to geolocation
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location_ = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location_.coords.latitude,
                longitude: location_.coords.longitude,
                latitudeDelta: 0.0992,
                longitudeDelta: 0.0591,
            });
        })();
        }, [])

    /**
     * Fetching zone
     */
    useEffect(() => {
        const fetchData = () => {
            axios.get(url+'/zones').then(response => {
                setZones(response.data)
            })
    
            axios.get(url+'/game-markers').then(matchs => {
                setRecentGameMarker(matchs.data.matchs24H)
            })
    
            axios.get(url+'/is-in-game/'+userId).then(match =>{
                if(match.data){
                    if(!match.data.isGameOver){
                        props.navigation.navigate('Game',{room:match.data.lobby})
                    }
                }
            })
        }

        fetchData()

    }, [])

    useFocusEffect(
        useCallback(
            () => {
                const fetchDataOnFocus = async () => {
                    axios.get(url+'/coins/'+userId).then(coins => {
                        setCoins(coins.data.coins)
                    })
    
                    axios.get(url+'/game-markers').then(matchs => {
                        setRecentGameMarker(matchs.data.matchs24H)
                    })

                    var indicator = 0 //devient zones.length si on a parcouru toutes les zones)
                    for(const zone of zones){
                        if(isInside({latitude:location.latitude,longitude:location.longitude},zone.border)){
                            setActualZone({nom:zone.nom,id:zone._id})
                            setIsInAZone(true)
                            setIsEloLoading(true)
                            const elo = await axios.get(url+'/elo/'+userId+"&"+zone._id)
                            setIsEloLoading(false)
                            setElo(elo.data.elo)
                            break
                        }
                        indicator++
                    }

                    if(indicator == zones.length){ //sorti de la zone 
                        setActualZone({nom:"",id:""})
                        setElo('--')
                        setIsInAZone(false)
                    }

                }
                fetchDataOnFocus()
            },
            [location,zones],
        )
    )

    /**
     * Gestion de la caméra
     */
    const zoomToCoordinates = (latitude,longitude,zoom=1) => {
        mapView.animateToRegion({
            latitude: latitude,
            longitude:longitude,
            latitudeDelta: 0.0992*(1/zoom),
            longitudeDelta: 0.0591*(1/zoom),
        })
    }

    const handleLocationPressed = () => {
        Location.getLastKnownPositionAsync().then(r=>{
            zoomToCoordinates(r.coords.latitude,r.coords.longitude)
        })
    }

    const handleOnRegionChange = async (region) => {
        const region_ = {
            latitude : region.latitude,
            longitude : region.longitude
        }

        var indicator = 0 //devient zones.length si on a parcouru toutes les zones
        for(const zone of zones){
            if(isInside(region_,zone.border)){
                if(zone._id != actualZone.id){
                    setActualZone({nom:zone.nom,id:zone._id})
                    setIsInAZone(true)
                    setIsEloLoading(true)
                    const elo = await axios.get(url+'/elo/'+userId+"&"+zone._id)
                    setIsEloLoading(false)
                    setElo(elo.data.elo)
                    break
                }
                break
            }
            indicator++
        }
        if(indicator == zones.length){ //sorti de la zone 
            setActualZone({nom:"",id:""})
            setElo('--')
            setIsInAZone(false)
        }
    }

    // GESTION DU RETOUR AU FOCUS
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useFocusEffect(
        useCallback(() => {
          AppState.addEventListener("change", _handleAppStateChange);
      
          return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
          };
        }, [])
    )

    const _handleAppStateChange = (nextAppState) => {
        console.log('--->'+nextAppState)
        if(nextAppState == "background"){
            console.log('bg')
        }
        if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
        ) {
            axios.get(url+'/game-markers').then(matchs => {
                setRecentGameMarker(matchs.data.matchs24H)
            })
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };


    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {/* MAP */}
                <MapView style={styles.mapStyle}
                    ref={ref => (mapView = ref)} //mapView fait référence à l'instance de MapView. Utile pour appeler les méthode de la classe MapView
                    initialRegion={location}
                    showsUserLocation
                    showsMyLocationButton={true}
                    onRegionChange={handleOnRegionChange}
                >
                    {recentGameMarker && recentGameMarker.map((m,index) => {
                        const deltaDates = Math.abs(new Date() - new Date(m.date_debut))+1
                        const uneHeure = 60*60*1000
                        //Delta in [0; 86400000]
                        let opac;
                        if(deltaDates < uneHeure){
                            opac=1
                        }else if(uneHeure <= deltaDates <3*uneHeure){
                            opac=0.8/2
                        }else if(3*uneHeure <= deltaDates < 10*uneHeure){
                            opac=0.5/2
                        }else{
                            opac=0.2/2
                        }
                        //Rouge si le match a moins de 30 minutes
                        const color = (deltaDates < uneHeure / 2) ? "red" : 'black'
                        return(
                            <Marker coordinate={m.position} key={index} onPress={() => {zoomToCoordinates(m.position.latitude+0.0001,m.position.longitude,50)}}>
                            {/* {!m.isGameOver && <View style={{backgroundColor:'white',borderRadius:20,zIndex:10}}><LottieView source={require('../assets/ball-animation.json')} autoPlay loop  style={{height:30,width:30}}/></View>}
                            {m.isGameOver && <View><Image source={require('../assets/past-game.png')} style={{width:35,height:35}}/></View>} */}
                                <MaterialCommunityIcons name="basketball-hoop" size={40} color={color} style={{opacity:opac}}/>
                                <CalloutGame match={m._id} zones={zones} key={index}/>
                            </Marker>
                        )
                    })}
                    {zones.map(z =>{
                        return(
                            <Polygon coordinates={z.border} fillColor="rgba(31,34,50,0.05)" strokeColor="rgba(31,34,50,0.9)" key={z._id}/>
                        )
                    })}
                </MapView>

                <View style={styles.eloContainer} activeOpacity={0.85}>
                    <TouchableOpacity disabled={!isInAZone} onPress={()=>props.navigation.navigate('Classement',{zoneId:actualZone.id,nomZone : actualZone.nom})} style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Text style={styles.elo}>{isEloLoading ? <ActivityIndicator color="black"/> : elo} </Text><Entypo name="trophy" size={25} color={colors.gold} />
                    </TouchableOpacity>
                    <View style={{
                        borderWidth:0.5,
                        height:"90%",
                        marginHorizontal:10,
                        borderColor:'grey'
                    }}></View>
                    <TouchableOpacity style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} onPress={() => props.navigation.navigate('Shop')}>
                        <Text style={styles.elo}>{coins} </Text><AntDesign name="star" size={25} color={colors.purple} />
                    </TouchableOpacity>
                </View>

                {/* SHARE BUTTON */}
                <TouchableOpacity style={styles.notifContainer} onPress={() => props.navigation.navigate('Profil')}>
                        <Avatar size={50} userId={userId}/>
                </TouchableOpacity>

                {/* SHOP BUTTON */}
                <TouchableOpacity style={styles.rankContainer} onPress={() => props.navigation.navigate('Shop')}>
                    <View style={{backgroundColor:'white',borderRadius:20,padding:5}}>
                        <Entypo name="shop" size={20} color="black" />
                    </View>
                </TouchableOpacity>

                {(actualZone.nom !== "") && <View style={styles.zoneTagContainer}><Text style={{fontWeight:'700',fontSize:15}}>{actualZone.nom}</Text></View>}
                
                <View style={styles.buttonBar}>
                    <View style={styles.buttonDivisions}>
                        <TouchableOpacity onPress={()=>props.logout()}>
                            <FontAwesome name="power-off" size={18} color="red" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainButtonDivisions}>
                        <PlayButton onPress={()=>props.navigation.navigate('Menu')}/>
                    </View>
                    <View style={styles.buttonDivisions}>
                        <ZoomToMe onPress={handleLocationPressed}/>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default connect(
    null,
    {logout}
  )(MainScreen);

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
        width: '100%',
        shadowOpacity: 0.4,
        elevation: 1.5,
        marginBottom: 5,
        shadowRadius: 1,
        shadowOffset: {height: 2, width: 0}
      },
      mapStyle: {
        borderBottomLeftRadius:width/2/1.4,
        borderBottomRightRadius:width/2/1.4,
        height: '100%',
        width: '100%',
        shadowOffset: {width: 16.4, height: 1.6}
      },
    eloContainer:{
        width:240,
        maxWidth:"90%",
        height:45,
        position:'absolute',
        top:40,
        backgroundColor:"white",
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:"row",
        padding:7
    },
    elo:{
        fontWeight:'500',
        fontSize:20,
    },
    buttonBar:{
        width:'100%',
        position:'absolute',
        bottom:30,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    buttonDivisions:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    mainButtonDivisions:{
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    zoneTagContainer:{
        width:200,
        maxWidth:"90%",
        height:30,
        position:'absolute',
        top:90,
        backgroundColor:"white",
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:"row",
        padding:7
    },
    notifContainer:{
        position:'absolute',
        borderRadius:20,
        padding:2,
        top:30,
        right:15,
        justifyContent:'center',
        alignItems:'center'
    },
    rankContainer:{
        position:'absolute',
        backgroundColor:colors.purple,
        borderRadius:20,
        padding:2,
        top:45,
        left:20,
        justifyContent:'center',
        alignItems:'center'
    }
})