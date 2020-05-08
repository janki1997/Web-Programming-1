let express = require('express');
let router = express.Router();
let data = require("../data");
let albums = data.albums;

router.get("/",albums.GetAllAlbums);

router.post("/",albums.CreateAlbums);

router.get("/:id",albums.GetAlbumsByID);

router.patch("/:id",albums.UpdateAlbums);

router.delete("/:id",albums.deleteAlbums);

module.exports = router
