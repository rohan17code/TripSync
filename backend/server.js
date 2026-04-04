const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gupta@6677",
  database: "grouptripsfinder"
});

db.connect(err => {
 if (err) {
   console.log(err);
 } else {
   console.log("MySQL Connected");
 }
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.post("/signup",(req,res)=>{

 const {name,email,password} = req.body;

 const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

 db.query(sql,[name,email,password],(err,result)=>{
   if(err){
     console.log(err);
     res.send("Error creating user");
   }else{
     res.send("User Registered Successfully");
   }
 });

});

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (result.length > 0) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "fail" });
    }

  });

});


app.post("/create-group",(req,res)=>{

 const { groupName,startDate,endDate,maxBudget } = req.body;

 const sql = "INSERT INTO travel_groups (group_name,start_date,end_date,max_budget) VALUES (?,?,?,?)";

 db.query(sql,[groupName,startDate,endDate,maxBudget],(err,result)=>{

   if(err){
     res.send(err);
   }else{
     res.json({
       message:"Group Created",
       groupId:result.insertId
     });
   }

 });

});


app.post("/add-member",(req,res)=>{

 const { groupId,name,city,budget } = req.body;

 const sql = "INSERT INTO members (group_id,name,city,budget) VALUES (?,?,?,?)";

 db.query(sql,[groupId,name,city,budget],(err,result)=>{

   if(err){
     res.send(err);
   }else{
     res.send("Member Added");
   }

 });

});


app.get("/best-destination/:groupId",(req,res)=>{

 const groupId = req.params.groupId;

 const sql = "SELECT AVG(budget) as avgBudget FROM members WHERE group_id=?";

 db.query(sql,[groupId],(err,result)=>{

   const avgBudget = result[0].avgBudget;

   let destination = "";

   if(avgBudget < 5000){
     destination = "Rishikesh";
   }
   else if(avgBudget < 10000){
     destination = "Jaipur";
   }
   else{
     destination = "Goa";
   }

   res.json({
     avgBudget,
     destination
   });

 });

});