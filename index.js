import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.NASA_API_KEY;
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=" + apiKey);
        // console.log(response.data.explanation);
        res.render("index.ejs", {
            imgSrc: response.data.url,
            description: response.data.explanation,
            title: response.data.title,
            date: response.data.date
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }

});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
