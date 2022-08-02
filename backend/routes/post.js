const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
const { json } = require('express');


/**Create one */
router.post('/', auth, multer, postCtrl.createPost);
/**Like a Post */
router.post('/:id/like', auth, postCtrl.likePost);
/**update one */
router.put('/:id', auth, multer, postCtrl.modifyPost);
/**Delete one */
router.delete('/:id', auth, postCtrl.deletePost);
/**Get one */
router.get('/:id', auth, postCtrl.getOnePost);
/**Get all */
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;