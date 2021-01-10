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

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index');
});

// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));