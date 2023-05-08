const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:    @localhost:5432/library')

async function selectCustomerByKeyword(keyword) {
    let data = await db.any(`SELECT * FROM book WHERE title LIKE '${keyword}%'`)

    return data
}

async function insertCustomer(title, id, genre, year, author_name) {
    db.none(`INSERT INTO book (title,id,genre,year,author_name)
             VALUES ('${title}','${id}','${genre}','${year}','${author_name}')`)
}

async function updateCustomer(id, title, genre, year, author_name) {
    await db.none(
        `UPDATE book SET title = '${title}', genre = '${genre}',year = '${year}', author_name = '${author_name}'  WHERE id = ${id}`
    )
}

async function deleteCustomer(title) {
    await db.none(`DELETE FROM book WHERE title = '${title}'`)
}

module.exports = {
    selectCustomerByKeyword,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
