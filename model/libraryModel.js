const sql = require("../db/dbConnect");

exports.getBooks = (result) => {

    let query = `SELECT * FROM books`;

    sql.query(query, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        
       
        
       result(null, res)
    });
}


exports.addBook = (book_name, author, result) => {
    let query = `INSERT INTO books VALUES ('', '${book_name}', '${author}')`;

    sql.query(query, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            const data = {
                id: res.insertId,
                Book: book_name,
                Author: author,
                statusCode: 201
            }
            result(null, data)
        }
       
        
    //    result(null, data)
    });
}

exports.updateBook = (id, book_name, author, result) => {
    let query = `UPDATE books
                 SET 
                 book_name='${book_name}',
                 author='${author}'
                 WHERE id = ${id}`;

                 sql.query(query, (err, res) => {
                    if (err) {
                        result(err, null);
                        return; 
                    } 
        
                    if(res.changedRows) {
                        const data = {
                            message: ' Book updated Successfully '
                        }
                        result(null, data);
                    } else {
                        const data = {
                            message: 'No updates were made'
                        }
                        result(null, data);
                    }
            })
}

exports.deleteBook = (id, result) => {
    let data = {
        message: ''
    }
    let query = `DELETE FROM books 
    WHERE id = ${id}`;

    sql.query(query, (err, res) => {

        if (err) {
            result(err, null)
            return
        }
        if(res.affectedRows > 0) {
            data.message = ' Book deleted Successfully '

            result(null, data)
        } else {
            data.message = 'Book was not deleted please check the ID '

            result(data, null)
        }
    })
}
