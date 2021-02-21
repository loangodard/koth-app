import React, {useState} from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import Slider from '@react-native-community/slider';

import LargeButton from '../Components/LargeButton'
import colors from '../Constants/colors'

const InitGameScreen = (props) => {
    const [nombreJoueurs, setNombreJoueurs] = useState(6)
    const [ranked, setRanked] = useState(true)
    const [carte, setCarte] = useState(true)

    return (
        <View style={styles.container}>
            <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
                <Text style={{color:'white',fontSize:70,fontWeight:'700',marginBottom:10}}>{nombreJoueurs/2} vs {nombreJoueurs/2}</Text>
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


                <View style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center',alignItems:'center',marginVertical:10,width:'50%'}}>
                        <Text style={{color:"white",fontSize:18,marginHorizontal:10,textAlign:'center',marginBottom:10}}>Match classé :</Text>
                        <Switch rackColor={{ false: "#767577", true: "#81b0ff" }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(v) => setRanked(v)}
                                value={ranked}
                        />
                    </View>

                    <View style={{justifyContent:'center',alignItems:'center',marginVertical:10,width:'50%'}}>
                        <Text style={{color:"white",fontSize:18,marginHorizontal:10,textAlign:'center',marginBottom:10}}>Match sur la carte :</Text>
                        <Switch rackColor={{ false: "#767577", true: "#81b0ff" }}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(v) => setCarte(v)}
                                value={carte}
                        />
                    </View>
                </View>
            </View>

            <View style={{flex:1, width:'100%',justifyContent:'center',alignItems:'center'}}>
                <LargeButton fontSize={50} onPress={()=> props.navigation.navigate('Lobby')}>GO</LargeButton>
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
})
