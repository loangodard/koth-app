import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image, Dimensions, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {connect} from 'react-redux'
import {login} from '../../store/actions/auth'

import url from '../../Constants/url'
import colors from '../../Constants/colors'
import LargeButton from '../../Components/Boutons/LargeButton'

const width = Dimensions.get('window').width

const LoginScreen = (props) => {
    const storeUserData = async (token,userId) => {
        try {
          await AsyncStorage.setItem('@userData', JSON.stringify({token:token,userId:userId}))
          
        } catch (e) {
            console.log(e);
        }
    }
    const [identifiant, setIdentifiant] = useState("")
    const [pwd, setPwd] = useState("")
    const [errorMessage, setErrorMessage] = useState(" ")
    const [isLoading, setIsLoading] = useState(false)

    const handleConnexion = () => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: url + '/login',
            data: {
                identifiant:identifiant,
                password:pwd
            }
        }).then(response=>{
            props.login(response.data.data._id,response.data.data.login_token)
            storeUserData(response.data.data.login_token,response.data.data._id)
            setIsLoading(false)
        }).catch(err=>{
            setIsLoading(false)
            setErrorMessage(err.response.data.message)
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1,justifyContent:'center',alignItems:'center'}}
        >
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1,width:width,justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                    <Image source={require('../../assets/logo.png')} style={{width:width/2,height:width/2}}/>
                    <Text style={styles.KOTH}>KOTH</Text>
                    <View>
                        <Text style={{color:'red',marginVertical:5}}>{errorMessage}</Text>
                    </View>

                    <View style={{width:'85%'}}>
                        <Text style={styles.label}>Identifiant</Text>
                        <TextInput style={styles.input} placeholder="Pseudo ou numéro de téléphone" onChangeText={(text) => setIdentifiant(text)}/>
                    </View>

                    <View style={{width:'85%',marginTop:15}}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry onChangeText={(text) => setPwd(text)}/>
                    </View>

                    <TouchableOpacity style={{width:'85%',marginTop:15}} activeOpacity={0.7} onPress={()=>props.navigation.navigate('register')}>
                        <Text style={{textAlign:'center',color:'white',fontWeight:'600'}}>Pas encore de compte ? <Text style={{color:colors.pink}}>Inscrivez-vous</Text></Text>
                    </TouchableOpacity>

                    <View style={{width:'85%',marginTop:30, alignItems:'center'}}>
                        <LargeButton fontSize={25} onPress={handleConnexion}>
                            {isLoading && <ActivityIndicator color="white"/>}
                            {!isLoading && "Connexion"}
                        </LargeButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    )
}

export default connect(
    null,
    {login}
  )(LoginScreen);

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.background,
        width:width
    },
    input:{
        width:'100%',
        padding:10,
        backgroundColor:"white",
        borderRadius:20,
        opacity:0.9
    },
    label:{
        color:"white",
        marginBottom:10,
        marginLeft:10,
        fontWeight:'700'
    },
    warningInput:{
        borderColor:'red',
        borderWidth:2
    },
    goodInput:{
        borderColor:'green',
        borderWidth:2
    },
    KOTH:{
        color:'white',
        fontSize:85,
        fontFamily:'LaskiSansStencil-Black'
    }
})
