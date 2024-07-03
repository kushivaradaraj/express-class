const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    {id: 1, name: "java"},
    {id: 2, name: "javascript"},
    {id: 3, name: "python"}
];

// Logger middleware function
//return : method, ip, hostname, date
function logger(req, res, next) {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString(); //convert date to string
    
    console.log(`Method: ${method}, IP: ${ip}, Hostname: ${hostname}, Date: ${date}`);
    next();
}

// Use the logger middleware
app.use(logger);

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(singleCourse);
    res.send(courses);
});

app.put('/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    course.name = req.body.name;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    res.json(course);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
