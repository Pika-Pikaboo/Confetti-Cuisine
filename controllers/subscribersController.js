const mongoose = require("mongoose"),
    Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            res
                .render("subscribers", {
                    subscribers: subscribers,
                })
                .catch((error) => {
                    console.log(error.message);
                    return [];
                })
                .then(() => {
                    console.log("Promise completed");
                });
        });
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
    });
    newSubscriber
        .save()
        .then((result) => {
            res.render("thanks");
        })
        .catch((error) => {
            if (error) {
                res.send("error");
            }
        });
};
