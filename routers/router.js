const Controller = require("../controllers/controller");
const router = require("express").Router();
const { isLoggedIn, roleAdmin, roleCustomer } = require("../middlewares/auth.js");

//Register
router.get('/register', Controller.register);
router.post('/register', Controller.registerPost);

//Login
router.get('/login', Controller.login);
router.post('/login', Controller.loginPost);

//Log out
router.get('/logout', Controller.logout);

//Middleware - Logged In
router.use(isLoggedIn);

//Admin Route
router.get('/admin', roleAdmin, Controller.adminHome);

router.get('/admin/add', roleAdmin, Controller.adminAddItem);
router.post('/admin/add', roleAdmin, Controller.adminAddItemPost);

router.get('/admin/edit/:productId', roleAdmin, Controller.adminEditItem);
router.post('/admin/edit/:productId', roleAdmin, Controller.adminEditItemPost);

router.get('/admin/delete/:productId', roleAdmin, Controller.adminDeleteItem);

//Customer Route
router.get('/customer', roleCustomer, Controller.customerHome);

module.exports = router;