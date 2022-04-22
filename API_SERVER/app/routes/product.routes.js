const { authJwt } = require("../middleware");
const products = require("../controllers/product.controller.js");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Product
        app.post(
            "/products",
            [authJwt.verifyToken, authJwt.isModerator],
            products.create
        );

        // Search Products
        app.search(
            "/products",
            products.search
        );
        app.post(
            "/products/search",
            products.search
        );

        // Retrieve all Products
        app.get("/products", products.findAll);

        // Count all Products
        app.get("/products/count/:countby", products.countAll);

        // Retrieve a single Product with productId
        app.get("/products/:productId", products.findOne);

        // Retrieve a single Product with productSKU
        app.get("/products/sku/:productSKU", products.findSKU);

        // Update a Product with productId
        app.put(
            "/products/:productId",
            [authJwt.verifyToken, authJwt.isModerator],
            products.update
        );

        // Update a Product with productSKU
        app.put(
            "/products/sku/:productSKU",
            [authJwt.verifyToken, authJwt.isModerator],
            products.updateSKU
        );

        // Delete a Product with customerId
        app.delete(
            "/products/:productId",
            [authJwt.verifyToken, authJwt.isModerator],
            products.deleteId
        );
        app.delete(
            "/products/sku/:productSKU",
            [authJwt.verifyToken, authJwt.isModerator],
            products.deleteSKU
        );

        // Delete a all Products
        /*app.delete(
            "/products",
            [authJwt.verifyToken, authJwt.isAdmin],
            products.deleteAll
        );*/
};