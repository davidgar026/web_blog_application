import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
const app = express();
const port = 3000;
let postArr = [];
let nameArr = [];
let ageArr = [];
let users = [];
var nameInp;
var ageInp;
var postInp;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render("index.ejs", 
        {
            postArr,
            nameArr,
            ageArr,
        }
    );
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
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
    nameArr.splice(itemIndex, 1); // Remove the item at the specified index
    ageArr.splice(itemIndex, 1); // Remove the item at the specified index
    res.redirect('/'); // Redirect back to index.ejs
})

app.post("/submit", (req, res) => {
    const newPost = req.body.postInput;
    const newName = req.body.nameInput;
    const newAge = req.body.ageInput;
    const newData = req.body;
    if(newPost){
        postArr.push(newPost);
        nameArr.push(newName);
        ageArr.push(newAge);
    }
    
    for(let i=1;i <= postArr.length; i++){
        newData.id = 0;
        newData.id += i;
    }
    
    users.push(req.body);
    res.redirect('/')
})


app.post('/users/:id', (req, res) => {
    const itemIndex = parseInt(req.body.index) + 1; // Get the index from the form
    //console.log("type = ", typeof(itemIndex))
    //console.log("itemIndex = ", itemIndex);
    const postId = parseInt(itemIndex, 10);
    const post = users.find(p => p.id === postId);
    res.render('editPost', { post });
});

app.patch('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    console.log("postId = ", postId  )
    const { nameInput, ageInput, postInput  } = req.body;

    const post = users.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    if (postInput){
        postArr[postId - 1] = postInput;
    } 
    
    res.redirect("/")
});






app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})