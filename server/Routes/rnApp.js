let router = require('express').Router();
const rnAppControllers = require('../Controllers/rnApp')


// url/
router.get('/', rnAppControllers.getIndex);
router.get("/match/:lobby",rnAppControllers.getMatch)

router.post('/register',rnAppControllers.postRegister)
router.post('/login',rnAppControllers.postLogin)




// Export API routes
module.exports = router;