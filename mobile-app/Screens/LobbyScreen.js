import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

import colors from '../Constants/colors'
import LargeButton from '../Components/LargeButton'

const width = Dimensions.get('window').width

const LobbyScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <QRCode
                    value="HKJ8B"
                    color={"white"}
                    backgroundColor={colors.background}
                    size={width*0.4}
                />
                <Text style={{color:'white',fontSize:23,marginTop:15,fontWeight:'600'}}>HKJ8B</Text>
            </View>

            <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <View style={{flex:1, borderWidth:1,borderColor:"blue",height:'100%'}}></View>
                <View style={{flex:1, borderWidth:1,borderColor:"red",height:'100%'}}></View>
            </View>
            <LargeButton style={{height:50,marginVertical:20}} fontSize={30}>Prêt</LargeButton>
        </View>
    )
}

export default LobbyScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
})
