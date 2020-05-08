const peopleRoutes = require("./route");


const constructorMethod = app => {
    app.use("/", peopleRoutes);


    app.use("*", (req, res) => {
        res.status(404).json("Api not found.");
    });
};

module.exports = constructorMethod;