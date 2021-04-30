import React from 'react'
import { View, Text } from 'react-native'
import { BigHead } from 'react-native-bigheads'

export default function Avatar(props) {
    return (
        <BigHead
            accessory="shades"
            bgColor="blue"
            bgShape="circle"
            body="chest"
            clothing="tankTop"
            clothingColor="black"
            eyebrows="angry"
            eyes="wink"
            facialHair="mediumBeard"
            graphic="vue"
            hair="short"
            hairColor="black"
            hat="none"
            hatColor="green"
            lashes={false}
            lipColor="purple"
            mouth="open"
            showBackground={true}
            size={props.size}
            skinTone="brown"
        />
    )
}
