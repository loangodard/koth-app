let router = require('express').Router();
const rnAppControllers = require('../Controllers/rnApp')


// url/
router.get('/', rnAppControllers.getIndex);
router.get("/match/:lobby",rnAppControllers.getMatch)
router.get('/result/:lobby&:userId',rnAppControllers.getResult)

router.post('/register',rnAppControllers.postRegister)
router.post('/login',rnAppControllers.postLogin)
router.post('/report',rnAppControllers.postReport)




// Export API routes
module.exports = router;