const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 3000;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/list_movies', (req, res) => {
    fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/blogs', (req, res) => {
    // const articles = JSON.stringify(fs.readFileSync(__dirname + '/blogs.json', 'utf8'));
    // res.send(articles);
    fs.readFile(__dirname + '/' + 'blogs.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addblog', (req, res) => {
    const titre = req.body.titre;
    const desc = req.body.desc;
    const blog = {
        titre,
        desc
    };

    let articles = JSON.parse(fs.readFileSync(__dirname + '/blogs.json', 'utf8'));
    articles.push(blog);

    fs.writeFileSync(__dirname + '/blogs.json', JSON.stringify(articles), 'utf8', (err, data) => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
