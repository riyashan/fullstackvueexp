const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
     const posts = await loadPostsCollection();
     res.send(await posts.find({}).toArray());
});

//Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});


//Create the async function to connect the mongo db 
async function loadPostsCollection() {
    const client = await mongodb('mongodb://rosh1985:5891Roshan@ds125713.mlab.com:25713/rosh_vue_express',{
        useNewUrlParser:true
    });

    return client.db('rosh_vue_express').collection('posts');
}

module.exports = router;
