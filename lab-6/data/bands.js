let mongoCollections = require('../config/mongoCollections');
let bands = mongoCollections.bands;
let albums = mongoCollections.albums;

let GetAllBands = async (req, res) => {
    try {
        let bandcoll = await bands();
        let data = await bandcoll.find({}).toArray();
        let albumcoll = await albums();
        let albumsIds = [];
        data.forEach(ele => {
            ele.albums.forEach(ele1 => {
                albumsIds.push(new require('mongodb').ObjectID(ele1))
            });
        });
        let albumsdata = await albumcoll.find({ _id: { $in: albumsIds } }).toArray();
        data.forEach(ele => {
            let albums  =[];
            ele.albums.forEach(ele1 => {
                albumsdata.forEach(element => {
                    if (ele1 == element._id.toString()) {
                        albums.push(element)
                    }
                });
            });
            ele.albums = albums
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

let CreateBands = async (req, res) => {
    try {
    if (typeof req.body.bandName == "string" && typeof req.body.bandMembers == "object" && typeof req.body.yearFormed == "number" && typeof req.body.genres == "object" && typeof req.body.recordLabel == "string" && req.body.bandName  && req.body.bandMembers  && req.body.bandMembers.length  && req.body.yearFormed && req.body.genres && req.body.genres.length && req.body.recordLabel) {

                let bandcoll = await bands();
                let insertband = {
                    bandName: req.body.bandName,
                    bandMembers: req.body.bandMembers,
                    yearFormed: req.body.yearFormed,
                    genres: req.body.genres,
                    recordLabel: req.body.recordLabel,
                    albums: (req.body.albums && req.body.albums.length) ? req.body.albums : []
                };
                let data = await bandcoll.insertOne(insertband);
                res.status(200).json(data.ops[0]);
            

        } else {
            res.status(400).json({ error: "datatype is not correct" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

let GetBandByID = async (req, res) => {
    try {
        if (req.params.id) {
            let bandcoll = await bands();
            let id = new require('mongodb').ObjectID(req.params.id)
            let banddata = await bandcoll.findOne({ _id: id });
            if (banddata == null) {
                res.status(404).json({ "error": "could not found data" });
            } else {
                let albumsIds = []
                banddata.albums.filter(dt => {
                    albumsIds.push(new require('mongodb').ObjectID(dt));
                })
                let albumcoll = await albums();
                let albumsdata = await albumcoll.find({ _id: { $in: albumsIds } }).toArray();
                banddata.albums = albumsdata;
                res.status(200).json(banddata);
            }

        } else {
            res.status(404).json({ error: "id is not correct" });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

let Updateband = async (req, res) => {
    try {
        if (typeof req.body.bandName == "string" && typeof req.body.bandMembers == "object" && typeof req.body.yearFormed == "number" && typeof req.body.genres == "object" && typeof req.body.recordLabel == "string" && req.body.bandName  && req.body.bandMembers  && req.body.bandMembers.length  && req.body.yearFormed && req.body.genres && req.body.genres.length && req.body.recordLabel) {
            let banddata = await getBand(req.params.id);
            if (banddata == null) {
                res.status(404).json({ "error": "could not found data" });
            } else {
                let id = new require('mongodb').ObjectID(req.params.id);
                let renamejson = {
                    $set: {
                        "bandName": req.body.bandName,
                        "bandMembers": req.body.bandMembers,
                        "yearFormed": req.body.yearFormed,
                        "genres": req.body.genres,
                        "recordLabel": req.body.recordLabel,
                        "albums": (banddata.albums && banddata.albums.length) ? banddata.albums : []
                    }
                };
                let bandcoll = await bands();
                let updateband = await bandcoll.updateOne({ _id: id }, renamejson);
                if (updateband.matchedCount === 0) {
                    res.status(404).json("it can not update with id " + req.params.id)
                } else {
                    let data = await getBand(req.params.id);
                    let albumsIds = []
                    data.albums.filter(dt => {
                        albumsIds.push(new require('mongodb').ObjectID(dt));
                    })
                    let albumcoll = await albums();
                    let albumsdata = await albumcoll.find({ _id: { $in: albumsIds } }).toArray();
                    data.albums = albumsdata;
                    res.status(200).json(data);
                }
            }
        } else {
            res.status(400).json({ error: "datatype is not correct." });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

let deleteBand = async (req, res) => {
    try{
        let banddata = await getBand(req.params.id);
        if (banddata == null) {
            res.status(404).json({ "error": "could not find data" });
        } else {
            let id = new require('mongodb').ObjectID(req.params.id);
            let bandcoll = await bands();
            let deleteband = await bandcoll.deleteOne({ _id: id });
            let albumsIds = []
            banddata.albums.filter(dt => {
                albumsIds.push(new require('mongodb').ObjectID(dt));
            })
            let albumcoll = await albums();
            let albumsdata = await albumcoll.find({ _id: { $in: albumsIds } }).toArray();
            banddata.albums = albumsdata;
            let deletealbums = await albumcoll.deleteMany({ _id: { $in: albumsIds } });
            banddata["deleted"] = true;
            res.status(200).json(banddata);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

}

let getBand = async (id) => {
    let bandcoll = await bands();
    let ids = new require('mongodb').ObjectID(id)
    let banddata = await bandcoll.findOne({ _id: ids });
    return banddata;
}

module.exports = {GetAllBands,CreateBands,GetBandByID,Updateband,deleteBand}