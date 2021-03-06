import React,{useState} from 'react'
import { StyleSheet, Text,TouchableOpacity} from 'react-native'
import { Entypo } from '@expo/vector-icons';

import colors from '../../Constants/colors'


const ZoomToMe = (props) => {
    
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <Text>
                <Entypo name="location" size={30} color={colors.background} />
            </Text>
        </TouchableOpacity>
    )
}

export default ZoomToMe

const styles = StyleSheet.create({})
