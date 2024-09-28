import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.get("/createposts", (req, res) => {
    res.render("createposts.ejs");
})

app.post("/submit", (req, res) => {
    res.send(req.body.postInput)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})