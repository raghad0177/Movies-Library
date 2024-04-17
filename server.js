const express=require('express');
const app = express();
const port = 3000;

const data=require("./movieData/data.json");

app.listen(port,() =>{
   console.log("http://localhost:"+`${port}`);
}
)
app.get('/',homeHandler);
function homeHandler(req,res){
    let singleMovie=new Movie(data.title,data.poster_path,data.overview);
    res.send(singleMovie);
}

function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}
app.get('/favorite',favoriteHandler);
function favoriteHandler(req,res){
  res.send("Welcome to Favorite Page")
}


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        responseText: "Sorry, something went wrong"
    });
});


app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        responseText: "Page not found"
    });
});