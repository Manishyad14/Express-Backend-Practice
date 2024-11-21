let express = require("express");  
let app = express();  
let port = 3000;  

async function fetchAllMovies() {  
    let query = "SELECT * FROM movies";  
    let response = await db.all(query, []);  
    return { movies: response };  
}  

app.get("/movies", async (req, res) => {  
    try {  
        let results = await fetchAllMovies();  
        if (results.movies.length === 0) {  
            return res.status(404).json({ message: "No Movies Found." });  
        }  
        res.status(200).json(results);  
    } catch (error) {  
        return res.status(500).json({ error: error.message });  
    }  
});  

app.listen(port, () => {  
    console.log(`Server is running on http://localhost:${port}`);  
});