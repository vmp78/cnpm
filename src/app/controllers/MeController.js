const session = require("express-session");
const Auth = require("../models/Authentication");
const Admin = require("../models/Admin");

class MeController {
  // [GET] /login
  login(req, res, next) {
    res.render("login");
  }

  // [POST] /login
  identyfy(req, res, next) {
    const username = req.body.username;
    const password = req.body.pass;
    Admin.findOne({
      username,
      password,
    })
      .then((data) => {
        req.session.info = data.username;
        res.locals.username = data.username;
        res.redirect("/");
      })
      .catch((e) => {
        console.log("[MeController]", e);
            res.redirect('back')
      });
  }

  // [GET] /login
  logout(req, res, next) {
    delete req.session.info;
    res.redirect("/");
    // res.redirect('/?logout=true')
  }
}

module.exports = new MeController();
