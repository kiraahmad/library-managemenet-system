const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const books = require ('./controller/library')

const PORT = process.env.PORT || 3000
const app = express()

const publicPath = path.join(__dirname, './public')
app.use(express.static(publicPath))
app.set('view engine', 'html');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Welcome to Library Management System')
})

app.get('/get-books', books.getBooks)
app.post('/add-book', books.addBook)
app.put('/update-book', books.updateBook)
app.delete('/delete-book/:id', books.deleteBook)

app.listen(PORT, () => {
    console.log('App is up and running on port ' + PORT)
})