// Imports
const express = require('express');
const app = express();
const port = 3000;

// Static files for main pages
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));
app.use('/assets', express.static(__dirname + 'public/assets'));
app.use('/fonts', express.static(__dirname + 'public/fonts'));

// for mojo subdirectory
app.use(express.static('views/mojo'));
app.use('/css', express.static(__dirname + 'views/mojo/css'));
app.use('/assets', express.static(__dirname + 'views/mojo/assets'));
app.use('/icofont', express.static(__dirname + 'views/mojo/icofont'));

app.use(express.static('views/totalEclipseOfTheHeart'));
app.use('/style', express.static(__dirname + 'views/totalEclipseOfTheHeart/style'));
app.use('/assets', express.static(__dirname + 'views/totalEclipseOfTheHeart/assets'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index');
});
app.get('/mojo', (req, res) => {
    res.render('mojo/index');
});
app.get('/totaleclipseoftheheart', (req, res) => {
    res.render('totalEclipseOfTheHeart/index');
});


// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));