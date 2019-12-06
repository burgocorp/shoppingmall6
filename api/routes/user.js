const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');



//register
router.post('/register', userController.user_register);

//login     개발과정 1.email 유무체크 2.password 확인과 디코딩 3.토큰 발행 4.response 
router.post('/login', userController.user_login);

//delete
router.delete('/:user_id', userController.user_delete);




module.exports = router;