
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

db.serialize(() => {

    // db.run("DROP TABLE IF EXISTS queue");

    db.run("CREATE TABLE IF NOT EXISTS queue (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, string TEXT)");

    // db.each("SELECT id, string FROM queue", function(err, row) {
    //     console.log(row.id + ": " + row.string);
    // });

});


module.exports = db;
