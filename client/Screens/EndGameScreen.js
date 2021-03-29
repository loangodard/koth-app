import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'

import axios from 'axios'
import url from '../Constants/url'
import openSocket from "socket.io-client";
import Modal from 'react-native-modal';
import { Entypo,AntDesign  } from '@expo/vector-icons';
import colors from '../Constants/colors'
import LottieView from 'lottie-react-native';




const EndGameScreen = ({navigation,route}) => {
    const [socket, setSocket] = useState(openSocket(url))
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        console.log(new Date())
        socket.emit('join_end_game', {room: route.params.lobby,userId : route.params.userId, vote:route.params.vote});
    }, [])

    socket.on('voted',()=>{
        setShowModal(true)
    })

    return (
        <View style={styles.container}>
            <Modal
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                    <Text style={{fontFamily:"LaskiSansStencil-Black",fontSize:50,textAlign:'center',color:"white"}}>Victoire</Text>
                    <LottieView source={require('../assets/win-animation.json')} autoPlay style={{height:200,zIndex:1}}/>
                    <View style={{width:'100%',height:100,justifyContent:'center',alignItems:'center',marginTop:10}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'white',fontSize:20}}>
                                <Text style={{fontWeight:'600'}}>Classement</Text> : +5 <Entypo name="trophy" size={25} color={colors.gold} />
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'white',fontSize:20}}>
                                <Text style={{fontWeight:'600'}}>Étoiles</Text> : +10 <AntDesign name="star" size={25} color={colors.purple} />
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {socket.disconnect();navigation.navigate('Home')}}>
                        <Text style={{color:'white', fontSize:20,textDecorationLine:'underline'}}>Quitter</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={{width:'70%',alignItems:'center'}}>
                <Text style={styles.text}>En attente des votes des autres joueurs</Text>
                <Button onPress={() => setShowModal(true)} title='show'/>
            </View>
        </View>
    )
}

export default EndGameScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    text:{
        fontSize:30,
        color:"white",
        fontWeight:'700',
        textAlign:'center'
    },
    modal:{
        backgroundColor:'black',
        padding:25,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
})
