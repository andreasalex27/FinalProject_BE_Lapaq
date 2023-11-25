const multer = require("multer");
const { addProduct, getAllProduk, getDetailProduk, getDetailKategori } = require("../../controller/ProductController");
const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/produk", upload.single("image"), addProduct);
router.get("/api/produk", getAllProduk);
router.get("/api/produk/:_id", getDetailProduk);
router.get("/api/produk/kategori/:kategori", getDetailKategori);

module.exports = router;
