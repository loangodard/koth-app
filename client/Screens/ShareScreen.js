import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View , ImageBackground, TouchableOpacity,Clipboard, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../Constants/colors'
import { FontAwesome5,Feather } from '@expo/vector-icons';
import {useSelector} from 'react-redux'
import axios from 'axios'
import url from '../Constants/url'

const ShareScreen = () => {
    const userId = useSelector(state => state.userId)
    const [linkCopied, setLinkCopied] = useState(false)
    const [nombreFilleuls, setNombreFilleuls] = useState(0)

    useEffect(() => {
        axios.get(url+'/filleuls/'+userId).then(response=>{
            setNombreFilleuls(response.data.nombre)
        })
    }, [])

    const handlePressed = () => {
        const url_ = 'https://koth-web-app.herokuapp.com/parrainage/'+userId
        Clipboard.setString(url_)
        setLinkCopied(true)
    }

    let topContent;
    if(nombreFilleuls >= 5){
        topContent = (
            <TouchableOpacity style={styles.gradient} onPress={()=>{
                Alert.alert(
                    "Chaussettes Réservées !",
                    "Vous serez informé lorsque vous pourrez retirer vos chaussettes personnalisées",
                    [
                    {
                        text: "Ok",
                        style: "cancel",
                    },
                    ],
                );
            }}>
                <View style={{flex:1,borderWidth:1,borderRadius:9,justifyContent:'center',alignItems:'center',borderColor:"white"}}>
                    <View style={{backgroundColor:'rgba(21,21,21,0.8)',padding:5,borderRadius:10}}>
                        <Text style={{fontFamily:'LaskiSansStencil-Black',color:'white',fontSize:30,textAlign:'center'}}>Réserver mes chaussettes</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }else{
        topContent = (
            <LinearGradient
                // Background Linear Gradient
                start={{x:0.1,y:0.1}}
                colors={['rgba(218, 91, 212,0.4)', 'rgba(142, 108, 251,0.4)']}
                style={styles.gradient}
                locations={[0,0.9]}
            >
                <View style={{flex:1,borderWidth:1,borderRadius:9,justifyContent:'center',alignItems:'center',borderColor:"white"}}>
                    <Text style={styles.counter}>{nombreFilleuls}/5</Text>
                </View>
            </LinearGradient>
        )
    }



    return (
        <View style={styles.container}>
            <View style={styles.wrapperTop}>
                <View style={styles.shadow}>
                    <ImageBackground source={require('../assets/socks.jpg')} style={styles.imageBG}>
                        {topContent}
                    </ImageBackground>
                </View>
                <Text style={{color:'rgb(200,200,200)',textAlign:'center',fontSize:15,fontWeight:'700'}}>Parraine 5 amis et gagne une paire de chaussettes personnalisées dès qu'ils ont tous joué au moins un match</Text>
            </View>
            <View style={styles.wrapperBottom}>
                <TouchableOpacity style={styles.buttonCopy} activeOpacity={0.7} onPress={handlePressed}>
                    {!linkCopied && <FontAwesome5 name="copy" size={70} color="white"/>}
                    {linkCopied && <Feather name="check-square" size={69} color="white" />}
                    <Text style={{fontWeight:'bold',color:'white',fontSize:25,marginLeft:10}}>Copier mon lien</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShareScreen

const styles = StyleSheet.create({
    buttonCopy:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:3,
        borderColor:'white',
        padding:15,
        borderRadius:10
    },
    container:{
        backgroundColor:colors.background,
        flex:1,
        opacity:1
    },
    wrapperTop:{
        flex:2,
        paddingTop:50,
        paddingHorizontal:50
    },
    wrapperBottom:{
        flex:1,
        padding:20,
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around'
    },
    gradient:{
        flex:1,
        borderRadius:10,
        padding:7,
        shadowColor: colors.pink,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    counter:{
        fontSize:80,
        fontFamily:'LaskiSansStencil-Black',
        color:'white'
    },
    shadow:{
        flex:1,
        shadowColor: colors.pink,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    imageBG:{
        flex:1,
        borderRadius:10,
        overflow:'hidden',
        marginBottom:20
    }
})
