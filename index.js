const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs'); //we are using handlebars as view engine

//beginning of middlewares
app.use((req, res, next) => {
    //this middleware will log the requests comming to this server including timestamp
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();//when you are done executing code in this middleware, you should call next() function
    //otherwise the other part of the code will not fire.
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public')); 
//end of middlewares

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express</h1>');

    // res.send({
    //     name: 'Belendia',
    //     likes: [
    //         'Sketching',
    //         'Playing Badementon'
    //     ]
    // });

    res.render('index.hbs', {
        pageTitle: 'Home page',
        welcome: 'Welcome to this website'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About page'
    });//render lets you render any of the templates you have setup with the current view engine
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});