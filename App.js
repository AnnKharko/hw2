const x = require('./users');
const express = require("express");
const expressHbs = require("express-handlebars")



const path = require("path");
const app = express();
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'views'))

let users = x.users;

//-----------
app.get('/login', ((req, res) => {
    res.render('login');
}) )

app.post('/login', ((req, res) => {

  const filter = users.filter((user) => user.email === req.body.email);
    if (filter.length) {
      res.redirect(`/users/${filter[0].userId}`);
          } else {
              res.redirect('/registration');
  }
}));

//--------
app.get('/registration', ( (req, res) => {
    res.render('registration');
}));

app.post('/registration', (req, res) => {

    const filter = users.filter(user => user.email === req.body.email);
    if (filter.length) {
        res.redirect('/error');
    } else {
       let newUser = {userId: users.length, nikName: req.body.nikName, email: req.body.email, password: req.body.password};
        console.log(newUser);


        users.push(newUser);
        res.redirect('/users')

    }
});




//-----------
app.get('/users', ((req, res) => {
    res.render('users', {users} )
} ));

app.get('/users/:userId', ((req, res) => {
   const {userId} = req.params;
       res.json(users[userId-1])
}))

//----------------
app.get('/error', ((req, res) => {
    res.render('error');
}))



app.listen(5000, () => {
    console.log('App listen 5000');
})


