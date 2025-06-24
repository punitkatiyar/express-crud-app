const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose')
const Student = require("./models/student.model")
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/unit')
    .then(() => console.log("database connected"))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/insert', (req, res) => {
    res.render('addContact', { title: "Insert Page" });
})
app.post('/insert', async (req, res) => {
    await Student.insertOne({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userMobile: req.body.userMobile,
    })
    res.redirect("/view")
})

app.get('/view', async (req, res) => {
    const students = await Student.find()
    // res.json(students);
    res.render('viewContact', { students });
})

app.get('/view/:id', async (req, res) => {
    const student = await Student.findOne({ _id: req.params.id })
    // res.json(students);
    res.render('profile', { student });
})

app.get('/edit/:id', async (req, res) => {
    const student = await Student.findOne({ _id: req.params.id })
    res.render('editContact', { student });
})


app.post('/edit/:id', async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/view")
})

app.get('/delete/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/view")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
