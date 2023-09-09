const mongodb = require("./database/mongodb");
const taskService = require("./service/task");
const userService = require("./service/user");

const experies = new Date();
experies.setHours(23);

let maria, joao;

const user1 = {
    name: "José",
    email: "jose@email.com",
    password: "223"
}

const user2 = {
    name: "Maria",
    email: "maria@email.com",
    password: "223"
}

const task1 = {
    createdAt: new Date().getTime(),
    title: "Script java",
    description: "Dev script de java",
    attachment: 
    {
        url: "pdf",
        uploadedAt: new Date().getTime()
    },
    expiresAt: 1697079600000,
    doneAt: 1696906800000,
    responsibles: ["jose@email.com", "maria@email.com"] 
}


const task2 = {
    createdAt: new Date().getTime(),
    title: "Script Python",
    description: "Dev script de Python",
    attachment: 
    {
        url: "pdf",
        uploadedAt: new Date().getTime()
    },
    expiresAt: 1676474800000,
    doneAt: null,
    responsibles: ["maria@email.com"] 
}

//USERS
async function insertUser() {
    userService.insert(user1);
    userService.insert(user2);
}

async function readUser() {
    maria = (await userService.readyBy('maria@email.com'))[0];
    jose = (await userService.readyBy('jose@email.com'))[0];
    //console.log("MARIA -> ", maria);
    //console.log("JOSÉ -> ", jose);
}
//TASKS
async function insertTask() {
    taskService.insert(task1);
    taskService.insert(task2);
}

async function readTask() {
    await readUser();
    const taskFromMaria = await taskService.readByUser(maria.email);
    console.log('Task from Maria', taskFromMaria);
}

async function makeTaskExpires () {
    const now = new Date().getTime();
    const taskExpires = await taskService.readByExpires();
    console.log(taskExpires);
    
}


async function doneTaskUpdate () {
    const now = new Date().getTime();
    const taskExpires = await taskService.readByExpires();
    console.log(taskExpires);
    const taskExpires0 = taskExpires[0];
    taskService.updateById(taskExpires0._id, {...taskExpires0, doneAt: now});
}




async function deleteTask() {
    await readUser();
    
    console.log("\n***JOSÉ -> ", jose);
    const task = await taskService.readByUser(jose.email);
    console.log("\n***TASK DELETE -> ", task);
    taskService.deleteById(task[0]._id);

}

//insertUser();
//readUser();
//insertTask();
//readTask();
//doneTaskUpdate();
//makeTaskExpires();
//deleteTask();