'use strict';
import User from '../models/user';
import Post from '../models/post';
import userRouter from "../routes/user";

exports.newPost = async function(req, res, next) {
    let userId = req.body.userId;
    let post = new Post(req.body.post);

    console.log(`New post --> UserID: ${userId}, Post: ${post}`);

    let userFound = await User.findById(userId);

    if (!userFound) {
        return res.status(404).send({message: 'User not found'})
    } else {
        userFound.activity.push(post);
        userFound.save();
        await User.findOneAndUpdate({_id: userId}, {$addToSet:{posts: post._id}});
        return post.save()
            .then(() => res.status(200).send({post:post}));
    }
};
