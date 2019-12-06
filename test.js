const SimpleSimplex = require('simple-simplex');
const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.post('/', (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const c = req.body.c;

    console.log(a);
    console.log(b);
    console.log(c);
    //console.log(a);


    // initialize a solver
    const solver = new SimpleSimplex({
        objective: {
            x1: 0,
            x2: 1,
            x3: 1,
            x4: 1,
            x5: 0
        },
        constraints: [
            {
                namedVector: { x1: 1, x2: 0, x3: 0, x4: 0, x5: 0 },
                constraint: '>=',
                constant: 42,
            },
            {
                namedVector: { x1: 1, x2: 1, x3: 1, x4: 1, x5: 1 },
                constraint: '<=',
                constant: 168 - a,
            },
            {
                namedVector: { x1: 1, x2: 0, x3: 0, x4: 0, x5: 0 },
                constraint: '>=',
                constant: 0,
            },
            {
                namedVector: { x1: 0, x2: 1, x3: 0, x4: 0, x5: 0 },
                constraint: '>=',
                constant: 0,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 1, x4: 0, x5: 0 },
                constraint: '>=',
                constant: 0,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 0, x4: 1, x5: 0 },
                constraint: '>=',
                constant: 0,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 0, x4: 0, x5: 1 },
                constraint: '>=',
                constant: 0,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 0, x4: b, x5: 0 },
                constraint: '>=',
                constant: c,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 1, x4: 0, x5: 0 },
                constraint: '<=',
                constant: 10,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 0, x4: 1, x5: 0 },
                constraint: '<=',
                constant: 35,
            },
            {
                namedVector: { x1: 0, x2: 0, x3: 0, x4: 0, x5: 1 },
                constraint: '>=',
                constant: 2,
            },
            {
                namedVector: { x1: 0, x2: 1, x3: 0, x4: 0, x5: 0 },
                constraint: '<=',
                constant: 35,
            },
        ],
        optimizationType: 'max',
    });

    // call the solve method with a method name
    const result = solver.solve({
        methodName: 'simplex',
    });

    // see the solution and meta data
    console.log({
        solution: result.solution,
        isOptimal: result.details.isOptimal,
    });

    res.send(result.solution.coefficients);
    
});

app.listen(process.env.port || 3000);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});