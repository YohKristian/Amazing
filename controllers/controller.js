const { User, UserProfile, Category, Product, Order } = require("../models");
const bcrypt = require('bcryptjs');

class Controller {
    //Register
    static register(req, res) {
        const error = req.query.error;
        res.render('auth/register', { error });
    }
    
    static registerPost(req, res) {
        const { name, address, phoneNumber, email, password, role } = req.body;
        
        //Daftar User
        User.create({ email, password, role })
            .then(newUser => {
                //Daftar User Profile
                return UserProfile.create({ name, address, phoneNumber, UserId: newUser.id });
            })
            .then(newUserProfile => {
                res.redirect('/login');
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    const errorValue = err.errors.map(err => err.message)
                    res.redirect(`/register?error=${errorValue}`);
                } else res.send(err);
            })
    }

    //Login
    static login(req, res) {
        const error = req.query.error;
        res.render('auth/login', { error });
    }

    static loginPost(req, res) {
        const { email, password } = req.body;

        User.findOne({include: UserProfile, where: { email }})
            .then(user => {
                if (!user) { //If no user
                    const error = "Invalid email / password";
                    return res.redirect(`/login?error=${error}`);
                } else {
                    const validatedPassword = bcrypt.compareSync(password, user.password); //True or False

                    if (validatedPassword) { //If not the same password
                        //Tambah if untuk role admin dan cust
                        req.session.userId = user.id;
                        req.session.role = user.role;
                        req.session.username = user.UserProfile.name;

                        if (user.role === "Admin") {
                            return res.redirect('/admin');
                        } else if (user.role === "Customer") {
                            return res.redirect('/customer');
                        }
                    } else {
                        const error = "Invalid email / password";
                        return res.redirect(`/login?error=${error}`);
                    }
                }
            })
            .catch(err => {
                res.send(err);
            });
    }

    //Log out
    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/login');
            }
        })
    }
    
    //Admin Controller
    static adminHome(req, res) {
        const usernameSession = req.session.username;

        res.render('admin/admin', { usernameSession });
    }

    //Customer Controller
    static customerHome(req, res) {
        const usernameSession = req.session.username;

        res.render('customer/customer', { usernameSession });
    }
}

module.exports = Controller;