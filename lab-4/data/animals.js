    const dbcollection = require("../mongoCollection");
    const animals = dbcollection.animals;


    async function create(name, animalType) {

            if (typeof name !== "string") 
                    throw new Error("Name needs to be in string")
            if (typeof animalType !== "string") 
                    throw new Error("animalType needs to be in string")
            if (!name) 
                    throw new Error("Please provide name.")
            if (!animalType) 
                    throw new Error("Please provide animalType");

            const animalCollection = await animals();

            const createData = await animalCollection.insertOne({ name: name, animalType: animalType });

            return createData.ops[0];

    }



    async function getAll() {   

            const animalCollection = await animals();

            const findData = await animalCollection.find({}).toArray();

            return findData;
    }



    async function get(id) {

           
            if (!id) {
                throw new Error ("You have to mention ID");
            } else {
        
                const animalCollection = await animals();
                const ob_id = {
                    _id: id
                }
           
                const findbyID = await animalCollection.findOne(ob_id);
                if (findbyID == null) {
                    throw new Error("none od animal have this ID")
                } else {
                    return findbyID;
                }
            } 
    }



    async function remove(id) {

            if (!id) {
                throw new Error("Id is not mention plese give it");
            } else {
        
                const animalCollection = await animals();
                const beforeDeleted = await this.get(id);
                const ob_id = {
                    _id: id
                
            }
                const removeID = await animalCollection.removeOne(ob_id);
                if (removeID.deletedCount === 0) {
                    throw new Error("Can not delete it data with this id" +id)
                }
                else{
                    return beforeDeleted;
                }
            
            }
                        }
    



    async function rename(id, newName) {

           
            if (!id) {
                    throw new Error ("You have to mention id.");
            } else if (!newName) {
                    throw new Error("You have to mention name.");
            } else if (typeof newName !== "string") {
                    throw new Error("Name nhas to be  string");
            } else {
                    const animalCollection = await animals();
                    const updateData = {
                    $set: { name: newName }
                };

                const ob_id = {
                    _id: id
                };

                const New_animal = await animalCollection.updateOne(ob_id, updateData);

                if (New_animal.matchedCount === 0) {
                        throw new Error("Can not update aname with id of " + id)
                } else {
                    const getdata = await this.get(id);
                    return getdata;
                }
            }

    }

    module.exports = {
        create: create,
        getAll: getAll,
        get: get,
        remove: remove,
        rename: rename
    }