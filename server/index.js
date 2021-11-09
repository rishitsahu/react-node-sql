const express=require('express');
const cors=require('cors')
const axios=require('axios')
const mysql=require('mysql2')
const app=express();
app.use(cors())
app.use(express.json())
app.listen(3001,()=>{
    console.log("serber is running at portt 3001");
})
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rishit@123',
    database:'EmployeeDB'
})
db.connect((err)=>{
    if(!err)
    {
        console.log("db connection succeded")
    }else{
        console.log(`db connection failed {/n}${err}`);
    }
})


app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    //console.log(name)
    db.query(
        "INSERT INTO employeeSystem (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
  });

  app.get("/employees",(req,res)=>{
      db.query(`select * from employeeSystem`,(err,result)=>{
          if(err)
          {
              console.log("db error occured");
          }else{
              res.send(result);
          }
      })
  })

  app.delete("/:name",(req,res)=>{
      const name=req.params.name;
      console.log(name)
      db.query("delete from employeeSystem where name=?",[name],(err)=>{
          if(err)
          {
              console.log("db error"+err);
          }else{
              res.send("deleted successfully")
          }
      })
  })

  app.put("/update",(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    //console.log(name)
    db.query(
        "update employeeSystem set name=?, age=?, country=?, position=?, wage=? where name=?",
        [name, age, country, position, wage,name],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
  })