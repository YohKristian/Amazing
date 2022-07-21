const Controller = require("../controllers/controller");
const router = require("express").Router();

//Register
router.get('/register', Controller.register);
router.post('/register', Controller.registerPost);

router.get('/', Controller.home);

module.exports = router;