let bandsRoutes = require("./bands");
let albumsRoutes = require("./albums");

let constructorMethod = app => {
  app.use("/bands", bandsRoutes);
  app.use("/albums", albumsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Post could not found" });
  });
};

module.exports = constructorMethod;