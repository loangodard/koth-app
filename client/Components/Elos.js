import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import shadow from '../Constants/shadow'

const Elos = () => {
    return (
        <View style={{...shadow,...styles.container}}>
            <View style={styles.elo}>
                <AntDesign name="user" size={24} color="black" />
                <Text>
                    1000
                </Text>
            </View>
        </View>
    )
}

export default Elos

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        borderRadius:20,
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        height:60
    },
    barre:{
        height:'100%',
        borderRightWidth:1
    },
    elo:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'50%'
    }
})
