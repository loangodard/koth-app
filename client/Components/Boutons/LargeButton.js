import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Constants/colors'
const width = Dimensions.get('window').width


const LargeButton = (props) => {
    return (
        <TouchableOpacity style={{...styles.playContainer,...props.style}} activeOpacity={0.7} onPress={props.onPress}>
            <LinearGradient
                // Background Linear Gradient
                start={{x:0.1,y:0.1}}
                colors={['#da5bd4', '#8e6cfb']}
                style={styles.playBG}
                locations={[0,0.9]}
            >
                <Text style={{...styles.play,...{fontSize:props.fontSize}}}>{props.children}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default LargeButton

const styles = StyleSheet.create({
    playContainer:{
        width:width*0.7,
        minHeight:80,
        shadowColor: colors.pink,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        backgroundColor:"white",
        borderRadius:20,
        opacity:0.9
    },
    playBG:{
        flex:1,
        borderRadius:20,
        backgroundColor:'#6e38f7',
        justifyContent:'center',
        alignItems:'center'
    },
    play:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    }
})
