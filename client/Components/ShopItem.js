import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Dimensions,Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../Constants/colors'
import { Entypo,AntDesign,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';

const ShopItem = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} disabled>
            <LinearGradient
                // Background Linear Gradient
                start={{x:0.1,y:0.1}}
                colors={['#f34ef5', '#8e20f9']}
                style={styles.gradient}
                locations={[0,0.9]}
            >
                <LinearGradient
                    start={{x:0.5,y:0}}
                    colors={['#723b8b', '#1f0832']}
                    style={styles.insideContainer}
                >
                    <LinearGradient
                        start={{x:0.5,y:0}}
                        colors={['#723b8b', '#1f0832']}
                        style={styles.imageContainer}
                    >
                        <Image source={require('../assets/socks.jpg')} style={{flex:1,width:'100%'}}/>
                    </LinearGradient>
                <View style={styles.bottomContainer}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginBottom:10}}>
                        <LinearGradient start={{x:0,y:0.5}} colors={['#f34ef5', '#8e20f9']} style={styles.line}></LinearGradient>
                        <Text style={{fontWeight:'bold',fontSize:20,color:'white',textAlign:'center'}}>KOTH Custom</Text>
                        <LinearGradient start={{x:0,y:0.5}} colors={['#8e20f9','#f34ef5']} style={styles.line}></LinearGradient>
                    </View>

                    <Text style={{paddingHorizontal:10,textAlign:'center',color:'white'}}>Ces chaussettes blanches KOTH en polyestere seront parfaites pour tes matchs les plus tendus</Text>

                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',fontWeight:'600',color:"white",fontSize:45,fontFamily:'LaskiSansStencil-Black'}}>500</Text>
                        <AntDesign name="star" size={30} color={colors.purple} />
                    </View>
                    <Text style={{textAlign:'center',color:'rgb(230,230,230)'}}>À venir</Text>

                </View>
                </LinearGradient>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ShopItem

const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:'85%',
        borderRadius:20,
        shadowColor: "#f34ef5",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    },
    gradient:{
        flex:1,
        padding:2,
        borderRadius:19,
    },
    insideContainer:{
        flex:1,
        backgroundColor:'#2b113e',
        borderRadius:18,
        alignItems:'center',
        paddingTop:10
    },
    imageContainer:{
        width:"90%",
        borderRadius:18,
        borderWidth:1,
        borderColor:"#8e20f9",
        flex:2
    },
    bottomContainer:{
        flex:1,
        width:'100%',
        justifyContent:'center'
    },
    line:{
        height:1,
        width:50,
    }
})
