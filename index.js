import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let postArr = [];

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs", 
        {data: postArr}
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

app.post("/submit", (req, res, next) => {
    let {postInput} = req.body;
    postArr.push(postInput);
    console.log("query = ", req.query.postArr)
    res.redirect('/')
    //res.render("index.ejs", {data: postArr})
    
    
    
    
    //postArr = [];
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})