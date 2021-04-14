import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ShopItem from '../Components/ShopItem'
import colors from '../Constants/colors'

const ShopScreen = () => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.background}}>
            <ShopItem />
        </View>
    )
}

export default ShopScreen

const styles = StyleSheet.create({})
