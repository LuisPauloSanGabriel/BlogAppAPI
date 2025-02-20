const express = require('express');
const blogController = require('../controllers/blogs');
const { verify, verifyAdmin } = require('../auth');


const router = express.Router()


router.post("/", verify, blogController.createPost);
router.post("/:postId/comment", verify, blogController.addComment);
router.get("/all", blogController.getAllPost);
router.get("/:postId", blogController.getSinglePost);
router.patch("/:postId/update", verify, blogController.updatePost);
router.delete("/:postId/delete", verify, blogController.deletePost);
router.delete("/:postId/deletecomment/:commentId", verify, blogController.deleteComment);

 
module.exports = router;