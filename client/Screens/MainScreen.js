import React, {useEffect,useState,useRef} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar } from 'react-native'

import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { Entypo,AntDesign  } from '@expo/vector-icons';
import colors from '../Constants/colors'

import PlayButton from '../Components/Boutons/PlayButton'
import ZoomToMe from '../Components/Boutons/ZoomToMe'


const width = Dimensions.get('window').width

const markers = [
    {
        id:1,
        latitude : 48.19974252280393,
        longitude : 3.277498727073468
    },
    {
        id:2,
        latitude : 48.86726,
        longitude : 2.35000
    },
    {
        id:3,
        latitude : 48.83726,
        longitude : 2.33000 
    },
    {
        id:4,
        latitude : 48.83726,
        longitude : 2.33000 
    },
    {
        id:5,
        latitude : 48.83026,
        longitude : 2.33900
    }
]

const MainScreen = (props) => {
    let mapView
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
    }, []);

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


    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>

            {/* MAP */}
            <View style={styles.mapContainer}>
                <MapView style={styles.mapStyle}
                    ref={ref => (mapView = ref)} //mapView fait référence à l'instance de MapView. Utile pour appeler les méthode de la classe MapView
                    initialRegion={location}
                    showsUserLocation
                    showsMyLocationButton={true}
                >
                    {markers.map(m => {
                        return(
                            <Marker coordinate={{ latitude : m.latitude,longitude : m.longitude}} key={m.id} onPress={() => zoomToCoordinates(m.latitude,m.longitude,2)}>
                                    <Image style={{width:45,height:45}} source={require('../assets/hot_place.png')}/>
                            </Marker>
                        )
                    })}
                </MapView>
                
                <View style={styles.buttonBar}>
                    <View style={styles.buttonDivisions}>

                    </View>
                    <View style={styles.buttonDivisions}>
                        <PlayButton onPress={()=>props.navigation.navigate('Nouvelle Partie')}/>
                    </View>
                    <View style={styles.buttonDivisions}>
                        <ZoomToMe onPress={handleLocationPressed}/>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default MainScreen

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
    }
})

// <TouchableOpacity style={styles.eloContainer} activeOpacity={0.85}>
//                 <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
//                     <Text style={styles.elo}>1500 </Text><Entypo name="trophy" size={25} color={colors.gold} />
//                 </View>
//                     <View style={{
//                         borderWidth:0.5,
//                         height:"90%",
//                         marginHorizontal:10,
//                         borderColor:'grey'
//                     }}></View>
//                     <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
//                         <Text style={styles.elo}>200 </Text><AntDesign name="star" size={25} color={colors.purple} />
//                     </View>
// </TouchableOpacity>