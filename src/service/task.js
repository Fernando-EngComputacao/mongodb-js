const mongodb = require("./../database/mongodb");

async function init() {
    const client = await mongodb.connect();
    return  client.db().collection('task');
};

// INSERT
const insert = async (task) => {
    const taskCollection = await init();
    taskCollection.insertOne(task)
        .then(
            result => {
                    console.log("Inserted task", result.insertedId);
                    mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

//READ
const readByExpires = async () => {
    const taskCollection = await init();
    const now = new Date().getTime();
    return taskCollection.find({expiresAt:{$lte:now}})
        .toArray()
        .then(
            documents => {
                    //console.log("Tasks expires", documents);
                    mongodb.close();
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

const readByUser = async (userEmail) => {
    const taskCollection = await init();
    return taskCollection.find({responsibles:{$in:[userEmail]}})
        .toArray()
        .then(
            documents => {
                    //console.log("Tasks from reponsibles ", documents);
                    mongodb.close();
                    return documents;
            }
        )
        .catch(error => console.log(error));
}

//UPDATE
const updateById = async (_id, newTask) => {
    const taskCollection = await init();
    return taskCollection.updateOne({_id}, {$set: newTask})
        .then(
            result => {
                if (result.modifiedCount === 1) {
                    console.log('Updated Task sucessfully');
                  } else {
                    console.log('No update');
                  }
                  mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

//DELETE
const deleteById = async (_id) => {
    const taskCollection = await init();
    return taskCollection.deleteOne({_id})
        .then(
            result => {
                if (result.deletedCount > 0) {
                    console.log('Deleted Task sucessfully');
                  } else {
                    console.log('No delete');
                  }
                  mongodb.close();
            }
        )
        .catch(error => console.log(error));
}

module.exports = {insert, readByExpires, readByUser, updateById, deleteById};