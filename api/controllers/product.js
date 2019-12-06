const productModel = require('../models/product');

exports.product_get_all = (req,res) => {

    productModel
        .find()
        .exec()
        .then(docs => {

            const response = {
                count : docs.length,
                productInfo : docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type : "GET",
                            url: "http://localhost:3000/product/" + doc._id
                        }
                    };
                })
            };

            res.json(response);
        })
        .catch(err => {
            res.json({
                msg : err.message
            });

        });

};

exports.product_get_detail = (req,res) => {

    const id = req.params.product_id;

    productModel
        .findById(id)
        .exec()
        .then(doc => {
            res.json({
                msg : "successfull detail data get",
                productInfo : doc,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/"
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.product_posting = (req,res) => {

    const products = new productModel({
        name : req.body.productname,
        price : req.body.productprice
    });

    products
        .save()
        .then(result => {
            res.json({
                msg : "successfull posting product",
                productInfo : result,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/" + result._id
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

}

exports.product_update = (req,res) => {

    const id = req.params.product_id;

    const updateOps = {};

    for (ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }


    productModel
        .update({_id : id}, {$set : updateOps})
        .exec()
        .then(result => {
            res.json({
                msg : "updated product",
                productInfo : result,
                request :{
                    type :"GET",
                    url : "http://localhost:3000/product/" + id
                }
            });
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};

exports.product_delete = (req,res) => {

    const id = req.params.product_id;

    productModel
        .remove({_id : id} )
        .exec()
        .then(result => {
            res.json({
                msg : "deleted product",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            });
        });

};
