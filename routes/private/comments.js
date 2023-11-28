const { addComment, deleteComment, getComment, editComment } = require('../../controller/Comment')
const multer = require('multer')

const router = require('express').Router()

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post('/comment', upload.single('image'), addComment)
router.get('/comment', getComment)
router.delete('/comment/:_id', deleteComment)
router.patch('/comment/:_id', editComment)

module.exports = router