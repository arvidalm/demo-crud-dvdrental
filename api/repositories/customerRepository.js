const customerModel = require("../models/customerModel");
const db_context = require("../db_context");

async function getAllCustomers() {

    let customers = [];

    let data = await db_context.selectAllCustomers()

    data.forEach(customer => {
        customers.push(new customerModel(customer.title,customer.id,customer.genre,customer.author_name,customer.year,customer.availability))
    });

    return customers;
};

async function getCustomerByKeyword(keyword) {

    let customers = [];

    let data = await db_context.selectCustomerByKeyword(keyword)

    data.forEach(book => {
        customers.push(new customerModel(book.title,book.id,book.genre, book.year,book.author_name,book.availability))
    });

    return customers;
};

async function addCustomer(title,id,genre,year,author_name,) {

    db_context.insertCustomer(title,id,genre,year,author_name,);
};

async function editCustomer(title,id,genre,year,author_name) {

    db_context.updateCustomer(title,id,genre,year,author_name);
};

async function deleteCustomer(title) {

    db_context.deleteCustomer(title);
};

module.exports = {
    getAllCustomers,
    getCustomerByKeyword,
    addCustomer,
    editCustomer,
    deleteCustomer
}
