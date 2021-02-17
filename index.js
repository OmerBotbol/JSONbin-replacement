const express = require('express');
const app = express();
const fs= require('fs');
const {readFileSync} = require('fs');


const listOfTasks=[];
fs.readdirSync('./task').forEach(file => {
    let task = JSON.parse(readFileSync(`./task/${file}`, {encoding: 'utf8', flag: 'r'}))
    listOfTasks.push(task)
});
// app.use(express.json());

app.get('/b', (req, res) =>{
    res.send(listOfTasks);
});
// app.get('/b/:id', (req, res) => {
//     const filteredTask = data.filter(task => task.id === req.params.id);
//     res.send(filteredTask);
// })

// app.post('/b', (req, res) =>{
//     req.writeFileSync('./', req.body);

// });

app.listen(3000, console.log("listening to port 3000"));