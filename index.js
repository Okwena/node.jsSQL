//W3 Scchools
//MYSQL getting started & creating a DB called mydb

const mysql = require('mysql2');

const con = mysql.createConnection({
    port: 3308,
    host: 'localhost' ,
    user: 'root',
    password: 'Kris6998',
    database: 'mydb'
});

con.connect(function(err) {
    if(err) throw err;
    console.log('Connected!');

    //Started with statement CREATE TABLETO CREATE A TABLE
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";

    con.query(sql, function(err, result){
        if (err) throw err;
        console.log(result);
    })
    //------------------------------------------
    //ALTER TABLE used to alter contents of a created table by adding index value to the records
    const sql = 'ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY';
//-------------------------------------------------------
    //Filling the table using INSERT INTO
    const sql = 'INSERT INTO customers (name, address) VALUES ("Company Inc", "Highway 37")';
//--------------------------------------------
//Inserting multiple records
const sql = 'INSERT INTO customers (name, address) VALUES ?'

var values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];

  //Inserting values into the table
    con.query(sql,[values], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

//-------------------------------------------------
//Show the value of customers
con.query('SELECT * FROM customers', function(err, result, fields) {
    if (err) throw err;
    console.log(result);
});

//-------------------------------------------------------
//selecting columns
con.query('SELECT name, address FROM customers', function(err, result, fields) {
    if (err) throw err;
    console.log(fields);
});

//------------------------------------------------------------------
//MySQL where - where acts as a filter for select
con.query('SELECT * FROM customers WHERE address = "Park Lane 38"', function(err, result){
    if (err) throw err;
    console.log(result);
});
//----------------------------------------------------------------
//using wildchards '%' - this will select addresses starting with S
con.query('SELECT * FROM customers WHERE address LIKE "S%"', function (err, result) {
    if (err) throw err;
    console.log(result);
})
//-----------------------------------------------------------------------
//Escaping query values
const adr = 'Mountain 21';
const sql2 = 'SELECT * FROM customers WHERE address - ?' //+ mysql.escape(adr);

con.query(sql2, [adr], function(err, result) {
    if (err) throw err;
    console.log(result);
});
//-------------------------------------------------------
// Sorting the result
con.query('SELECT * FROM customers ORDER BY name DESC', function(err, result){
    if (err) throw err;
    console.log(result);
});
//----------------------------------------------------------------------
//Deleting a record - using DELETE FROM
const sql3 = 'DELETE FROM customers WHERE address = "Mountain 21"';

con.query(sql3, function(err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
})
//-------------------------------------------------------------------
//MySQL DROP TABLE
//You can delete a table using DROP TABLE Statement
const sql = 'DROP TABLE customers';//DROP TABLE IF EXISTS customers - will stop an error occuring ifthe table is already deleted

con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('Table deleted');
})
//------------------------------------------------------------
//We can use the UPDATE keyword to update a table
const sql = 'UPDATE customers SET address = "Canyon 123" WHERE address = "Valley 345"';

con.query(sql, function (err,result) {
    if (err) throw err;
    console.log(result.affectedRows + ' records updated')
})

//--------------------------------------------------------------------
//Limiting the result using LIMIT statement
const sql = 'SELECT * FROM customers LIMIT 5';

con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
})

//---------------------------------------------------------------------
//Joining 2 tables
//CREATING USER TABLE
const userTable = 'CREATE TABLE users (name VARCHAR(255), favourite_product VARCHAR(255))';

const userTable = 'ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY';

const inputUserSQL = 'INSERT INTO users (name, favourite_product) VALUES ?';

const inputProductsSQL = 'INSERT INTO products (number , product) VALUES ?'

const productTable = 'CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, number INT, product VARCHAR(255))'

const userValues = [
    [ 'John', 'Banana'],
    [ 'Peter', 'Apple'],
    [ 'Amy', 'Pear'],
    [ 'Hannah', 'Melon' ],
    [ 'Michael', 'Paw Paw' ]
  ];

  const productValues = [
    [101, 'Banana'],
    [202, 'Apple'],
    [303, 'Melon'],
    [404, 'Apple']
  ]

  

//   create product table
  con.query(productTable, function(err, result) {
    if (err) throw err;
    console.log('Table created');
});

// insert values to products
con.query(inputProductsSQL, [productValues], function(err, result) {
    if (err) throw err;
    console.log(result.affectedRows + ' Products inputed');
})

// ---------------------------------------------------------------------
// show products data
con.query('SELECT * FROM products', function (err, result){
    if (err) throw err;
    console.log(result);
})

// ----------------------------------------------------------------------

//   show the table
  con.query('SELECT * FROM users', function(err, result){
    if (err) throw err;
    console.log(result)
  });

// --------------------------------------------------------------------
con.query(userTable, function(err, result) {
    if (err) throw err;
    console.log('Table updated');
})


// --------------------------------------------------------------------------
con.query(inputUserSQL,[userValues], function(err, results) {
    if (err) throw err;
    console.log('Number of records inserted ' + results.affectedRows);
});

// ------------------------------------------------------------------------
//Joining 2 tables
const sql = 'SELECT users.name AS name, products.number AS number FROM users RIGHT JOIN products ON users.favourite_product = products.product ';

con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
})


 });

