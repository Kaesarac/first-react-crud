const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'admin',
    database: 'employeeSystem'
});

app.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    database.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', 
    [name,age,country,position,wage], 
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    }
    );
});

app.get('/employees', (req, res) => {
    database.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001, ()=>{
    console.log("Running on port 3001..");
});