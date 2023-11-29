const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//StudentRegister Database
const dbStudentRegister = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studentregister"
});

//StudentRegister Database Component
app.post('/studentregister', (req, res) => {
    const sql = "INSERT INTO registerstudent (`name`,`year_level`,`course`,`department`,`email`,`username`,`password`) Values (?)";
    const values = [
        req.body.name,
        req.body.year_level,
        req.body.course,
        req.body.department,
        req.body.email,
        req.body.username,
        req.body.password
    ]
    dbStudentRegister.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/StudentLogin', (req, res) => {
    const sql = "SELECT * FROM registerstudent WHERE `username` = ? AND `password` = ?";
    dbStudentRegister.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.get('/adminhome', (req, res) => {
    const sql = "SELECT * FROM registerstudent"
    dbStudentRegister.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/adminhome/delete/:id', (req, res) => {
    const sql = 'DELETE FROM registerstudent WHERE id=?';
    const id = req.params.id;
    dbStudentRegister.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//SigneeRegister Database
const dbSigneeRegister = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signeeregister"
});

//SigneeRegister Database Component
app.post('/signeeregister', (req, res) => {
    const sql = "INSERT INTO registersignee (`name`,`designation`,`email`,`username`,`password`) Values (?)";
    const values = [
        req.body.name,
        req.body.designation,
        req.body.email,
        req.body.username,
        req.body.password
    ]
    dbSigneeRegister.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/SigneeLogin', (req, res) => {
    const sql = "SELECT * FROM registersignee WHERE `username` = ? AND `password` = ?";
    dbSigneeRegister.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

//AdminRegister Database
const dbAdminRegister = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "adminregister"
});

//AdminRegister Database Component
app.post('/adminregister', (req, res) => {
    const sql = "INSERT INTO registeradmin (`username`,`password`) Values (?)";
    const values = [
        req.body.username,
        req.body.password
    ]
    dbAdminRegister.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/AdminLogin', (req, res) => {
    const sql = "SELECT * FROM registeradmin WHERE `username` = ? AND `password` = ?";
    dbAdminRegister.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

//Server para ma gana ang database
app.listen(8082, ()=> {
    console.log('Listening...');
})