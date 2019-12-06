const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/order');





//order get 
router.get('/', checkAuth, orderController.order_get_all);

//order detail get 
router.get('/:order_id', checkAuth, orderController.order_get_detail);


//order posting
router.post('/', checkAuth, orderController.order_post);

//order update
router.patch('/:order_id', checkAuth, orderController.order_update);

//order delete
router.delete('/:order_id', checkAuth, orderController.order_delete);








module.exports = router;