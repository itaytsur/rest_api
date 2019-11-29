const db = require("./database.js");

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());


// app.get('/api/queue', (req, res) => {
//     db.all("SELECT string FROM queue", function(err, rows){
//         res.json(rows);
//     });
// });

app.get('/api/queue', (req, res) => {
    db.all("SELECT string FROM queue", function(err, rows){
        res.send(rows.map(x => (x.string)));
    });
});

app.post('/api/queue', (req, res) => {
    let enqueue_str = JSON.stringify(req.body);
    db.run("INSERT INTO queue (string) VALUES (?)", enqueue_str, function(err, row){
        if (err){
            console.err(err);
            res.status(500).json({"error": err.message});
            return;
        }
        else{
            res.send("successfully enqueued:\n\n" + enqueue_str);
            // res.json(JSON.parse(enqueue_str));
        }
    });
});


app.delete('/api/queue', (req, res) => {
    db.get("SELECT string FROM queue LIMIT 1", function(err, string){
        db.run("DELETE FROM queue WHERE id = (SELECT id FROM queue LIMIT 1);");
        res.send(string);
    });
});

app.use(function(req, res){
    res.status(404);
});


app.listen(port, () => console.log(`Submit POST, DELETE, or GET to http://localhost:${port}/api/queue`));