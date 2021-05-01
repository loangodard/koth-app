import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import colors from '../Constants/colors'
import Avatar from './Avatar'

const width = Dimensions.get('window').width

const Joueur = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Avatar userId={props.userId} size={50}/>
                <View style={{flexDirection:'column',marginTop:3,alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.username}>{props.username}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.elo}>{props.elo} </Text><Entypo name="trophy" size={23} color={colors.gold} />                
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Joueur

const styles = StyleSheet.create({
    container: {
        width:width*0.46,
        borderWidth:1,
        padding:5,
        borderColor:'white',
        borderRadius:5,
        marginVertical:3,
        marginHorizontal:width*0.015,
    },
    username:{
        color:'white',
        fontSize:20,
        fontWeight:'600'
    },
    elo:{
        color:'white'
    }
})
