
class Queue
{

    constructor()
    {
        this.items = [];
    }

    enqueue(item)
    {
        this.items.push(item);
    }

    dequeue()
    {
        if(this.isEmpty())
        {
            return "Underflow";
        }
        return this.items.shift();
    }

    isEmpty()
    {
        return this.items.length == 0;
    }

    peek()
        {
            return this.items.join();
        }

    size()
    {
        return this.items.length;
    }

}


let queue = new Queue;

queue.enqueue({
                   "compilerOptions": {
                       "target": "es5",
                       "module": "commonjs",
                       "sourceMap": true,
                       "watch": false,
                       "outDir": "./tsOutputs",
                       "libs": ["dom", "es2017"]
                   }
               });

queue.enqueue({"cat":{}});
queue.enqueue(44);
queue.enqueue("lisa");

console.log(queue.peek());

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());



app.get('/queue_peek', (req,res) => {
    if(queue.isEmpty())
    {
        res.send('Queue is empty');
    }
    res.send(queue.peek());
});


app.post('/queue_enqueue', (req, res) => {
    queue.enqueue(req.body);

    res.json("successfully enqueued " + req.body);
});
//

app.delete('/queue_dequeue', (req, res) => {
    console.log(queue.peek());
    res.json(queue.dequeue());
});


app.listen(port, () => console.log(`listening on port ${port}...`));

