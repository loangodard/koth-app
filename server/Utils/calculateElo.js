const User = require('../Models/User')
const Match = require('../Models/Match')

exports.calculateElo = async (winner,team1,team2,match) => {
    return new Promise(async (successCb, failureCb)=>{
        let gain_perte = []
        let eloTeam1 = team1.map(e=>e.elos)
        let eloTeam2 = team2.map(e=>e.elos)
        const meanEloTeam1 = (eloTeam1.reduce((a, b) => a + b, 0) / eloTeam1.length) || 0;
        const meanEloTeam2 = (eloTeam2.reduce((a, b) => a + b, 0) / eloTeam2.length) || 0;
        if(winner == 1){
            for(joueur of team1){
                const user = await User.findById(joueur._id)
                const ExpectationToWin = 1/(1+10**((meanEloTeam2-user.elos)/400));
                gain_perte.push({
                    joueur:user._id,
                    gain_elos: Math.trunc(20*(1-ExpectationToWin)),
                    gain_coins: 10
                })
                user.elos_historique.push({date:new Date(),elos:user.elos + Math.trunc(20*(1-ExpectationToWin))})
                user.elos += Math.trunc(20*(1-ExpectationToWin))
                user.save()
                console.log('dans la boucle team1')
                console.log(gain_perte)
            }
    
            for(joueur of team2){
                const user = await User.findById(joueur._id)
                const ExpectationToWin = 1/(1+10**((meanEloTeam1-user.elos)/400));
                gain_perte.push({
                    joueur:user._id,
                    gain_elos: Math.trunc(20*(0-ExpectationToWin)),
                    gain_coins: 10
                })
                user.elos_historique.push({date:new Date(),elos:user.elos + Math.trunc(20*(0-ExpectationToWin))})
                user.elos += Math.trunc(20*(0-ExpectationToWin))
                user.save()
                console.log('dans la boucle team2')
                console.log(gain_perte)
            }
        }else if(winner == 2){
            for(var joueur of team1){
                const user = await User.findById(joueur._id)
                const ExpectationToWin = 1/(1+10**((meanEloTeam2-user.elos)/400));
                gain_perte.push({
                    joueur:user._id,
                    gain_elos: Math.trunc(20*(0-ExpectationToWin)),
                    gain_coins: 10
                })
                user.elos_historique.push({date:new Date(),elos:user.elos + Math.trunc(20*(0-ExpectationToWin))})
                user.elos += Math.trunc(20*(0-ExpectationToWin))
                user.save()
            };
    
            for(var joueur of team2){
                const user = await User.findById(joueur._id)
                const ExpectationToWin = 1/(1+10**((meanEloTeam1-user.elos)/400));
                gain_perte.push({
                    joueur:user._id,
                    gain_elos: Math.trunc(20*(1-ExpectationToWin)),
                    gain_coins: 10
                })
                user.elos_historique.push({date:new Date(),elos:user.elos + Math.trunc(20*(1-ExpectationToWin))})
                user.elos += Math.trunc(20*(1-ExpectationToWin))
                user.save()
            }
        }else{
            for(var joueur of team1){
                gain_perte.push({
                    joueur:joueur,
                    gain_elos: 0,
                    gain_coins: 0
                })
            }
            for(var joueur of team2){
                gain_perte.push({
                    joueur:joueur,
                    gain_elos: 0,
                    gain_coins: 0
                })
            }
        }
        console.log('fin de la fonction')
        successCb(gain_perte)
    })
}