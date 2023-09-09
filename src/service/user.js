const mongodb = require("./../database/mongodb");

async function init() {
    const client = await mongodb.connect();
    return  client.db().collection('user');
};


// INSERT
const insert = async (user) => {
    const userCollection = await init();
    userCollection.insertOne(user)
        .then(
            result => {
                    console.log("Inserted user", result.insertedId);
                    mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

//READ
const readyBy = async (email) => {
    const userCollection = await init();
    return userCollection.find({email})
        .toArray()
        .then(
            documents => {
                    //console.log("USER email ", documents);
                    mongodb.close();
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

//UPDATE
const updateById = async (_id, newUser) => {
    const userCollection = await init();
    userCollection.updateOne({_id}, {$set: newUser})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Updated USER sucessfully');
                  } else {
                    console.log('No USER update');
                  }
                  mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

//DELETE
const deleteById = async (_id) => {
    const userCollection = await init();
    userCollection.deleteOne({_id})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Deleted USER sucessfully');
                  } else {
                    console.log('No USER delete');
                  }
                  mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

module.exports = {insert, readyBy, updateById, deleteById};