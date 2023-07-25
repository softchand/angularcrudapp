const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
const app  = express();
app.use(cors());
app.use(bodyparser.json());

// now will connect my sql database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ancrud',
    port:3306

});

// check database Connection
db.connect(err=>{
    if(err){
        console.log("error", err);
    }
    console.log('Database connected....')
})

// get data

app.get('/users',(req, res)=>{
    
    let qr = "SELECT * from users";
    db.query(qr,(err, result)=>{
        if(err){
            console.log(err, 'error')
        }
        if(result.length > 0){
            res.send({
                message:'all user data',
                data:result
            });
        }
    })
});

// get Single data
app.get('/users/:id',(req, res)=>{
    let gID = req.params.id;
    let qr = `select * from users where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send({
                message:"get single data",
                data:result
            })
        }
        else{
            res.send({
                message:'data not found'
            })
        }
    })
})

// create/Insert data

app.post('/users',(req,res)=>{
    console.log(req.body,"postdata");
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let qr = `insert into users(name,email,number) value('${name}','${email}','${number}' )`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result,"result");
        res.send({
            message:"User Data Inserted"
        })
        
    })
})

// Update data

app.put('/users/:id',(req,res)=>{
    console.log(req.body,"updatedata");
    
    let gID = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let qr = `update users set name = '${name}', email = '${email}', number = '${number}' where id = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:"User Data Updated"
        });
    });
})

// Delete Data
app.delete('/users/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `delete from users where id =${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err)}
        res.send({
            message:"User Data Deleted"
        })
    })
})

app.listen(3000, ()=>{
    console.log("server running");
});

