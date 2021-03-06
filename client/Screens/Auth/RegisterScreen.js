import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image, Dimensions, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import axios from 'axios'

import url from '../../Constants/url'
import colors from '../../Constants/colors'
import LargeButton from '../../Components/Boutons/LargeButton'

const width = Dimensions.get('window').width

const RegisterScreen = () => {
    const [pseudo, setPseudo] = useState("")
    const [tel, setTel] = useState("")
    const [pwd, setPwd] = useState("")
    const [psdValid, setPsdValid] = useState()
    const [pwdValid, setPwdValid] = useState()
    const [telValid, setTelValid] = useState()
    const [errorMessage, setErrorMessage] = useState(" ")
    const [isLoading, setIsLoading] = useState(false)

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
            console.log(response.data.message)
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
        return (psdValid == styles.goodInput && telValid === styles.goodInput && pwdValid === styles.goodInput)
    }

    const checkPseudo = (text) => {
        var format = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;
        var format2 = /[aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ]/
        if(text.length === "" || format.test(text) || !format2.test(text)){
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
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex:1,justifyContent:'center',alignItems:'center'}}
        >
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1,width:width,justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                    <Image source={require('../../assets/logo.png')} style={{width:width/2,height:width/2}}/>
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

                    <View style={{width:'85%',marginTop:30, alignItems:'center'}}>
                        <LargeButton fontSize={25} onPress={handleRegister}>
                            {isLoading && <ActivityIndicator color="white"/>}
                            {!isLoading && "M'inscrire"}
                        </LargeButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
