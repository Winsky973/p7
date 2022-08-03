const fs = require('fs');
const Posts = require('../models/Posts');

/**Create one */
exports.createPost = (req, res, next) => {
    const post = new Posts({
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

/**Update one */
exports.modifyPost = (req, res, next) => {

    console.log('req.body : ', req.body)
        // console.log('req.headers : ', req.headers.authorization)

    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    /**Before update we take the old url image and delete it than push the new image */

    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: new Error('aucun objet trouvé')
                })
            }

            if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, function(error) {
                    if (error) return error;
                    console.log('image delete');
                });
            }

            if (post.userId === req.auth.userId || req.auth.userRole === 'admin') {
                Posts.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'objet modifié' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({
                    error: new Error('Requête non autorisée')
                });
            }
        })
        .catch((error) => { res.status(400).json({ error: error }) });
};
/**Delete one */
exports.deletePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    error: new Error('aucun objet trouvé')
                })
            }

            if (post.userId === req.auth.userId || req.auth.userRole === 'admin') {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Posts.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {

                res.status(401).json({
                    error: new Error('Requête non autorisée')
                });
            }


        })
        .catch((error) => { res.status(400).json({ error: error }) });
};

/**Get one */
exports.getOnePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })

    .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

/**get all posts */
exports.getAllPosts = (req, res, next) => {
    Posts.find()
        .then(posts => {
            posts.reverse();
            res.status(200).json(posts)
        })
        .catch(error => res.status(400).json({ error }));
};


/**Like a post */
exports.likePost = (req, res, next) => {
    const likes = req.body.like;
    const userId = req.body.userId;

    Posts.findOne({ _id: req.params.id })
        .then((post) => {

            switch (likes) {
                case 1:
                    if (!foundIdFromArray(post['usersLiked'], userId)) {
                        post.likes += likes;
                        post['usersLiked'].push(userId);
                    }

                    Posts.updateOne({ _id: req.params.id }, post)
                        .then(() => res.status(200).json({ message: 'Like enregistré' }))
                        .catch(error => res.status(400).json({ error }))
                    break;

                case -1:
                    if (!foundIdFromArray(post['usersDisliked'], userId) && !foundIdFromArray(post['usersLiked'], userId)) {
                        post.dislikes += 1;
                        post['usersDisliked'].push(userId);
                    }
                    Posts.updateOne({ _id: req.params.id }, post)
                        .then(() => res.status(200).json({ message: 'Like enregistré' }))
                        .catch(error => res.status(400).json({ error }))
                    break;

                case 0:
                    removeUserId(post, userId);
                    Posts.updateOne({ _id: req.params.id }, post)
                        .then(() => res.status(200).json({ message: 'Like enregistré' }))
                        .catch(error => res.status(400).json({ error }))
                    break;

                default:
                    break;
            }
        })
        .catch(error => res.status(400).json({ error }));
}

function foundIdFromArray(array, userId) {
    const foundIdInArray = array.find(element => element === userId);
    if (foundIdInArray) {
        return true;
    }
}

/**Enlever l'userID dans le tableau de userLiked */
function removeUserId(post, userId) {
    const foundIndexIdUsersLiked = post['usersLiked'].findIndex(element => element === userId);
    const foundIndexIdUsersDisliked = post['usersDisliked'].findIndex(element => element === userId);

    if (foundIndexIdUsersLiked !== -1) {
        post['usersLiked'].splice(foundIndexIdUsersLiked);
        post.likes -= 1;
    }
    if (foundIndexIdUsersDisliked !== -1) {
        post['usersDisliked'].splice(foundIndexIdUsersDisliked);
        post.dislikes -= 1;
    }
}