import express from 'express';
import bodyParser from 'body-parser';
import EventEmitter from 'node:events';
import methodOverride from 'method-override';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let postArr = [];
let nameArr = [];
let ageArr = [];
let data = [];
let nextId = 1;
let users = [];
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' },
];
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
    //console.log("users = ", users)
    //console.log("posts",  posts)
    res.redirect('/')
})


/*
app.post("/editpost", (req, res) => {
    console.log("edit post req.body = ", users[0].postInput)
    users[0].postInput = "changed input";
    console.log("new post input = ", users[0].postInput )

    //res.redirect('/'); // Redirect back to index.ejs

    res.render("editpost.ejs")
})
*/



app.post('/users/:id', (req, res) => {
    const itemIndex = parseInt(req.body.index) + 1; // Get the index from the form
    console.log("type = ", typeof(itemIndex))
    console.log("itemIndex = ", itemIndex);
    const postId = parseInt(itemIndex, 10);
    //console.log("users = ", users);
    const post = users.find(p => p.id === postId);
/*
    if (!post) {
        return res.status(404).send('Post not found');
    }

    */
    // Render the editPost EJS template with the post data
    res.render('editPost', { post });
    //res.redirect('/')
});

app.patch('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    console.log("postId = ", postId  )
    const { nameInput, ageInput, postInput  } = req.body;

    const post = users.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Update post fields

    /*
    console.log("post = ", post);
    console.log("postArr = ", postArr);
    console.log("postInput = ", postInput)
    console.log("post.postInput = ", post.postInput);
    */
    
    
    if (postInput){
        postArr[postId - 1] = postInput;
    } 
        

    //res.json({ message: 'Post updated successfully', post });
    res.redirect("/")
});


/*
const itemIndex = req.body.index; // Get the index from the form
    postArr.splice(itemIndex, 1); // Remove the item at the specified index
    nameArr.splice(itemIndex, 1); // Remove the item at the specified index
    ageArr.splice(itemIndex, 1); // Remove the item at the specified index
    res.redirect('/'); // Redirect back to index.ejs
})
    */







app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})