import React from 'react'
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, Image } from 'react-native'
import colors from '../Constants/colors'

import LargeButton from '../Components/Boutons/LargeButton'

const width = Dimensions.get('window').width

const NewGameScreen = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=> props.navigation.navigate('Creer')}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.buttonTitle}>Créer</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={require('../assets/button1.png')} style={styles.image}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => props.navigation.navigate('Rejoindre')}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.buttonTitle}>Rejoindre</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={require('../assets/button2.png')} style={styles.image}/>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.buttonTitle}>Prévoir</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={require('../assets/button3.png')} style={styles.image}/>
                </View>
            </TouchableOpacity> */}
        </View>
    )
}

export default NewGameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
    button:{
        width:width,
        borderColor:'white',
        flex:1,
        flexDirection:'row'
    },
    buttonTitle:{
        fontFamily:'LaskiSansStencil-Black',
        color:'white',
        fontSize:50
    },
    image:{
        width:width/2,
        height: undefined,
        aspectRatio: 1,
        opacity:0.8
    }
})


// <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
//                 <LargeButton fontSize={28} style={styles.button} onPress={()=> props.navigation.navigate('Creer')}>Créer un match</LargeButton>
//             </View>
//             <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
//                 <LargeButton fontSize={28} style={styles.button}>Rejoindre un match</LargeButton>
//             </View>
//             <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
//                 <LargeButton fontSize={28} style={styles.button} onPress={()=> props.navigation.navigate('Creer')}>Prévoir un match</LargeButton>
// </View>