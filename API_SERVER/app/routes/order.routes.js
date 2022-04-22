const { authJwt } = require("../middleware");
const orders = require("../controllers/order.controller");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Order
        app.post(
            "/orders",
            [authJwt.verifyToken, authJwt.isModerator],
            orders.create
        );

        // Search Orders
        app.search(
          "/orders",
          orders.search
        );

        // Retrieve all Orders
        app.get("/orders", orders.findAll);

        // Retrieve a single Order with orderId
        app.get("/orders/:orderId", orders.findOne);

        // Update a Order with orderId
        app.put(
            "/orders/:orderId",
            [authJwt.verifyToken, authJwt.isModerator],
            orders.update
        );

        // Delete a Order with orderId
        app.delete(
            "/orders/:orderId",
            [authJwt.verifyToken, authJwt.isModerator],
            orders.deleteId
        );
        
        // Delete a all Orders
        /*app.delete(
            "/orders",
            [authJwt.verifyToken, authJwt.isAdmin],
            orders.deleteAll
        );*/
};