import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useLinkProps } from '@react-navigation/native';

const PlayButton = (props) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={props.onPress}>
            <LinearGradient
                // Background Linear Gradient
                start={{x:0.1,y:0.1}}
                colors={['#da5bd4', '#8e6cfb']}
                style={styles.playBG}
                locations={[0,0.9]}
            >
                <Text>
                    <MaterialIcons name="sports-basketball" size={60} color="white" />
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default PlayButton

const styles = StyleSheet.create({
    playBG:{
        width:80,
        height:80,
        borderRadius:80/2,
        justifyContent:'center',
        alignItems:'center'
    }
})
