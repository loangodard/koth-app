import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'

import MapView, {Marker} from 'react-native-maps';

import { Entypo,AntDesign  } from '@expo/vector-icons';
import colors from '../Constants/colors'
import LargeButton from '../Components/LargeButton'

const width = Dimensions.get('window').width

const markers = [
    {
        id:1,
        latitude : 48.85756,
        longitude : 2.34280 
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
    return (
        <View style={styles.container}>

            {/* MAP */}
            <View style={styles.mapContainer}>
                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: 48.85756,
                        longitude: 2.34280,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {markers.map(m => {
                        return(
                            <Marker coordinate={{ latitude : m.latitude,longitude : m.longitude}} key={m.id}>
                                <Image style={{width:40,height:40}} source={require('../assets/hot_place.png')}/>
                            </Marker>
                        )
                    })}
                </MapView>

                <TouchableOpacity style={styles.eloContainer} activeOpacity={0.85}>
                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Text style={styles.elo}>1500 </Text><Entypo name="trophy" size={25} color={colors.gold} />
                </View>
                    <View style={{
                        borderWidth:0.5,
                        height:"90%",
                        marginHorizontal:10,
                        borderColor:'grey'
                    }}></View>
                    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Text style={styles.elo}>200 </Text><AntDesign name="star" size={25} color={colors.purple} />
                    </View>
                </TouchableOpacity>
            </View>
            
            {/* BUTTON */}
            <View style={styles.screen}>
                <LargeButton onPress={()=>props.navigation.navigate('Nouvelle Partie')} fontSize={50}>JOUER</LargeButton>
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
        width: '100%',
        borderBottomLeftRadius:width/2/1.4,
        borderBottomRightRadius:width/2/1.4,
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
    screen:{
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    }
})
