const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv/config')

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Database Connection
const db = mysql.createConnection({
    // Database Information
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,   
});

// Check Database Connection
db.connect(err => {
    if (err) {
        console.log(err, 'DB error');
    } else {
        console.log('Database Connected...Successfully');
    }
});


// Get All Data
app.get('/workers', (req, res) => {
    // console.log('get all users data');

    let qr = `select * from workers`;
    
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0){
            console.log(result)
            res.send({
                message: 'All User Data',
                data: result
            });
        }
    });
});

// Get Signal Data
app.get('/workers/:id', (req, res) => {
    // console.log('get signal data')
    // console.log(req.params.id, 'getid')

    let getID = req.params.id;
    let qr = `select * from workers where id = ${getID}`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'Get Signal Data',
                data: result
            });
            console.log(result)
        } else {
            res.send({
                message: 'Data Not Found'
            });
        }
    });
});

// Create Data
app.post('/workers', (req, res) => {
    // console.log('postdata')
    // console.log(req.body, 'createdata')

    let lastName = req.body.lastname;
    let firstName = req.body.firstname;
    let eMail = req.body.email;
    let mobileN = req.body.mobile;

    let qr = `insert into workers(firstname, lastname, email,mobile)
              value('${firstName}', '${lastName}', '${eMail}', '${mobileN}')`;
    
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'Data Inserted'
        })
        // if (result.length > 0) {
        //     res.send({
        //         message: 'Data Inserted'
        //     });
        // } else {
        //     res.send({
        //         message: 'Data Insert Error...'
        //     });
        // }
    });
});

// Update Single Data
app.put('/workers/:id', (req, res) => {
    //console.log(req.body, 'update data')

    let getID = req.params.id;

    let lastName = req.body.lastname;
    let firstName = req.body.firstname;
    let eMail = req.body.email;
    let mobileN = req.body.mobile;

    let qr = `update workers set lastname='${lastName}', firstname='${firstName}', email='${eMail}', mobile='${mobileN}'
              where id=${getID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        } 
        res.send({
            message: 'Data Updated'
        })
    })
})

// Delete Single Data
app.delete('/workers/:id', (req, res) => {
    let queryID = req.params.id;

    let qr = `delete from workers where id = ${queryID}`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.send({
            message: 'Data Deleted'
        });
    });
});



app.listen(process.env.PORT, () => {
    console.log('Server Running...')
});