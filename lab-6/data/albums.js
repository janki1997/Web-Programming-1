let mongoCollections = require('../config/mongoCollections');
let albums = mongoCollections.albums;
let bands = mongoCollections.bands;


let GetAllAlbums = async (req, res) => {
    try {
        let albumcoll = await albums();
        let data = await albumcoll.find({}).toArray();
        let bandcoll = await bands();
        let bandID = [];
        data.forEach(ele => {
            bandID.push(new require('mongodb').ObjectID(ele.author))
        });
        let bandData = await bandcoll.find({ _id: { $in: bandID } }).toArray();
        data.forEach(ele => {
            bandData.forEach(element => {
                    if (ele.author == element._id.toString()) {
                        ele.author = {
                            _id :element._id.toString(),
                            bandName : element.bandName
                        }
                    }
                });
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

let CreateAlbums = async (req, res) => {
    try {
        console.log(req.body.title)
        console.log(typeof req.body.author)
        if (typeof req.body.title == "string" && typeof req.body.author == "string" && req.body.title && req.body.author && req.body.songs && req.body.songs.length) {

            let bandcoll = await bands();

            let id = new require('mongodb').ObjectID(req.body.author)
            let bandData = await bandcoll.findOne({ _id: id });
            console.log(bandData)
            if (bandData) {
                let albumsData = {
                    title: req.body.title,
                    songs: (req.body.songs.length) ? req.body.songs : [],
                    author: req.body.author
                };
                let albumcoll = await albums();
                let data = await albumcoll.insertOne(albumsData);
                bandData.albums.push(
                    data.ops[0]._id.toString()
                )
                let updateJson = {
                    $set: { albums: bandData.albums }
                }
                let updateBand = await bandcoll.updateOne({ _id: id }, updateJson);
                data.ops[0].author = {
                    _id: bandData._id,
                    bandName: bandData.bandName
                }
                res.status(200).json(data.ops[0]);
            } else {
                res.status(400).json("data is not correct");
            }
        } else {
            res.status(400).json("data is not correct");
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}


let GetAlbumsByID = async (req, res) => {
    try {
        if (req.params.id) {
            let albumcoll = await albums();
            let id = new require('mongodb').ObjectID(req.params.id)
            let albumsdata = await albumcoll.findOne({ _id: id });
            if (albumsdata == null) {
                res.status(404).json({ "error": "could not found data" });
            } else {
                let bandcoll = await bands();
                let banddata = await bandcoll.findOne({ _id: new require('mongodb').ObjectID(albumsdata.author) });
                if (banddata == null) {
                    res.status(404).json({ "error": "could not find data" });
                } else {
                    albumsdata.author = {
                        _id: banddata._id,
                        bandName: banddata.bandName
                    }
                    res.status(200).json(albumsdata);
                }
            }
        } else {
            res.status(404).json({ error: "id is not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

let UpdateAlbums = async (req, res) => {
    try {
        if (req.body.newTitle || req.body.newSongs) {
            let albumcoll = await albums();
            let ids = new require('mongodb').ObjectID(req.params.id);
            let albumsdata = await albumcoll.findOne({ _id: ids });
            if (albumsdata == null) {
                res.status(404).json({ "error": "could not find data" });
            } else {
                let id = new require('mongodb').ObjectID(req.params.id);
                let updateJson = {};
                if (req.body.newTitle) {
                    updateJson["title"] = req.body.newTitle;
                }

                if (req.body.newSongs) {
                    albumsdata.songs.push(req.body.newSongs);
                    updateJson["songs"] = albumsdata.songs
                }
                let albumcoll = await albums();
                let UpdateAlbum = await albumcoll.updateOne({ _id: id }, { $set: updateJson });
                if (UpdateAlbum.matchedCount === 0) {
                    res.status(404).json("can not update with id" + req.params.id)
                } else {
                    let data = await getAlbums(req.params.id);
                    res.status(200).json(data);
                }

            }
        } else {
            res.status(400).json({ error: "jeson file is not right." });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

let deleteAlbums = async (req, res) => {
    try {
        let albumsdata = await getAlbums(req.params.id);
        if (albumsdata == null) {
            res.status(404).json({ "error_message": "could not find data" });
        } else {
            let id = new require('mongodb').ObjectID(req.params.id);
            let albumcoll = await albums();
            let deleteAlbums = await albumcoll.deleteOne({ _id: id });
            albumsdata["deleted"] = true;
            let bandcoll = await bands();
            let bandid = new require('mongodb').ObjectID(albumsdata.author._id);
            let banddata = await bandcoll.findOne({ _id: bandid });
            if (banddata) {
                banddata.albums = banddata.albums.filter(dt => {
                    if (dt.toString() == id.toString()) {
                        return false;
                    } else {
                        return true
                    }
                });
                let updateJson = {
                    $set: { albums: banddata.albums }
                }
                let updateBand = await bandcoll.updateOne({ _id: bandid }, updateJson);
                res.status(200).json(albumsdata);
            } else {
                res.status(200).json(albumsdata);
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

}

let getAlbums = async (id) => {
    let albumcoll = await albums();
    let ids = new require('mongodb').ObjectID(id);
    let albumsdata = await albumcoll.findOne({ _id: ids });
    if(albumsdata == null){
        return albumsdata;
    }else{
        let bandcoll = await bands();
        let banddata = await bandcoll.findOne({ _id: new require('mongodb').ObjectID(albumsdata.author) });
            albumsdata.author = {
                _id: albumsdata.author,
                bandName:( banddata.bandName) ? banddata.bandName : ""
            }
            return albumsdata;
        }
    }


module.exports = {GetAllAlbums, CreateAlbums, GetAlbumsByID, UpdateAlbums, deleteAlbums}