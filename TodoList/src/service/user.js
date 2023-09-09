const mongodb = require("./../database/mongodb");

const client = mongodb.connect();

const userCollection = client.db().collection('user');

// INSERT
const insert = (user) => {
    userCollection.insertOne(user)
        .then(
            result => {
                    console.log("Inserted user", result.insertedId);
            }
        )
        .catch(error => console.log(error));
}

//READ
const readyBy = (email) => {
    userCollection.find({email})
        .toArray()
        .then(
            documents => {
                    console.log("USER email ", documents);
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

//UPDATE
const updateById = (_id, newUser) => {
    userCollection.updateOne({_id}, {$set: newUser})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Updated USER sucessfully');
                  } else {
                    console.log('No USER update');
                  }
            }
        )
        .catch(error => console.log(error));
}

//DELETE
const deleteById = (_id) => {
    userCollection.deleteOne({_id})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Deleted USER sucessfully');
                  } else {
                    console.log('No USER delete');
                  }
            }
        )
        .catch(error => console.log(error));
}

module.exports = {insert, readyBy, updateById, deleteById};