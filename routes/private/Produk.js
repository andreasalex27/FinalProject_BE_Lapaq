const multer = require('multer');
const { addProduct } = require('../../controller/ProductController')
const router = require('express').Router()

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post("/api/produk", upload.single('img'), addProduct)

module.exports = router