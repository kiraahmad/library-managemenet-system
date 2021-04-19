const Books = require('../model/libraryModel.js')

exports.getBooks = (req, result) => {
    
    Books.getBooks( (err,data) => {
        if(err) {
            result.status(500).send({
                message: err.message || "Network Error"
            })
        } else {
            result.status(200).send({
                statusName: 'Success',
                statusCode: 200,
                data: data               
            })
        }
    })

}


exports.addBook = (req, result) => {
    const {book_name, author} = req.body
    
    if(book_name === undefined || author === undefined){
        result.status(401).send({
            message: 'please fillout all the fields'
        })
    }
    Books.addBook(book_name, author, (err,data) => {
        if(err) {
            result.status(500).send({
                message: err.message || "Network Error"
            })
        } else {
            result.status(201).send({
                statusName: 'Success',
                statusCode: 201,
                message: 'Book added Successfully',
                data             
            })
        }
    })

}

exports.updateBook = (req, res) => {

    const { id, book_name, author} = req.body

    if(id === undefined || book_name === undefined || author === undefined) {
        return res.status(404).send({
            message: " Please check the book's ID"
        })
    }
    Books.updateBook(id, book_name, author, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || 'Internal server error'
            })
        }else {
            res.status(200).send({
                statusName: 'Success',
                statusCode: 200,
                message: 'Book updated Successfully',
                data
            })
        }
    })
}

exports.deleteBook = (req, res) => {
    const { id } = req.params
    if(id === undefined ) {
        res.status(404).send({
            message: 'This book does not exist',
            statusCode: 404
        })
    } else {
        Books.deleteBook(id, (err, data) => {
            if(err) {
                res.status(500).send({
                    message: err.message || 'Internal server error',
                    statusCode: 500,
                    data : {
                        message: err.message
                    }
                })
            } else {
                res.status(200).send({
                    message: 'Book deleted',
                    statusCode: 200,
                    data
                })
            }
        })
    }
}