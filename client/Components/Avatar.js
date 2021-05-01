import React,{useEffect,useState,useCallback} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { BigHead } from 'react-native-bigheads'
import {useSelector} from 'react-redux'
import axios from 'axios'
import url from '../Constants/url'

import { useFocusEffect } from '@react-navigation/native';

export default function Avatar(props) {
    const [avatar, setAvatar] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    let userId = useSelector(state => state.userId)

    useFocusEffect(
        useCallback(
            () => {
                if(props.userId){
                    userId = props.userId
                }
                setIsLoading(true)
                axios.get(url+'/avatar/'+userId).then(response => {
                    setAvatar(response.data.avatar)
                    setIsLoading(false)
                })
            },
            [],
        )
    )
    
    if(isLoading){
        return <View style={{width:props.size,height:props.size,justifyContent:"center",alignItems:"center"}}><ActivityIndicator/></View>
    }else{
        return (
            <View style={{paddingBottom:13}}>
            <BigHead
                accessory={avatar.accessory||"none"}
                bgColor={avatar.bgColor||"green"}
                bgShape="circle"
                body={avatar.body || "chest"}
                clothing={avatar.clothing || "naked"}
                clothingColor={avatar.clothingColor || "white"}
                eyebrows={avatar.eyeBrows || "raised"}
                eyes={avatar.eyes || "normal"}
                facialHair={avatar.facialHair || "stubble"}
                graphic="none"
                hair={avatar.hair || "short"}
                hairColor={avatar.hairColor || "brown"}
                hat={avatar.hat || "none"}
                hatColor={avatar.hatColor || "red"}
                lashes={false}
                lipColor="red"
                mouth={avatar.mouth || "serious"}
                showBackground={true}
                size={props.size}
                skinTone={avatar.skinTone || "yellow"}
            />
            </View>
        )
    }
}
