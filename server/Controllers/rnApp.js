const User = require('../Models/User')
const Match = require('../Models/Match')
const Report = require('../Models/Report')
const bcrypt = require('bcryptjs');
const token = require('../Utils/token')



exports.getIndex = async (req,res) => {
    const users = []
    for(let i = 0; i < 10; i++){
        const user = await User.findOne()
        user.elos = 1025
        user.save()
        users.push(user)
    }
    console.log(users)
    return res.status(200).json(users)
}

exports.postRegister = (req, res) => {
    const pseudo = req.body.pseudo
    const tel = req.body.tel
    const password = req.body.password;

    User.findOne({
            $or: [{
                pseudo: /pseudo/i
            }, {
                tel: tel
            }]
        })
        .then(userDoc => {
            if (userDoc) {
                if (userDoc.pseudo.toLowerCase() == pseudo.toLowerCase()) {
                    return res.status(500).json({
                        message: "Ce Pseudo est déjà utilisé"
                    })
                } else {
                    return res.status(500).json({
                        message: "Ce numéro de téléphone est déjà utilisé"
                    })
                }
            } else {
                return bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            pseudo: pseudo,
                            tel: tel,
                            password: hashedPassword,
                        });
                        user.save()
                        return res.status(200).json({
                            message: "success"
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Une erreur s\'est produite'
            })
        });
}

exports.postLogin = (req, res) => {
    const identifiant = req.body.identifiant;
    const password = req.body.password;
    User.findOne({
            $or: [{
                pseudo: identifiant
            }, {
                tel: identifiant
            }]
        })
        .then(user => {
            if (!user) {
                return res.status(500).json({
                    message: "Identifiant ou mot de passe incorrecte"
                })
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token_ = token.token()
                        user.login_token = token_
                        user.save().then(r => {
                            return res.status(200).json({
                                message: "utilisateur connecté avec succès",
                                data: user
                            })
                        })
                    } else {
                        return res.status(500).json({
                            message: "Identifiant ou mot de passe incorrecte"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).json({
                        message: "Identifiant ou mot de passe incorrecte"
                    })
                });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                ...{
                    status: 500
                },
                ...err
            })
        });
}

exports.getUser = (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            return res.status(500).json({
                error: "pas d'utilisateur"
            })
        }
        return res.status(200).json({
            user: {
                _id: user._id,
                elos: user.elos,
                pseudo: user.pseudo
            }
        })
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}

exports.getMatch = (req, res) => {
    const lobby = req.params.lobby;
    Match.findOne({
        lobby: lobby
    }).populate('team1', 'pseudo elos').populate('team2', 'pseudo elos').then(match => {
        return res.status(200).json(match)
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
}

exports.getResult = (req,res) => {
    const userId = req.params.userId
    const matchId = req.params.lobby
    Match.findOne({lobby:matchId}).then(match => {
        return res.status(200).json(match)
    })
}

exports.postReport = (req,res) => {
    const message = req.body.message;
    const userId = req.body.userId
    const matchId = req.body.matchId
    const report = new Report({user:userId,match:matchId,message:message,date:new Date()})
    report.save().then(r=>{
        return res.status(200).json({success:true})
    })
}