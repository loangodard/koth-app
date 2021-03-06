let router = require('express').Router();
const rnAppControllers = require('../Controllers/rnApp')


// url/
router.get('/', ((req,res) => res.status(500).json({message:'koth api'})));

router.post('/register',rnAppControllers.postRegister)
router.post('/login',rnAppControllers.postLogin)




// Export API routes
module.exports = router;