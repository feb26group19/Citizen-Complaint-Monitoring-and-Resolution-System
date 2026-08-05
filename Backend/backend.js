let exp = require('express');
let mysql = require('mysql2');
let cors = require('cors');

let app = exp();

app.listen(3000, function () {
    console.log("exp started - rest API");
})


app.use(exp.json());      // req.body created
app.use(cors());


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "p19_complaintmonitoring_and_resolutionsystem_populated_db"
}); 

con.connect(function (err) {
    if (!err)
        console.log("Database connection established");
    else
        console.log("Database connection rejected");
});

app.post('/login', function (req, res) {

    let query = "SELECT * FROM users WHERE username = ? AND password = ?";

    con.query(query, [req.body.username, req.body.password], function (err, result) {

        if (!err) {

            if (result.length === 1) {

                res.status(200).json({
                    user: {
                        userid: result[0].userid,
                        username: result[0].username,
                        role: result[0].roleid
                    },
                    token: "abc123"
                });

            }
            else {
                res.status(404).send("Login Failed");
            }

        }
        else {
            res.status(500).send("Could not fetch data");
        }

    });

});



app.post('/register', function (req, res) {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let roleid = 2;     // Citizen Role


    let checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";

    con.query(checkQuery, [username, email], function (err, result) {

        if (err) {
            return res.status(500).send("Database Error");
        }

        if (result.length > 0) {
            return res.status(409).send("Username or Email already exists");
        }

        // Insert new user
        let insertQuery = "INSERT INTO users(username,email,password,roleid) VALUES(?,?,?,?)";

        con.query(insertQuery, [username, email, password, roleid], function (err, result) {

            if (!err) {
                res.status(201).send("Registration Successful");
            }
            else {
                res.status(500).send("Registration Failed");
            }

        });

    });

});


app.all('/*splat', function (req, res) {
    res.status(404).send("Invalid URL");
});