import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../Constants/colors'

const ShareScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperTop}>
                <View style={styles.shadow}>
                <LinearGradient
                    // Background Linear Gradient
                    start={{x:0.1,y:0.1}}
                    colors={['#da5bd4', '#8e6cfb']}
                    style={styles.gradient}
                    locations={[0,0.9]}
                >
                    <View style={{flex:1,borderWidth:1,borderRadius:9,justifyContent:'center',alignItems:'center',borderColor:"white"}}>
                        <Text style={styles.counter}>4/5</Text>
                    </View>
                </LinearGradient>
                </View>
            </View>
            <View style={styles.wrapperBottom}>

            </View>
        </View>
    )
}

export default ShareScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1
    },
    wrapperTop:{
        flex:1,
        padding:50
    },
    wrapperBottom:{
        flex:1,
    },
    gradient:{
        flex:1,
        borderRadius:10,
        padding:7,
        shadowColor: colors.pink,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    counter:{
        fontSize:80,
        fontFamily:'LaskiSansStencil-Black',
        color:'white'
    },
    shadow:{
        flex:1,
        shadowColor: colors.pink,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }
})
