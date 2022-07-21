//Middleware
const isLoggedIn = function (req, res, next) {
    if (!req.session.userId) {
        const error = "Login first!";
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
};

//Middleware Role Admin
const roleAdmin = function (req, res, next) {
    if (req.session.role !== "Admin") {
        const error = "Anda tidak memiliki akses Admin";
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
}

//Middleware Role Customer
const roleCustomer = function (req, res, next) {
    if (req.session.role !== "Customer") {
        const error = "Anda tidak memiliki akses Customer";
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
}

module.exports = { isLoggedIn, roleAdmin, roleCustomer };