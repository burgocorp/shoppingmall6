const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');



//total get
router.get('/', productController.product_get_all);


//detail get
router.get('/:product_id', checkAuth, productController.product_get_detail);


//posting
router.post('/', checkAuth, productController.product_posting);


//update
router.patch('/:product_id', checkAuth, productController.product_update);



//delete
router.delete('/:product_id', checkAuth, productController.product_delete);





module.exports = router;
