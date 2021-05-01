import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, {Callout} from 'react-native-maps';
import axios from 'axios'
import moment from 'moment/min/moment-with-locales'
import findZone from '../utils/findZone'

import { Entypo } from '@expo/vector-icons';

import colors from '../Constants/colors'
import url from '../Constants/url'
import Avatar from '../Components/Avatar';

const width = Dimensions.get('window').width

const CalloutGame = (props) => {
    const [match, setMatch] = useState({
        team1:[{}],
        team2:[{}],
        position:{}
    })

    useEffect(() => {
        moment.locale('fr')
        axios.get(url+'/matchById/'+props.match).then(match => setMatch(match.data))
    }, [])
    return (
        <Callout style={styles.container}>
            <View style={{width:width*0.5,padding:10}}>
                <View style={{marginBottom:10}}>
                    <Text style={{fontWeight:'700',fontSize:20,textAlign:'center'}}>Match Récent</Text>
                    <Text style={{color:'grey',textAlign:'center'}}>{moment(match.date_debut).fromNow()}</Text>
                </View>


                <View style={{width:'100%',borderWidth:1,borderColor:'blue',padding:5}}>
                    {match.team1.map((joueur,index) => {
                        let joueurElo
                        for(const zone of props.zones){
                            if(findZone.isInside(match.position,zone.border)){
                                joueurElo = joueur.elos.find(e => e.zone == zone._id).elo
                            }
                        }
                        return(
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}} key={index}>
                                <Avatar size={50} userId={joueur._id}/>
                                <Text style={{fontWeight:'600'}}>{joueur.pseudo}</Text>
                                <Text>{joueurElo} <Entypo name="trophy" size={15} color={colors.gold} /></Text>
                            </View>
                        )
                    })}
                </View>

                <Text style={{textAlign:'center',fontSize:30,fontFamily:'LaskiSansStencil-Black',marginVertical:4}}>VS</Text>
                <View style={{width:'100%',borderWidth:1,borderColor:'red',padding:5}}>
                    {match.team2.map((joueur,index) => {
                        let joueurElo
                        for(const zone of props.zones){
                            if(findZone.isInside(match.position,zone.border)){
                                joueurElo = joueur.elos.find(e => e.zone == zone._id).elo
                            }
                        }
                        return(
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}} key={index}>
                                <Avatar size={50} userId={joueur._id}/>
                                <Text style={{fontWeight:'600'}}>{joueur.pseudo}</Text>
                                <Text>{joueurElo} <Entypo name="trophy" size={15} color={colors.gold} /></Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </Callout>
    )
}

export default CalloutGame

const styles = StyleSheet.create({
    container:{

    }
})
