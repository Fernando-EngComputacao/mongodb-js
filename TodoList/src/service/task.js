const mongodb = require("./../database/mongodb");

const client =  mongodb.connect();

const taskCollection = client.db().collection('task');

// INSERT
const insert = (task) => {
    taskCollection.insertOne(task)
        .then(
            result => {
                    console.log("Inserted task", result.insertedId);
            }
        )
        .catch(error => console.log(error));
}

//READ
const readByExpires = (experiesAt) => {
    const now = new Date().getTime();
    taskCollection.find({experiesAt:{$lt:now}})
        .toArray()
        .then(
            documents => {
                    console.log("Tasks experies", documents);
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

const readByUser = (userEmail) => {
    taskCollection.find({responsibles:{$in:userEmail}})
        .toArray()
        .then(
            documents => {
                    console.log("Tasks from reponsibles ", documents);
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

//UPDATE
const updateById = (_id, newTask) => {
    taskCollection.updateOne({_id}, {$set: newTask})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Updated Task sucessfully');
                  } else {
                    console.log('No update');
                  }
            }
        )
        .catch(error => console.log(error));
}

//DELETE
const deleteById = (_id) => {
    taskCollection.deleteOne({_id})
        .toArray()
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Deleted Task sucessfully');
                  } else {
                    console.log('No delete');
                  }
            }
        )
        .catch(error => console.log(error));
}

module.exports = {insert, readByExpires, readByUser, updateById, deleteById};