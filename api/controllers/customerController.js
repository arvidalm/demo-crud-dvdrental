const { getAllCustomers, addCustomer, getCustomerByKeyword, editCustomer, deleteCustomer } = require("../repositories/customerRepository" );

async function search(req, res) {

    let data = await getCustomerByKeyword(req.query.keyword);

    console.log(data);

    return res.json(data);
}

async function add(req, res) {


    console.log(req.body)

    await addCustomer( req.body.title,req.body.id,req.body.genre,req.body.author_name,req.body.year);
}

async function edit(req, res) {

    console.log(req.body);

    await editCustomer( req.body.id,req.body.title,req.body.genre,req.body.author_name,req.body.year);
}

async function remove(req, res) {

    await deleteCustomer(req.body.title);
}

module.exports = {
    search,
    add,
    edit,
    remove
}
