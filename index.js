import express from "express";
import bodyParser from "body-parser";
import EventEmitter from "node:events";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let postArr = [];
let nameArr = [];
let ageArr = [];
var nameInp;
var ageInp;
var postInp;

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs", 
        {

            postArr,
            nameArr,
            ageArr,

        }
    );
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

app.post("/deletepost", (req, res) => {
    const itemIndex = req.body.index; // Get the index from the form
    postArr.splice(itemIndex, 1); // Remove the item at the specified index
    res.redirect('/'); // Redirect back to index.ejs
})

app.post("/submit", (req, res) => {
    const newPost = req.body.postInput;
    const newName = req.body.nameInput;
    const newAge = req.body.ageInput;
    if(newPost){
        postArr.push(newPost);
        nameArr.push(newName);
        ageArr.push(newAge);
    }
    res.redirect('/')
})



app.patch("/editpost", (req, res) => {
    const updates = req.body;
    const newPost = req.body.postInput;
    const newName = req.body.nameInput;
    const newAge = req.body.ageInput;
    
    if(newPost){
        postArr.push(newPost);
    }
    res.redirect('/')
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})