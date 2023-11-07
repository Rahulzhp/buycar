const express = require("express")

const { ProductModel } = require("../Model/product")
const { authenticate } = require("../Middleware/auth")

const productRoute = express.Router()


const PAGE_SIZE = 12;

productRoute.get('/', async (req, res) => {
    const { search, page = 1, minPrice, maxPrice } = req.query;
    const skip = (page - 1) * PAGE_SIZE;

    try {
        const filter = {};

        if (search) {
            const searchFields = ['title', 'color'];

            if (!isNaN(search)) {

                filter.$or = [
                    { year: parseInt(search) },
                    { price: parseFloat(search) },
                    { mileage: parseFloat(search) },
                    { max_speed: parseFloat(search) },
                ];
            } else {

                filter.$or = searchFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                }));
            }
        }
        if (minPrice && maxPrice) {
            filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
        }

        const count = await ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(count / PAGE_SIZE);

        const data = await ProductModel.find(filter)
            .skip(skip)
            .limit(PAGE_SIZE);

        res.status(200).json({ data, totalPages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route for cars with max_speed under 200
productRoute.get('/speed/under-200', async (req, res) => {
    try {
        const cars = await ProductModel.find({ max_speed: { $lt: 200 } });

        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route for cars with max_speed above 200
productRoute.get('/speed/above-200', async (req, res) => {
    try {
        const cars = await ProductModel.find({ max_speed: { $gte: 200 } });

        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Sort Products by Price
productRoute.get('/sort', async (req, res) => {
    const { sort, order } = req.query;

    try {
        const sortOrder = order === 'desc' ? -1 : 1;
        const sortField = sort || 'price';

        const sortedProducts = await ProductModel.find({})
            .sort({ [sortField]: sortOrder });

        res.status(200).json(sortedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


productRoute.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let product = await ProductModel.findById(id)
        res.send(product)

    } catch (e) {
        res.send(e.message)
    }
})

productRoute.post("/", authenticate, async (req, res) => {
    const updated = req.body

    try {
        const data = new ProductModel(updated);
        await data.save();
        res.send(data);
    } catch (err) {
        res.send(err);
    }
})

productRoute.patch('/:id', authenticate, async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    let logger_userID = req.body.userID;
    try {
        let Product = await ProductModel.findById(productId)

        if (Product) {
            let product_userID = Product.userID;
            console.log(product_userID)
            if (logger_userID === product_userID) {
                let EditedProduct = await ProductModel.findByIdAndUpdate(productId, updatedData)
                res.send({ msg: "Item Edited" })
            }
            else {
                res.send("You have Not authorize")
            }
        }
        else {
            res.send("Please refresh page or Product does not exist")
        }


    } catch (e) {
        res.send(e.message)
    }


});

productRoute.delete('/:id', authenticate, async (req, res) => {
    let id = req.params.id
    let logger_userID = req.body.userID;
    console.log(logger_userID)

    try {
        let Product = await ProductModel.findById(id)

        if (Product) {
            let product_userID = Product.userID;
            console.log(product_userID)
            if (logger_userID === product_userID) {
                let deleteProduct = await ProductModel.findByIdAndDelete(id)
                res.send({ msg: "Item Deleted" })
            }
            else {
                res.send("You have Not authorize")
            }
        }
        else {
            res.send("Already deleted this item ,Please refresh page or Product does not exist")
        }


    } catch (e) {
        res.send(e.message)
    }
});


module.exports = {
    productRoute
};