const oderModel = require("../models/order");
const productModel = require("../models/product");



exports.order_get_all = (req,res) => {

    oderModel
        .find()
        .exec()
        .then(docs => {

            const response = {
                count : docs.length,
                orderInfo : docs.map(doc=> {
                    return{
                        product : doc.product,
                        qty : doc.qty,
                        id : doc.id,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/order/" + doc._id
                        }
                    };
                })

            };


            res.json(Response)
        })
        .catch(err => {
            res.json({
                msg : err.message

            });
        });

};

exports.order_get_detail = (req,res) => {

    const id = req.params.order_id;

    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            res.json({
                msg : "successfull get detail order data",
                orderInfo : doc,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/"
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.order_post = (req,res) => {

    productModel
        .findById(req.body.productid)
        .exec()
        .then(result => {
            if (!result) {
                return res.json({
                    msg : "no product id"
                });
            } else {
                const order = new orderModel({
                    product : req.body.productid,
                    qty : req.body.qty
                });

                order
                    .save()
                    .then(doc => {
                        res.json({
                            msg : "successfull posting order data",
                            orderInfo : doc,
                            request : {
                                type : "GET",
                                url : "http://localhost:3000/order/" + doc._id
                            }
                        })
                    })
                    .catch(err => {
                        res.json({
                            msg : err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.order_update = (req,res) =>{

    const id = req.params.order_id;

    const updateOps = {};

    for (ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({_id : id } , {$set : updateOps})
        .exec()
        .then(result => {
            res.json({
                msg : "updated order data",
                orderInfo : result,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/" + id
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.order_delete = (req,res) => {

    const id = req.params.order_id;

    orderModel
        .remove({_id : id })
        .exec()
        .then(result => {
            res.json({
                msg : "deleted order data",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/" 
                }
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};