class Controller {
    static register(req, res) {
        res.render('auth/register')
    }
    
    static registerPost(req, res) {
        res.render('auth/register')
    }

    static home(req, res) {
        res.render('home')
    }
}

module.exports = Controller;