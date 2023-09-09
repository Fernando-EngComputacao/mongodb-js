const {MongoClient} = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/tedb';


const client = new MongoClient(uri);

const connect = () => {
    return client.connect()
    .then(() => {
        console.log("CONECTADO");
        return client;
    })
    .catch(error => console.log(error));
}

const close = () => {
    client.close()
    .then(() => console.log("FECHADO"))
    .catch(error => console.log(error));
}
module.exports = {connect, close};


