const Controller = require("../controllers/controller");
const router = require("express").Router();

//Register
router.get('/register', Controller.register);
router.post('/register', Controller.registerPost);

//Login
router.get('/login', Controller.login);
router.post('/login', Controller.loginPost);

//Middleware
router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = "Login first!";
        res.redirect(`/login?error=${error}`);
    } else {
        next()
    }
})

//Middleware Role Admin
const roleAdmin = function (req, res, next) {
    if (req.session.role !== "Admin") {
        const error = "Anda tidak memiliki akses Admin";
        res.redirect(`/login?error=${error}`);
    } else {
        next()
    }
}

//Middleware Role Customer
const roleCustomer = function (req, res, next) {
    if (req.session.role !== "Customer") {
        const error = "Anda tidak memiliki akses Customer";
        res.redirect(`/login?error=${error}`);
    } else {
        next()
    }
}

//Admin Route
router.get('/admin', roleAdmin, Controller.adminHome);

//Customer Route
router.get('/customer', roleCustomer, Controller.customerHome);

module.exports = router;