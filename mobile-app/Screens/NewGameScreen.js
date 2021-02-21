import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../Constants/colors'

import LargeButton from '../Components/LargeButton'

const width = Dimensions.get('window').width

const NewGameScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <LargeButton fontSize={35} style={styles.button} onPress={()=> props.navigation.navigate('Creer')}>Créer</LargeButton>
            </View>
            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <LargeButton fontSize={35} style={styles.button}>Rejoindre</LargeButton>
            </View>
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
        width:width*.7,
        marginVertical:10
    }
})
