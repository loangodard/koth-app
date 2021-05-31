import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Avatar from '../Components/Avatar'
import axios from 'axios'
import url from '../Constants/url'
import colors from '../Constants/colors';


const data = [
    {
        id:1,
        pseudo:"Loan",
        elo:1500
    },
    {
        id:2,
        pseudo:"Malo",
        elo:1300
    },
    {
        id:3,
        pseudo:"Loan",
        elo:1200
    },
    {
        id:4,
        pseudo:"Loan",
        elo:1188
    },
    {
        id:5,
        pseudo:"Loan",
        elo:1089
    },
    {
        id:6,
        pseudo:"Loan",
        elo:1000
    }
]

const width = Dimensions.get('window').width

const UserInRank = (props) => {
    let border;

    return(
        <View style={{...styles.joueur,...border}}>
            <View style={{justifyContent:'center',marginRight:10}}>
                <Text style={styles.rank}>#{props.rang + 3}</Text>
            </View>
            <View style={{flex:1,flexDirection:"row",alignItems:'center'}}>
                <Avatar size={75} userId={props.joueur.id}/>
                <Text style={{color:"white",fontSize:18 ,fontWeight:'600'}}>{props.joueur.pseudo}</Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                <Text style={{color:"white",fontSize:16,fontWeight:'500'}}>{props.joueur.elo} <Entypo name="trophy" size={22} color={"gold"} /></Text>
            </View>
        </View>
    )
}

const RankScreen = ({navigation,route}) => {
    const [classement, setClassement] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [premier, setPremier] = useState({})
    const [deuxieme, setDeuxieme] = useState({})
    const [troisieme, setTroisieme] = useState({})

    useEffect(() => {
        navigation.setOptions({ title: route.params.nomZone })
        axios.get(url+'/classement/'+route.params.zoneId).then(classement=>{
            let rank = classement.data
            setPremier(rank.shift())
            setDeuxieme(rank.shift())
            setTroisieme(rank.shift())
            setClassement(rank)
            setIsLoading(false)
        })
    }, [])

    const content = (
            <View style={styles.rankContainer}>
                <View style={styles.podiumContainer}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>

                        <View style={{flex:4,alignItems:'center',justifyContent:"center"}}>
                            <Avatar size={100} userId={deuxieme.id}/>
                            <Text style={{color:"white",fontWeight:'bold',fontSize:20}}>{deuxieme.pseudo}</Text>
                            <FontAwesome5 name="medal" size={20} color="#a19d94"/>
                            <Text style={{color:'white',fontWeight:"600"}}>{deuxieme.elo} <Entypo name="trophy" size={22} color={"gold"} /></Text>
                        </View>

                        <View style={{flex:5,alignItems:'center',justifyContent:"center"}}>
                            <Avatar size={140} userId={premier.id}/>
                            <Text style={{color:"white",fontWeight:'bold',fontSize:20}}>{premier.pseudo}</Text>
                            <FontAwesome5 name="medal" size={25} color="gold"/>
                            <Text style={{color:'white',fontWeight:"600"}}>{premier.elo} <Entypo name="trophy" size={22} color={"gold"} /></Text>
                        </View>

                        <View style={{flex:4,alignItems:'center',justifyContent:"center"}}>
                            <Avatar size={100} userId={troisieme.id}/>
                            <Text style={{color:"white",fontWeight:'bold',fontSize:20}}>{troisieme.pseudo}</Text>
                            <FontAwesome5 name="medal" size={20} color="#cd7f32"/>
                            <Text style={{color:'white',fontWeight:"600"}}>{troisieme.elo} <Entypo name="trophy" size={22} color={"gold"} /></Text>
                        </View>
                    </View>
                </View>
                <FlatList data={classement} renderItem={({item,index}) => <UserInRank joueur={item} rang={index+1}/>}/>
            </View>
    )
    
    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator color="white"/>}
            {!isLoading && content}
        </View>
    )
}

export default RankScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.background
    },
    joueur:{
        borderWidth:1,
        borderColor:"white",
        width:width*0.9,
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        marginBottom:20,
        marginHorizontal:width*0.05
    },
    topContainer:{
        width:"100%",
        paddingTop:10
    },
    rankContainer:{
        flex:1,
        width:"100%"
    },
    rank:{
        color:'white',
        fontSize:12,
        fontWeight:'700',
        borderWidth:1,
        borderColor:'white',
        padding:3,
        borderRadius:5,
        borderWidth:1
    },
    podiumContainer:{
        height:250
    }
})
