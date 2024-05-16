const express = require('express');
const app = express();
const cors =require('cors')
const axios = require('axios');
const bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();

const port = process.env.PORT;
const key = process.env.API_KEY;
const data = require("./movieData/data.json");

// Setup database connection
const url = process.env.URL;
const client = new Client(url);

// Middleware configurations
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// get for lab 11 
app.get('/', homeHandler);
app.get('/favorite', favoriteHandler);
// get for lab 12 
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/popularId', popularIdHandler);
app.get('/TV', TVHandler);
// get and post for lab 13
app.post('/addMovie', addMovieHandler);
app.get('/getMovies', getMoviesHandler);
// update ,delete and get using params for lab 14
app.put('/edit/:Id', fullEditHandler);
app.delete('/delete/:Id', deleteHandler);
app.get('/getMovie/:Id', getSpecificMHandler);




// -------------------lab 14 functions-------------------------
//get using params
function getSpecificMHandler(req, res) {
    let id = req.params.Id;
    let value = [id];
    let sql = `SELECT * FROM movie WHERE ID = $1 ;`
    client.query(sql, value).then(result => {
        const data = result.rows;
        res.json(data);
        console.log(data);
    }).catch()
}
// update using params 
function fullEditHandler(req, res) {
    let Id = req.params.Id;
    let { title, commints, original_title, release_date, poster_path, overview } = req.body;
    let sql = `UPDATE movie SET title = $1 , commints = $2 ,original_title=$3,release_date=$4 ,
               poster_path=$5 ,overview=$6 WHERE ID = $7 ;`;
    let values = [title, commints, original_title, release_date, poster_path, overview, Id];
    client.query(sql, values).then(
        res.send("Editing Done")
    ).catch()
}

// delete using params
function deleteHandler(req, res) {
    let id = req.params.Id;
    sql = `DELETE FROM movie WHERE ID = $1`
    let value = [id];
    client.query(sql, value).then(
        res.send("Deleted")
    ).catch()
}



// --------------------lab 13 functions------------------------
//get all movies from DB
function getMoviesHandler(req, res) {
    const sql = `SELECT * FROM movie`;
    client.query(sql).then((result) => {
        const data = result.rows;
        res.json(data);
        console.log(data);
    }).catch();
}

// add movie to DB
function addMovieHandler(req, res) {
    const { title, commints, original_title, release_date, poster_path, overview} = req.body;
    const sql = `INSERT INTO movie (title, commints, original_title, release_date, poster_path, overview) 
                 VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ;`
    const values = [title, commints, original_title, release_date, poster_path, overview];
    client.query(sql, values).then((result) => {
        console.log(result.rows);
        res.status(201).json(result.rows)
    }).catch();
}


// ------------lab 12 functions -------------------------------

//additional rout for the id in the data ==1===
function popularIdHandler(req, res) {

    let url = `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US&page=1`
    axios.get(url)
        .then(result => {
            let respose = result.data.results.map(x => {
                return new MovieLab12(x.id);
            })
            res.json(respose)
        })
        .catch(error => {
            console.log(error);
        })

}
//additional rout for TV data ==2===
function TVHandler(req, res) {

    let url = `https://api.themoviedb.org/3/tv/changes?api_key=${key}&language=en-US&page=1`
    axios.get(url)
        .then(result => {
            let respose = result.data.results;
            res.json(respose)
        })
        .catch(error => {
            console.log(error);
        })

}
// http://localhost:300/trending (give the data accourding to the constructor)
function trendingHandler(req, res) {
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`
    axios.get(url)
        .then(result => {
            let respose = result.data.results.map(x => {
                return new MovieLab12(x.id, x.title, x.release_date, x.poster_path, x.overview);
            })
            res.json(respose)
        })
        .catch(error => {
            console.log(error);
        })

}
// http://localhost:300/title (searching acourding to the title)
function searchHandler(req, res) {
    let title = req.query.title;
    let url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${key}&language=en-US`
    axios.get(url)
        .then(result => {
            let response = result.data.results;
            res.json(response);
        })
        .catch(error => {
            console.log(error)
        })
}
// ================================================================


//-------lab 11 functions ---------------------------------
// http://localhost:300/
function homeHandler(req, res) {
    let singleMovie = new MovieLab11(data.title, data.poster_path, data.overview);
    res.send(singleMovie);
}
// http://localhost:300/favorite
function favoriteHandler(req, res) {
    res.send("Welcome to Favorite Page")
}
// ================================================================


//constructor for lab 12 
function MovieLab12(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}
//========================================================================

//constructor for lab 11
function MovieLab11(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}
//===========================================================================


//error handling (server)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        responseText: "Sorry, something went wrong"
    });
});
//error handling (404)
app.use((req, res, next) => {
    
    res.status(404).json({
        status: 404,
        responseText: "Page not found"
    });
});

//connect to db then make listining 
client.connect().then(() => {
    app.listen(port, () => {
        console.log("http://localhost:" + `${port}`);
    })
}
).catch(); 