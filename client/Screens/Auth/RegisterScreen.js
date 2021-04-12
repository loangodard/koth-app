import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image, Dimensions, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux'
import {login} from '../../store/actions/auth'

import url from '../../Constants/url'
import colors from '../../Constants/colors'
import LargeButton from '../../Components/Boutons/LargeButton'

const width = Dimensions.get('window').width

const storeUserData = async (token,userId) => {
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify({token:token,userId:userId}))
      
    } catch (e) {
        console.log(e);
    }
}

const RegisterScreen = (props) => {
    const [pseudo, setPseudo] = useState("")
    const [tel, setTel] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdRepeat, setPwdRepeat] = useState("")
    const [psdValid, setPsdValid] = useState()
    const [pwdValid, setPwdValid] = useState()
    const [pwdRepeatValid, setPwdRepeatValid] = useState({})
    const [telValid, setTelValid] = useState()
    const [errorMessage, setErrorMessage] = useState(" ")
    const [isLoading, setIsLoading] = useState(false)

    const handleConnexion = () => {
        setIsLoading(true)
        axios({
            method: 'post',
            url: url + '/login',
            data: {
                identifiant:pseudo,
                password:pwd
            }
        }).then(response=>{
            props.login(response.data.data._id,response.data.data.login_token)
            storeUserData(response.data.data.login_token,response.data.data._id)
            setIsLoading(false)
        }).catch(err=>{
            console.log(err)
            setIsLoading(false)
            setErrorMessage(err.response.data.message)
        })
    }

    const handleRegister = () => {
        setIsLoading(true)
        if(!areInputValids()){
            setIsLoading(false)
            return setErrorMessage('Veuillez remplir tous les champs correctement')
        }
        axios({
            method: 'post',
            url: url + '/register',
            data: {
                pseudo:pseudo,
                tel:tel,
                password:pwd
            }
        }).then(response=>{
            console.log(response.data.success)
            if(response.data.success){
                console.log('connexion . . .')
                handleConnexion()
            }
            setIsLoading(false)
        }).catch(err=>{
            setIsLoading(false)
            setErrorMessage(err.response.data.message)
        })

    }

    const handleOnInputChange = (text,hook) => {
        hook(text);
    }

    const areInputValids = () => {
        return (psdValid == styles.goodInput && telValid === styles.goodInput && pwdValid === styles.goodInput && pwdRepeatValid === styles.goodInput)
    }

    const checkPseudo = (text) => {
        var format = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/
        var format2 = /[aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ]/
        if(text.length === "" || format.test(text) || !format2.test(text) || text.length > 14){
            return setPsdValid(styles.warningInput)
        }
        setPsdValid(styles.goodInput)
    }
 

    const checkPhone = (text) => {
        if(isNaN(text) || text.length<10){
            setTelValid(styles.warningInput)
        }else{
            setTelValid(styles.goodInput)
        }
    }

    const checkPassword = (text) => {
        if(text.length < 8){
            setPwdValid(styles.warningInput)
        }else if(text.length > 7) {
            setPwdValid(styles.goodInput)
        }
        else{
            setPwdValid({})
        }
    }

    const checkPasswordRepeat = (text) => {
        if(text == pwd && pwdValid == styles.goodInput){
            setPwdRepeatValid(styles.goodInput)
        }else{
            setPwdRepeatValid(styles.warningInput)
        }
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1,justifyContent:'center',alignItems:'center'}}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{flex:2,paddingBottom:10}}>
                    <Image source={require('../../assets/logo.png')} style={{ flex:1,width: undefined,height: undefined,aspectRatio: 1}}/>
                </View>
                <View style={{flex:6,width:width,justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                    <View>
                        <Text style={{color:'red',marginVertical:5}}>{errorMessage}</Text>
                    </View>

                    <View style={{width:'85%'}}>
                        <Text style={styles.label}>Pseudo</Text>
                        <TextInput style={{...styles.input,...psdValid}} placeholder="Pseudo" onChangeText={(text) => {checkPseudo(text);return handleOnInputChange(text,setPseudo)}}/>
                    </View>

                    <View style={{width:'85%',marginTop:15}}>
                        <Text style={styles.label}>Téléphone</Text>
                        <TextInput style={{...styles.input,...telValid}} placeholder="Téléphone" onChangeText={(text) => {checkPhone(text);return handleOnInputChange(text,setTel)}} keyboardType={"phone-pad"} maxLength={10}/>
                    </View>

                    <View style={{width:'85%',marginTop:15}}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput style={{...styles.input,...pwdValid}} placeholder="Mot de passe" secureTextEntry onChangeText={(text) => {checkPassword(text);return handleOnInputChange(text,setPwd)}}/>
                    </View>

                    <View style={{width:'85%',marginTop:15}}>
                        <Text style={styles.label}>Confirmez le mot de passe</Text>
                        <TextInput style={{...styles.input,...pwdRepeatValid}} placeholder="Mot de passe" secureTextEntry onChangeText={(text) => {checkPasswordRepeat(text);return handleOnInputChange(text,setPwdRepeat)}}/>
                    </View>

                    <View style={{width:'85%',marginTop:30, alignItems:'center'}}>
                        <LargeButton fontSize={25} onPress={handleRegister}>
                            {isLoading && <ActivityIndicator color="white"/>}
                            {!isLoading && "M'inscrire"}
                        </LargeButton>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default connect(
    null,
    {login}
  )(RegisterScreen);

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
    }
})
