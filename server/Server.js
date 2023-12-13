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

// Approve student request
app.post('/signee/requests/approve/:signeeId', (req, res) => {
    const requestId = req.params.signeeId;

    // Assuming you have a table named 'student_requests' with a column 'status'
    const approveRequestQuery = "UPDATE studentsignees SET status = 'approved' WHERE signeeId = ?";
  
    dbStudentRegister.query(approveRequestQuery, [requestId], (err, result) => {
      if (err) {
        console.error('Error approving request:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log('Request approved successfully.');
      return res.status(200).json({ success: true });
    });
});

// Reject student request
app.post('/signee/requests/reject/:signeeId', (req, res) => {
    const requestId = req.params.signeeId;

    // Assuming you have a table named 'student_requests' with a column 'status'
    const approveRequestQuery = "UPDATE studentsignees SET status = 'reject' WHERE signeeId = ?";
  
    dbStudentRegister.query(approveRequestQuery, [requestId], (err, result) => {
      if (err) {
        console.error('Error reject request:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log('Request reject successfully.');
      return res.status(200).json({ success: true });
    });
});

app.get('/signee/requests/pending/:signeeId', (req, res) => {
    const signeeId = req.params.signeeId; // Extract signeeId from the request parameters

    // Assuming you have a table named 'signee_requests' to store requests
    const selectRequestsQuery = `
      SELECT registerstudent.name, registerstudent.year_level, registerstudent.course, registerstudent.department
      FROM registerstudent
      JOIN studentsignees ON registerstudent.id = studentsignees.studentId
      WHERE studentsignees.signeeId = ?;
    `;
  
    dbStudentRegister.query(selectRequestsQuery, [signeeId], (err, results) => {
      if (err) {
        console.error('Error fetching requested students:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      console.log('Requested students fetched successfully.');
      return res.status(200).json(results);
    });
  });

app.post("/request/signee", (req, res) => {
    const { studentId, assignedSigneeId } = req.body;
  
    // Assuming you have a table named 'signee_requests' to store requests
    const insertRequestQuery = "INSERT INTO studentsignees (studentId, signeeId, status) VALUES (?, ?, 'pending')";
  
    dbStudentRegister.query(insertRequestQuery, [studentId, assignedSigneeId], (err, result) => {
      if (err) {
        console.error("Error inserting request into the database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  // Assuming you have a column 'status' in your 'studentsignees' table
        const getStatusQuery = "SELECT status FROM studentsignees WHERE signeeId = ?";

        dbStudentRegister.query(getStatusQuery, [assignedSigneeId], (err, statusResult) => {
            if (err) {
                console.error('Error retrieving status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const status = statusResult[0].status;

            console.log('Request approved successfully. Status:', status);
            return res.status(200).json({ success: true, status });
        });
    });
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
        if (data.length > 0) {
            const student = data[0];
            //Para ma blocked na gyud ang account
            if (student.blocked) {
                return res.json("Blocked");
            } else {
                return res.json("Success");
            }
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

//Bag-o nakong gibutang
app.put('/viewstudentaccount/block/:id', (req, res) => {
    const { id } = req.params;
    const sqlGetStudent = 'SELECT * FROM registerstudent WHERE id=?';
    const sqlUpdateStatus = 'UPDATE registerstudent SET blocked=? WHERE id=?';

    dbStudentRegister.query(sqlGetStudent, [id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }

        if (result.length === 0) {
            return res.status(404).json({ Message: 'Student not found' });
        }

        const newBlockedStatus = !result[0].blocked;

        dbStudentRegister.query(sqlUpdateStatus, [newBlockedStatus, id], (err, updateResult) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }

            return res.json({ Message: 'Student blocked/unblocked successfully' });
        });
    });
});

app.put('/viewstudentaccount/unblock/:id', (req, res) => {
    const { id } = req.params;
    const sqlUpdateStatus = 'UPDATE registerstudent SET blocked=? WHERE id=?';

    dbStudentRegister.query(sqlUpdateStatus, [false, id], (err, updateResult) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }

        return res.json({ Message: 'Student unblocked successfully' });
    });
});

app.get('/get-user/:username', (req, res) => {
    const { username } = req.params;
    const sql = "SELECT * FROM registerstudent WHERE `username` = ?";
    dbStudentRegister.query(sql, [username], (err, data) => {
      if (err) {
        return res.json({ error: "Error" });
      }
      if (data.length > 0) {
        const user = data[0];
        const { email, year_level, department, course, name, id } = user;
        return res.json({ username: user.username, email, year_level, department, course, name, id });
      } else {
        return res.json({ error: "User not found" });
      }
    });
  });





//SigneeRegister Database
const dbSigneeRegister = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signeeregister"
});

app.post('/viewsigneeaccount/assign', (req, res) => {
    const { accountId, signeeId } = req.body;

    // Assuming you have a table named 'accounts' with a column 'assignedSigneeId'
    const updateAccountSQL = "UPDATE registersignee SET accountSigneeId = ? WHERE id = ?";
    dbSigneeRegister.query(updateAccountSQL, [signeeId, accountId], (updateAccountErr, updateAccountResult) => {
        if (updateAccountErr) {
            return res.status(500).json({ success: false, message: 'Error updating account', error: updateAccountErr });
        }

        if (updateAccountResult.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Account not found' });
        }

        return res.json({ success: true, message: 'Signee assigned successfully to the account' });
    });
});

app.get('/viewsigneeaccount/assigned/all', (req, res) => {
    // Assuming you have a database table that tracks assigned signees
    const sql = "SELECT * FROM registersignee WHERE `accountSigneeId` IS NOT NULL"; // Update with your actual table name
  
    // Execute the query to get all assigned signees
    dbSigneeRegister.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching assigned signees:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Respond with the list of assigned signees
      res.json(result);
    });
});


  app.put('/viewsigneeaccount/unassign/:id', (req, res) => {
    const signeeId = req.params.id;
  
    // Perform the unassignment logic here, update the database, etc.
  
    const sql = 'UPDATE registersignee SET accountSigneeId = NULL WHERE id = ?';
  
    dbSigneeRegister.query(sql, [signeeId], (err, result) => {
      if (err) {
        console.error('Error unassigning signee:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else {
        console.log('Signee unassigned successfully');
        res.json({ success: true, message: 'Signee unassigned successfully' });
      }
    });
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
        if (data.length > 0) {
            const signee = data[0];
            //Para ma blocked na gyud ang account
            if (signee.blocked) {
                return res.json("Blocked");
            } else {
                return res.json("Success");
            }
        } else {
            return res.json("Failed");
        }
    })
})

app.get('/viewsigneeaccount', (req, res) => {
    const sql = "SELECT * FROM registersignee"
    dbSigneeRegister.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.delete('/viewsigneeaccount/delete/:id', (req, res) => {
    const sql = 'DELETE FROM registersignee WHERE id=?';
    const id = req.params.id;
    dbSigneeRegister.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//Bag-o nakong gibutang
app.put('/viewsigneeaccount/block/:id', (req, res) => {
    const { id } = req.params;
    const sqlGetSignee = 'SELECT * FROM registersignee WHERE id=?';
    const sqlUpdateStatus = 'UPDATE registersignee SET blocked=? WHERE id=?';

    dbSigneeRegister.query(sqlGetSignee, [id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }

        if (result.length === 0) {
            return res.status(404).json({ Message: 'Signee not found' });
        }

        const newBlockedStatus = !result[0].blocked;

        dbSigneeRegister.query(sqlUpdateStatus, [newBlockedStatus, id], (err, updateResult) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }

            return res.json({ Message: 'Signee blocked/unblocked successfully' });
        });
    });
});

app.put('/viewsigneeaccount/unblock/:id', (req, res) => {
    const { id } = req.params;
    const sqlUpdateStatus = 'UPDATE registersignee SET blocked=? WHERE id=?';

    dbSigneeRegister.query(sqlUpdateStatus, [false, id], (err, updateResult) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }

        return res.json({ Message: 'Signee unblocked successfully' });
    });
});

app.get('/get-signee-user/:username', (req, res) => {
    const { username } = req.params;
    const sql = "SELECT * FROM registersignee WHERE `username` = ?";
    dbSigneeRegister.query(sql, [username], (err, data) => {
      if (err) {
        return res.json({ error: "Error" });
      }
      if (data.length > 0) {
        const user = data[0];
        const { email, name, designation, id } = user;
        return res.json({ username: user.username, email, name, designation, id });
      } else {
        return res.json({ error: "User not found" });
      }
    });
  });


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

app.get('/get-admin-user/:username', (req, res) => {
    const { username } = req.params;
    const sql = "SELECT * FROM registeradmin WHERE `username` = ?";
    dbAdminRegister.query(sql, [username], (err, data) => {
      if (err) {
        return res.json({ error: "Error" });
      }
      if (data.length > 0) {
        const user = data[0];
        const { username } = user;
        return res.json({ username: user.username });
      } else {
        return res.json({ error: "User not found" });
      }
    });
  });

//Server para ma gana ang database
app.listen(8082, ()=> {
    console.log('Listening...');
})