let router = require('express').Router();
const rnAppControllers = require('../Controllers/rnApp')


// url/
router.get('/', rnAppControllers.getIndex);
router.get("/match/:lobby",rnAppControllers.getMatch)
router.get('/result/:lobby&:userId',rnAppControllers.getResult)
router.get('/zones',rnAppControllers.getZones)
router.get('/elo/:userId&:zoneId',rnAppControllers.getElo)
router.get('/classement/:zoneId',rnAppControllers.getClassement)

router.post('/register',rnAppControllers.postRegister)
router.post('/login',rnAppControllers.postLogin)
router.post('/report',rnAppControllers.postReport)

router.post('/create-zone',rnAppControllers.postCreateZone)




// Export API routes
module.exports = router;