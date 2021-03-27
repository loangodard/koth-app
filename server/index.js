const express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const geolib = require('geolib')
const User = require('./Models/User')
const Match = require('./Models/Match')
const app = express()

//TODO : delete it in production
app.use(function(req, res, next) { //allow cross origin requests;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

const http = require('http')
const server = http.createServer(app);

/**
 * Socket io
 */
const io = require('socket.io')(server);
var rooms = [] //Liste des lobbys
io.on("connection",socket=>{
    socket.on('join_lobby',(data)=>{ //Lorsqu'un joueur join un lobby, on l'ajoute à sa room en fonction de l'id de la room rejoint
        console.log('lobby joined : ' + data.room +' by : ' + data.userId)
        socket.join(data.room) //L'user rejoint la room donnée

        
        User.findById(data.userId).then(user=>{ //On récupère les infos du joueurs pour les passer aux autres joueurs
            const newUserInRoom = {
                _id:user._id,
                pseudo:user.pseudo,
                elos:user.elos,
                team:1,
                isReady:false,
                position:data.position
            }
            var room_ind = rooms.findIndex(e => e.room_id == data.room) //On cherche l'index de la room dans la liste des rooms
            if(room_ind < 0){ //Dans ce cas, c'est la création de la room
                rooms.push({
                    room_id : data.room,
                    users:[newUserInRoom],
                    nbJoueursMax: data.nombreJoueurs
                })
                room_ind = rooms.length-1
            }else{ //Dans ce cas, il rejoint une room déjà existente
                const actual_room = rooms[room_ind]
                const limiteJoueurs = actual_room.nbJoueursMax

                //On prend le dernier joueur qui a rejoint et on regarde s'il est à moins de 500m(pou laisser une marge d'erreur à la localisation) du joueur souhaitant rejoindre
                const userJoiningPosition = {
                    latitude: Number(newUserInRoom.position.latitude),
                    longitude : Number(newUserInRoom.position.longitude)
                }
                const previousUserPosition = {
                    latitude:Number(actual_room.users[actual_room.users.length - 1].position.latitude),
                    longitude:Number(actual_room.users[actual_room.users.length - 1].position.longitude)
                }

                if(geolib.getDistance(userJoiningPosition,previousUserPosition) > 10000){
                    return socket.emit('wrong_location')
                }


                //Si le lobby est plein, on emet une erreur
                if(actual_room.users.length >= limiteJoueurs){
                    return socket.emit('lobby_full')
                }

                //On calcul dans quelle équipe il doit aller, équipe 1 si nombre de joueurs pairs, 2 sinon
                if(actual_room.users.length % 2 != 0){
                    newUserInRoom.team = 2
                }

                actual_room.users.push(newUserInRoom)
                rooms[room_ind] = actual_room

            }
            console.log(rooms[room_ind].users)
            io.to(data.room).emit('user_joined',rooms[room_ind].users) //On dit aux autres joueurs qu'un joueur a rejoint on leur redonnant les données de chacuns + celles du nouveau joueur
        })

    })

    socket.on('leave_lobby', (data)=>{
        var room_ind = rooms.findIndex(e => e.room_id == data.room) //On cherche l'index de la room dans la liste des rooms
        const actual_room = rooms[room_ind]
        if(!actual_room){
            return
        }
        const newUsers = actual_room.users.filter(e => e._id != data.userId)
        console.log(newUsers)
        actual_room.users = newUsers
        rooms[room_ind] = actual_room
        socket.leave(data.room)
        io.to(data.room).emit('user_leaved',rooms[room_ind].users) //On dit aux autres joueurs qu'un joueur a quitté en leur redonnant les données des joueurs, en enlevant le joueur qui quitte
    })

    socket.on('change_team',(data)=>{
        var room_ind = rooms.findIndex(e => e.room_id == data.room) //On cherche l'index de la room dans la liste des rooms
        const actual_room = rooms[room_ind]
        let userChangeTeamInd = actual_room.users.findIndex(user => user._id == data.userId)
        var userChangeTeam = actual_room.users[userChangeTeamInd]
        userChangeTeam.isReady = false
        if(userChangeTeam.team == 1){
            userChangeTeam.team = 2
        }else{
            userChangeTeam.team = 1
        }
        actual_room.users[userChangeTeamInd] = userChangeTeam
        io.to(data.room).emit('joueur_changed_team',rooms[room_ind].users)
    })

    socket.on('ready',(data)=>{
        var room_ind = rooms.findIndex(e => e.room_id == data.room) //On cherche l'index de la room dans la liste des rooms
        const actual_room = rooms[room_ind]
        let userReadyInd = actual_room.users.findIndex(user => user._id == data.userId)
        let userReady = actual_room.users[userReadyInd]
        if(!userReady){
            return
        }
        userReady.isReady = !userReady.isReady
        actual_room.users[userReadyInd] = userReady
        // Si tous les joueurs sont prêt et que la partie est pleine, on lance la partie
        const joueursReady = actual_room.users.filter(e => e.isReady)
        const team1 = actual_room.users.filter(e => e.team == 1)
        const team2 = actual_room.users.filter(e => e.team == 2)
        if(joueursReady.length == actual_room.nbJoueursMax && team1.length == team2.length){
            const match = new Match({
                lobby:actual_room.room_id,
                team1:team1.map(e=>e._id),
                team2:team2.map(e=>e._id),
                date_debut:new Date(),
                position:actual_room.users[0].position
            })
            match.save()
            io.to(data.room).emit('match_begin',rooms[room_ind].users)
        }else{ //si non on indique juste aux autres que le joueur est prêt
            io.to(data.room).emit('user_ready',rooms[room_ind].users)
        }
    })
})
/**
 * --- Socket io ---
 */

/**
 * Import des variables d'environnements
 */
require('dotenv').config(); 

/**
 * BodyParser Configuration
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * MongoDB Connection
 */
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@lfc-dufxi.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log('connected to mongodb')
    server.listen(4000, () => {
        console.log('listening on 4000')
    })
});

/**
 * Routeurs
 */
let rnAppRoutes = require("./Routes/rnApp");
app.use('/', rnAppRoutes)