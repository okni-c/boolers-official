const { Product } = require('../models');

const productController = {
    // get all thoughts
    getAllProducts(req, res) {
        Product.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbProductData => res.json(dbProductData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // //get a thought by ID
    // getProductById({ params }, res) {
    //     Thought.findOne({ _id: params.id })
    //         .populate({
    //             path: 'user',
    //             select: '-__v'
    //         })
    //         .select('-__v')
    //         .sort({ _id: -1 })
    //         .then(dbThoughtData => res.json(dbThoughtData))
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json(err)
    //         })
    // },
    // //update a thought by Id
    updateProduct({ params, body }, res) {
        Product.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(updatedProduct => {
                if (!updatedProduct) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                }
                res.json(updatedProduct);
            })
            .catch(err => res.json(err));
    },
    // // add thought to user
    addProduct({ params, body }, res) {
        Product.create(body)
            .then(dbProductData => {
                if (!dbProductData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbProductData);
            })
            .catch(err => res.json(err));
    },
    // // remove product
    removeProduct({ params }, res) {
        Product.findOneAndDelete({ _id: params.id })
            .then(deletedProduct => {
                if (!deletedProduct) {
                    return res.status(404).json({ message: 'No product found with this id!' });
                }
                res.status(200).json({ message: 'Product deleted.' })
            })
            .catch(err => res.json(err));
    }
};

module.exports = productController;