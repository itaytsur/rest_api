
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/queue', (err) => {
    if(err){
        console.error(err.message);
        throw err;
    }
    else{
        console.log("Connected to SQLite Database");
    }
});

const dropOnEntry = process.env.DROP_ON_ENTRY

db.serialize(() => {

    if(dropOnEntry == 1234){
        db.run("DROP TABLE IF EXISTS queue");
    }

    db.run("CREATE TABLE IF NOT EXISTS queue (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, string TEXT)");
});


module.exports = db;
