const express= require('express');
const app= express();

app.use(express.json());

let courses= [
    {id: 1, name: "java"},
    {id: 2, name: "javascript"},
    {id: 3, name: "python"}
];

app.get('/courses', (req, res) =>{
    res.json(courses);
})

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
})

app.put('/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    course.name = req.body.name;
    res.json(course);
})

app.listen('3000', () => {
    console.log("server started")
})
