import React, {useState} from 'react'
import { StyleSheet, Text, View, Switch, StatusBar } from 'react-native'
import Slider from '@react-native-community/slider';
import {useSelector} from 'react-redux'

import LargeButton from '../Components/Boutons/LargeButton'
import colors from '../Constants/colors'
import shadow from '../Constants/shadow'

const makeid = (length) => {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const InitGameScreen = (props) => {
    const [nombreJoueurs, setNombreJoueurs] = useState(6)
    const [ranked, setRanked] = useState(true)
    const [carte, setCarte] = useState(true)
    const userId = useSelector(state => state.userId)


    return (
        <View style={styles.container}>
            <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
                <View style={{...styles.matchCard,...shadow}}>
                    <Text style={{color:colors.background,fontSize:70,fontWeight:'700'}}>{nombreJoueurs/2} vs {nombreJoueurs/2}</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <Slider
                            style={{width: "80%", height: 40}}
                            minimumValue={2}
                            maximumValue={10}
                            step={2}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            onValueChange={(v)=>setNombreJoueurs(v)}
                            value={6}
                            tapToSeek={false}
                    />
                </View>

            </View>

            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginBottom:30}}>
                <LargeButton fontSize={50} onPress={()=> props.navigation.navigate('Lobby',{lobbyId : makeid(6),userId : userId,nombreJoueurs:nombreJoueurs})}>GO</LargeButton>
            </View>
        </View>
    )
}

export default InitGameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
    matchCard:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'80%',
        backgroundColor:"white",
        borderRadius:20
    }
})
