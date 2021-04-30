import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {useSelector} from 'react-redux'
import { Feather } from '@expo/vector-icons';

import colors from '../Constants/colors'

import Avatar from '../Components/Avatar'

const UserScreen = (props) => {
    const userId = useSelector(state => state.userId)
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <View>
                    <Avatar size={200} userId={userId}/>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Avatar')} style={{position:'absolute',right:50,bottom:0,backgroundColor:'rgba(252,252,252,0.9)',borderRadius:30,padding:5}} >
                        <Feather name="edit-2" size={22} color="black"/>
                    </TouchableOpacity>
                </View>
                <Text style={{color:"white",fontSize:20,fontWeight:'600'}}>@Loan</Text>
            </View>
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.background,
        flex:1,
        alignItems:'center'
    },
    avatarContainer:{
        alignItems:"center",
        justifyContent:"center"
    }
})
