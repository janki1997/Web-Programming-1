    const animal = require("./data/animals");
    const connection = require("./mongoConnection");


    const main = async () => {
            const animalData1 = await animal.create("sasha", "Dog");

                console.log("sasha has added ");
                console.log(animalData1);


            const animalData2 = await animal.create("Lucy", "Dog");

                console.log("lucy has added");
                console.log(animalData2);
            

            const allMyAnimals = await animal.getAll();

                console.log(allMyAnimals);
            

            const animalDuke = await animal.create("Duke", "Walrus");

                console.log("duke has added who is now walrus");
                console.log(animalDuke);
        


            const removeBlubBlub = await animal.remove(animalData2._id);

                console.log("lucy is removed");
                console.log(removeBlubBlub);
        

            const renameSasha = await animal.rename(animalData1._id, "Sashita");
            
            
                console.log("sasha is renamed");
                console.log(renameSasha);
    
    
    };
    
    main().catch(error => {
        console.log(error);
    });