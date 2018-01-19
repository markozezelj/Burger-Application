var express = require("express");

// Sets up a router to handle client requests
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log(req.body);
    burger.update({
        eaten: req.body.eaten
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.post("/api/burger", function (req, res) {
    burger.create([
        "name", "eaten"
    ], [
            req.body.name, req.body.eaten
        ], function (result) {
            // Send back the ID of the new Burger
            res.json({
                id: result.insertId
            });
        });
});

// Redirect on invalid routes
router.get("*", function (req, res) {
    res.redirect('/');
});
// Export routes for server.js to use.
module.exports = router;