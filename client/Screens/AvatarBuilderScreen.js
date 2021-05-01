import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView, FlatList,ScrollView, ActivityIndicator} from 'react-native'
import {useSelector} from 'react-redux'
import { BigHead } from 'react-native-bigheads'
import axios from 'axios'
import url from '../Constants/url'

const accessories = [{id:1,item:'none',traduction:'Aucun'},{id:2,item:'roundGlasses',traduction:'Lunettes Rondes'} , {id:3,item:'tinyGlasses',traduction:'Petites Lunettes'},{id:4,item:'shades',traduction:'Lunettes de Soleil'} , {id:5,item:'faceMask',traduction:"Masque"}, {id:6,item:'hoopEarrings',traduction:'Créoles'}]
const bgColors = [{id:1,item :'blue',traduction:'Bleu'},{id:3,item :'green',traduction:'Vert'},{id:4,item :'red',traduction:'Rouge'}]
const bodies = [{id:1,item:"chest",traduction:"Homme"},{id:2,item:'breasts',traduction:"Femme"}]
const clothes = [{id:1,item:'naked',traduction:'Aucun'}, {id:2,item:'shirt',traduction:'T-shirt'}, {id:3,item:'dressShirt',traduction:'Cravate'}, {id:4,item:'vneck',traduction:'Col V'}, {id:5,item:'tankTop',traduction:'Marcel'}, {id:6,item:'dress',traduction:'Robe'}, {id:7,item:'denimJacket',traduction:'Veste'}, {id:8,item:'hoodie',traduction:"Hoodie"}, {id:9,item:'chequeredShirt',traduction:"Chemise"}, {id:10,item:'chequeredShirtDark',traduction:"Bûcheron"}]
const clothesColors = [{id:0,item :'white',traduction:'Blanc'},{id:1,item :'blue',traduction:'Bleu'},{id:2,item :'black',traduction:'Noir'},{id:3,item :'green',traduction:'Vert'},{id:4,item :'red',traduction:'Rouge'}]
const eyeBrows = [{id:0,item :'raised',traduction:'Normaux'},{id:1,item :'leftLowered',traduction:'Levé à droite'},{id:2,item :'serious',traduction:'Sérieux'},{id:3,item :'angry',traduction:'Colères'},{id:4,item :'concerned',traduction:'Tristes'}]
const eyesTypes = [{id:0,item :'normal',traduction:'Normaux'},{id:1,item :'leftTwitch',traduction:'Fatigués'},{id:2,item :'happy',traduction:'Joyeux'},{id:3,item :'content',traduction:'Tristes'},{id:4,item :'squint',traduction:'Méfiants'},{id:5,item :'simple',traduction:'Simples'},{id:6,item :'dizzy',traduction:'Morts'},{id:7,item :'wink',traduction:'Clin d\'oeil'},{id:8,item :'hearts',traduction:'Coeurs'},{id:9,item :'crazy',traduction:'Fous'},{id:10,item :'cute',traduction:'Mignons'},{id:11,item :'dollars',traduction:'Dollars'},{id:12,item :'stars',traduction:'Étoiles'},{id:13,item :'cyborg',traduction:'Cyborg'},{id:14,item :'simplePatch',traduction:'Patch'},{id:15,item :'piratePatch',traduction:'Pirate'}]
const facialHairs = [{id:0,item :'none',traduction:'Aucune'},{id:1,item :'stubble',traduction:'Mal rasé'},{id:2,item :'mediumBeard',traduction:'Barbe'},{id:3,item :'goatee',traduction:'Bouc'}]
const graphics = [{id:0,item :'none',traduction:''},{id:1,item :'redwood',traduction:''},{id:2,item :'gatsby',traduction:''},{id:3,item :'vue',traduction:''},{id:4,item :'react',traduction:''},{id:5,item :'graphQL',traduction:''},{id:6,item :'donut',traduction:''},{id:7,item :'rainbow',traduction:''}]
const hairs = [{id:0,item :'none',traduction:'Chauve'},{id:1,item :'long',traduction:'Longs'},{id:2,item :'bun',traduction:'Chignon'},{id:3,item :'short',traduction:'Courts'},{id:4,item :'pixie',traduction:'Carré'},{id:5,item :'balding',traduction:'Calvitie'},{id:6,item :'buzz',traduction:'Très courts'},{id:7,item :'afro',traduction:'Afro'},{id:8,item :'bob',traduction:'Mis-longs'},{id:9,item :'mohawk',traduction:'Crête'}]
const hairColors = [{id:0,item :'blonde',traduction:'Blond'},{id:1,item :'orange',traduction:'Orange'},{id:2,item :'black',traduction:'Noir'},{id:3,item :'white',traduction:'Blanc'},{id:4,item :'brown',traduction:'Brun'},{id:5,item :'blue',traduction:'Bleu'},{id:6,item :'pink',traduction:'Rose'}]
const hats = [{id:0,item :'none',traduction:'Aucun'},{id:1,item :'beanie',traduction:'Bonnet'},{id:2,item :'turban',traduction:'Turban'},{id:3,item :'party',traduction:'Fête'},{id:4,item :'hijab',traduction:'Hijab'}]
const hatsColors = [{id:0,item :'white',traduction:'Blanc'},{id:1,item :'blue',traduction:'Bleu'},{id:2,item :'black',traduction:'Noir'},{id:3,item :'green',traduction:'Vert'},{id:4,item :'red',traduction:'Rouge'}]
const lashes = [{id:0,item :true,traduction:''},{id:1,item :false,traduction:''}]
const lipColors = [{id:0,item :'red',traduction:''},{id:1,item :'purple',traduction:''},{id:2,item :'pink',traduction:''},{id:3,item :'turqoise',traduction:''},{id:4,item :'green',traduction:''}]
const mouths = [{id:0,item :'grin',traduction:'Sourire'},{id:1,item :'sad',traduction:'Triste'},{id:2,item :'openSmile',traduction:'Rire'},{id:3,item :'lips',traduction:'Lèvres'},{id:4,item :'open',traduction:'Ouverte'},{id:5,item :'serious',traduction:'Sérieux'},{id:6,item :'tongue',traduction:'Langue'},{id:7,item :'piercedTongue',traduction:'Langue percée'},{id:8,item :'vomitingRainbow',traduction:'Arc-en-ciel'}]
const skinTones = [{id:0,item :'light',traduction:'Claire'},{id:1,item :'yellow',traduction:'Jaune'},{id:2,item :'brown',traduction:'Marron'},{id:3,item :'dark',traduction:'Sombre'},{id:4,item :'red',traduction:'Rouge'},{id:5,item :'black',traduction:'Noire'}]
const AvatarBuilderScreen = (props) => {
    useEffect(() => {
        axios.get(url+'/avatar/'+userId).then(response => {
            const avatar = response.data.avatar
            console.log(avatar)
            setAccessory(avatar.accessory)
            setBody(avatar.body)
            setClothing(avatar.clothing)
            setClothingColor(avatar.clothingColor)
            setEyebrows(avatar.eyeBrows)
            setEyes(avatar.eyes)
            setFacialHair(avatar.facialHair)
            setHair(avatar.hair)
            setHairColor(avatar.hairColor)
            setHatColor(avatar.hatColor)
            setMouth(avatar.mouth)
            setSkinTone(avatar.skinTone)
            setBgColor(avatar.bgColor)
        })

    }, [])

    const userId = useSelector(state => state.userId)
    const [accessory, setAccessory] = useState("none")
    const [body, setBody] = useState("chest")
    const [bgColor, setBgColor] = useState("green")
    const [clothing, setClothing] = useState("naked")
    const [clothingColor, setClothingColor] = useState("white")
    const [eyebrows, setEyebrows] = useState("raised")
    const [eyes, setEyes] = useState("normal")
    const [facialHair, setFacialHair] = useState("stubble")
    const [graphic, setGraphic] = useState("none")
    const [hair, setHair] = useState("short")
    const [hairColor, setHairColor] = useState("brown")
    const [hat, setHat] = useState("none")
    const [hatColor, setHatColor] = useState("red")
    const [lipColor, setLipColor] = useState("red")
    const [mouth, setMouth] = useState("serious")
    const [skinTone, setSkinTone] = useState("yellow")
    const [hasChanged, setHasChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
      const avatar = {
        accessory:accessory,
        bgColor:bgColor,
        body:body,
        clothing:clothing,
        clothingColor:clothingColor,
        eyeBrows:eyebrows,
        eyes:eyes,
        facialHair:facialHair,
        hair:hair,
        hairColor:hairColor,
        hat:hat,
        hatColor:hatColor,
        mouth:mouth,
        skinTone:skinTone
      }

      setIsLoading(true)
      axios.post(url+'/avatar',{
        avatar:avatar,
        userId:userId
      }).then(response => {
        setIsLoading(false)
        setHasChanged(false)
      })
    }

    const caracStyle = { width: 130, height: 50,backgroundColor:'white',borderRadius:60,marginHorizontal:5,marginTop:10,borderColor:'rgb(200,200,200)',borderWidth:2,justifyContent:"center",alignItems:'center' }

    const renderList = (caracteristique,hook) => {
      return(
        <TouchableOpacity style={caracStyle} onPress={() => {hook(caracteristique.item);setHasChanged(true)}}>
          <Text style={{fontWeight:'bold'}}>{caracteristique.traduction}</Text>
        </TouchableOpacity>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.head}>
            <BigHead
                size={250}
                accessory={accessory||"none"}
                body={body|| "chest"}
                bgColor={bgColor||"green"}
                bgShape={"circle"}
                clothing={clothing || "naked"}
                clothingColor={clothingColor || "white"}
                eyebrows={eyebrows || "raised"}
                eyes={eyes || "normal"}
                facialHair={facialHair || "stubble"}
                graphic={"none"}
                hair={hair || "short"}
                hairColor={hairColor || "brown"}
                hat={hat || "none"}
                hatColor={hatColor || "red"}
                lashes={false}
                lipColor={lipColor|| "red"}
                mouth={mouth || "serious"}
                skinTone={skinTone || "yellow"}
                showBackground={true}
              />
              {hasChanged && <TouchableOpacity onPress={handleSave} style={{borderWidth:2,borderColor:"white",paddingVertical:5,paddingHorizontal:10,borderRadius:10, width:120,alignItems:'center'}}><Text style={{color:"white",fontWeight:"bold"}}>{isLoading ?  <ActivityIndicator/> : "Sauvegarder"}</Text></TouchableOpacity>}
          </View>

          <ScrollView style={styles.main}>
            <Text style={styles.label}>Couleur du fond</Text>
            <FlatList horizontal data={bgColors} renderItem={(itemData) => renderList(itemData.item,setBgColor)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Genre</Text>
            <FlatList horizontal data={bodies} renderItem={(itemData) => renderList(itemData.item,setBody)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Couleur de la peau</Text>
            <FlatList horizontal data={skinTones} renderItem={(itemData) => renderList(itemData.item,setSkinTone)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Accesoires</Text>
            <FlatList horizontal data={accessories} renderItem={(itemData) => renderList(itemData.item,setAccessory)} showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Vêtements</Text>
            <FlatList horizontal data={clothes} renderItem={(itemData) => renderList(itemData.item,setClothing)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Couleur des vêtements</Text>
            <FlatList horizontal data={clothesColors} renderItem={(itemData) => renderList(itemData.item,setClothingColor)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Yeux</Text>
            <FlatList horizontal data={eyesTypes} renderItem={(itemData) => renderList(itemData.item,setEyes)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Sourcils</Text>
            <FlatList horizontal data={eyeBrows} renderItem={(itemData) => renderList(itemData.item,setEyebrows)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Cheveux</Text>
            <FlatList horizontal data={hairs} renderItem={(itemData) => renderList(itemData.item,setHair)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Couleur des cheveux</Text>
            <FlatList horizontal data={hairColors} renderItem={(itemData) => renderList(itemData.item,setHairColor)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Chapeaux</Text>
            <FlatList horizontal data={hats} renderItem={(itemData) => renderList(itemData.item,setHat)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Couleur du chapeau</Text>
            <FlatList horizontal data={hatsColors} renderItem={(itemData) => renderList(itemData.item,setHatColor)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Pilosité faciale</Text>
            <FlatList horizontal data={facialHairs} renderItem={(itemData) => renderList(itemData.item,setFacialHair)}   showsHorizontalScrollIndicator={false}/>

            <Text style={styles.label}>Bouche</Text>
            <FlatList horizontal data={mouths} renderItem={(itemData) => renderList(itemData.item,setMouth)}   showsHorizontalScrollIndicator={false}/>

          </ScrollView>
        </SafeAreaView>
      );
    }
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(21,21,21)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      instruction:{
        fontWeight:'700',
        fontSize:15,
      },
      head:{
        backgroundColor: 'rgb(21,21,21)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      main:{
        flex:3,
        backgroundColor: 'rgb(21,21,21)',
        width:"100%",
      },
      label:{
        fontSize:20,
        color:"white",
        fontWeight:'700',
        paddingTop:10,
        paddingLeft:10
      }
    });

export default AvatarBuilderScreen


