//Using MongoDB Atlas
//Mongo Shell Connection Info:
    //mongo "mongodb+srv://cluster0-iqmdd.mongodb.net/test" --username cs230
    //pasword: cs230

//Tested with Google Chrome (Version 80.0.3987.132 (Official Build) (64-bit))
//Created, modified and tested on MacBook Pro running MacOS Mojave (Version 10.14.6 (18G103))
//Coded using JetBrains WebStorm

//Database Model
//This program allows the creation of collections into a database on MongoDB Atlas.
//The Customers collection nests the billing address, shipping address and user info into one collection
//It also contains a parameter CustomerID for joining later
//The Phones Collection has simple parameters for the information of the phone
//It also contains a parameter ModelID for joining later.
//The Orders collection keeps track of all orders made by specific users.
//When showing this collection we use the $lookup feature to join the Orders and Phone collection based on the Matched OrderID and ModelID
//This is done again to show the user associated with that purchase

//Please Note: An error occurs after repeated runs whereby the fund function will return undefined or and empty object for the phone update
//and also for the user update. While it does not display the data, the data is updated normally. This happens intermittently,
//on the first run it will work perfectly then it won't for a run then it will for a few runs and it will repeat this process over and over
//if ran repeatedly. I was unable to find a solution at time of upload.

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const client = new MongoClient("mongodb+srv://cs230:cs230@cluster0-iqmdd.mongodb.net/test", { useUnifiedTopology: true } );
let town = [];
let county = [];
let address = [];
let eircode = [];
// database name
const dbName = 'assignment5';

// Use connect method to connect to the server
client.connect(function(err) {
    // using the assert module for testing
    assert.equal(null, err);
    console.log("Connected successfully to server");

    // use this database
    const db = client.db(dbName);

    dropIfExists(db, function() {   //Drops Collections if they exist
        insertCustomer(db, function () { //Insert Customer information
            insertPhones(db, function () { //Insert Phone information
                updateDeletePhone(db, function () { //Update and Delete Phone information
                    findCustomer(db, function () { //Find Customer information for a specific Customer
                        updateDeleteCustomer(db, function () { //Update and Delete Customer information
                            insertOrders(db, function () { //Insert Order Information
                                showOrders(db, function () { //Show Order information for an order
                                    updateDeleteOrder(db, function () { //Update and Delete Order information
                                        client.close();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

//Checks if there are collections in the DB, if there are we drop them to create new ones.
const dropIfExists = function (db, callback) {

    db.listCollections().toArray(function (err, collectionInfos) {
        if(collectionInfos.length > 1) {
            db.collection("Customers").drop();
            db.collection("Phones").drop();
            db.collection("Orders").drop();
        }
        assert.equal(err, null);
        callback(collectionInfos);
    });
};

//insertCustomer() : insert ten customers in to "Customers"
//Nesting the shipping and billing address for ease of access later on when joining
    const insertCustomer = function (db, callback) {
        // Using the "documents" collection
        const collection = db.collection('Customers'); //Inserts into Customers Collection
        for(let i = 0; i<10; i++) //This sets random address info into arrays to be used later in insert
        {
            let townAr = getRandomTown().split(" ");
            town.push(townAr[0]);
            county.push(townAr[1]);
            address.push(getRandomAddress());
            eircode.push(getRandomEircode().toUpperCase());
        }
        // Insert some documents
        collection.insertMany([
            {
                "_id": undefined, //Auto set by MongoDB
                "Title": "Dr",
                "FirstName": "Alondra",
                "Surname": "Dunne",
                "Mobile": "0849937354",
                "Email": "alondra.dunne@purplemail.ie",
                "CustomerID": 1,    //Used for orders later
                "ShippingAddress": {    //Nested within Customer info
                    "AddressLine1": address[0], //Calls on random address at array index
                    "AddressLine2": undefined,
                    "Town": town[0],    //Calls for random town at array index
                    "CountyCity": county[0],    //Calls for random county at array index
                    "Eircode": eircode[0],      //Calls for random Eircode at array index
                    "BillingAddress": {     //Nested within Shipping info
                        "AddressLine1": address[0],
                        "AddressLine2": undefined,
                        "Town": town[0],
                        "CountyCity": county[0],
                        "Eircode": eircode[0],
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Ms",
                "FirstName": "Iarlaith",
                "Surname": "Kelly",
                "Mobile": "0843977120",
                "Email": "iarlaith.kelly@fuchsiamail.ie",
                "CustomerID": 2,
                "ShippingAddress": {
                    "AddressLine1": address[1],
                    "AddressLine2": undefined,
                    "Town": town[1],
                    "CountyCity": county[1],
                    "Eircode": eircode[1],
                    "BillingAddress": {
                        "AddressLine1": getRandomAddress(),
                        "AddressLine2": undefined,
                        "Town": town[1],
                        "CountyCity": county[1],
                        "Eircode": getRandomEircode().toUpperCase(),
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Mx",
                "FirstName": "Brigid",
                "Surname": "Flynn",
                "Mobile": "0844020733",
                "Email": "brigid.flynn@silvermail.ie",
                "CustomerID": 3,
                "ShippingAddress": {
                    "AddressLine1": address[2],
                    "AddressLine2": undefined,
                    "Town": town[2],
                    "CountyCity": county[2],
                    "Eircode": eircode[2],
                    "BillingAddress": {
                        "AddressLine1": address[2],
                        "AddressLine2": undefined,
                        "Town": town[2],
                        "CountyCity": county[2],
                        "Eircode": eircode[2],
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Mr",
                "FirstName": "Jack",
                "Surname": "Pearse",
                "Mobile": "0846783421",
                "Email": "jack.pearse@purplemail.ie",
                "CustomerID": 4,
                "ShippingAddress": {
                    "AddressLine1": address[3],
                    "AddressLine2": undefined,
                    "Town": town[3],
                    "CountyCity": county[3],
                    "Eircode": eircode[3],
                    "BillingAddress": {
                        "AddressLine1": address[3],
                        "AddressLine2": undefined,
                        "Town": town[3],
                        "CountyCity": county[3],
                        "Eircode": eircode[3],
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Mr",
                "FirstName": "Peter",
                "Surname": "Jackson",
                "Mobile": "0834569870",
                "Email": "peter.jackson@gmail.com",
                "CustomerID": 5,
                "ShippingAddress": {
                    "AddressLine1": address[4],
                    "AddressLine2": undefined,
                    "Town": town[4],
                    "CountyCity": county[4],
                    "Eircode": eircode[4],
                    "BillingAddress": {
                        "AddressLine1": address[4],
                        "AddressLine2": undefined,
                        "Town": town[4],
                        "CountyCity": county[4],
                        "Eircode": eircode[4],
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Mx",
                "FirstName": "James",
                "Surname": "Olev",
                "Mobile": "0819873425",
                "Email": "james.olev@jmail.ie",
                "CustomerID": 6,
                "ShippingAddress": {
                    "AddressLine1": address[5],
                    "AddressLine2": undefined,
                    "Town": town[5],
                    "CountyCity": county[5],
                    "Eircode": eircode[5],
                    "BillingAddress": {
                        "AddressLine1": getRandomAddress(),
                        "AddressLine2": undefined,
                        "Town": town[5],
                        "CountyCity": county[5],
                        "Eircode": getRandomEircode().toUpperCase(),
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Dr",
                "FirstName": "Steve",
                "Surname": "Rogers",
                "Mobile": "0871238769",
                "Email": "steve.rogers@hydramail.ie",
                "CustomerID": 7,
                "ShippingAddress": {
                    "AddressLine1": address[6],
                    "AddressLine2": undefined,
                    "Town": town[6],
                    "CountyCity": county[6],
                    "Eircode": eircode[6],
                    "BillingAddress": {
                        "AddressLine1": address[6],
                        "AddressLine2": undefined,
                        "Town": town[6],
                        "CountyCity": county[6],
                        "Eircode": eircode[6],
                    }
                },
            },
            {
                "_id": undefined,
                "Title": "Mx",
                "FirstName": "Fegal",
                "Surname": "Donaghue",
                "Mobile": "0857685435",
                "Email": "fergal.donaghue@fuchsiamail.ie",
                "CustomerID": 8,
                "ShippingAddress": {
                    "AddressLine1": address[7],
                    "AddressLine2": undefined,
                    "Town": town[7],
                    "CountyCity": county[7],
                    "Eircode": eircode[7],
                    "BillingAddress": {
                        "AddressLine1": address[7],
                        "AddressLine2": undefined,
                        "Town": town[7],
                        "CountyCity": county[7],
                        "Eircode": eircode[7],
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Miss",
                "FirstName": "Laura",
                "Surname": "Jones",
                "Mobile": "0890871234",
                "Email": "laura.jones@umail.ie",
                "CustomerID": 9,
                "ShippingAddress": {
                    "AddressLine1": address[8],
                    "AddressLine2": undefined,
                    "Town": town[8],
                    "CountyCity": county[8],
                    "Eircode": eircode[8],
                    "BillingAddress": {
                        "AddressLine1": getRandomAddress(),
                        "AddressLine2": undefined,
                        "Town": town[8],
                        "CountyCity": county[8],
                        "Eircode": getRandomEircode().toUpperCase(),
                    }
                }
            },
            {
                "_id": undefined,
                "Title": "Mrs",
                "FirstName": "Clare",
                "Surname": "Nunne",
                "Mobile": "0812435687",
                "Email": "clare.nunne@bluemail.ie",
                "CustomerID": 10,
                "ShippingAddress": {
                    "AddressLine1": address[9],
                    "AddressLine2": undefined,
                    "Town": town[9],
                    "CountyCity": county[9],
                    "Eircode": eircode[9],
                    "BillingAddress": {
                        "AddressLine1": address[9],
                        "AddressLine2": undefined,
                        "Town": town[9],
                        "CountyCity": county[9],
                        "Eircode": eircode[9],
                    }
                }
            }

        ], function (err, result) {
            // using the assert module for testing
            assert.equal(err, null);
            assert.equal(10, result.result.n);
            assert.equal(10, result.ops.length);
            // all good if we get to here
            console.log("Inserted 10 Customers into the collection");
            callback(result);
        });
    };

//insertCustomer() : insert ten phones in to "Phones"
const insertPhones = function (db, callback) {
    // Using the "documents" collection
    const collection = db.collection('Phones');
    // Insert some documents
    collection.insertMany([
        {
            "_id": undefined,
            "Manufacturer": "Samsung",
            "Model": "Galaxy A50",
            "Price": "320",
            "ModelID": 1    //Used for Orders later
        },
        {
            "_id": undefined,
            "Manufacturer": "Apple",
            "Model": "iPhone 11",
            "Price": "822",
            "ModelID": 2
        },
        {
            "_id": undefined,
            "Manufacturer": "Apple",
            "Model": "iPhone 11 Pro MAX",
            "Price": "1326",
            "ModelID": 3
        },
        {
            "_id": undefined,
            "Manufacturer": "OnePlus",
            "Model": "OnePlus 8 Pro",
            "Price": "799",
            "ModelID": 4
        },
        {
            "_id": undefined,
            "Manufacturer": "Samsung",
            "Model": "Galaxy S20 Plus",
            "Price": "1173",
            "ModelID": 5
        },
        {
            "_id": undefined,
            "Manufacturer": "Google",
            "Model": "Pixel 3a",
            "Price": "399",
            "ModelID": 6
        },
        {
            "_id": undefined,
            "Manufacturer": "Samsung",
            "Model": "Galaxy Note 10 Plus",
            "Price": "759",
            "ModelID": 7
        },
        {
            "_id": undefined,
            "Manufacturer": "Google",
            "Model": "Pixel 4 XL",
            "Price": "989",
            "ModelID": 8
        },
        {
            "_id": undefined,
            "Manufacturer": "Apple",
            "Model": "iPhone XR",
            "Price": "649",
            "ModelID": 9
        },
        {
            "_id": undefined,
            "Manufacturer": "Samsung",
            "Model": "Z Flip",
            "Price": "1520",
            "ModelID": 10
        }

    ], function (err, result) {
        // using the assert module for testing
        assert.equal(err, null);
        assert.equal(10, result.result.n);
        assert.equal(10, result.ops.length);
        console.log("Inserted 10 Phones into the collection");
        callback(result);
    });
};

const insertOrders = function (db, callback) {
    // Using the "documents" collection
    const collection = db.collection('Orders'); //Inserts into Orders
    // Insert some documents
    collection.insertMany([
        {
            "_id": undefined,
            "order_id": 1   //Will Match with CustomerID and ModelID
        },
        {
            "_id": undefined,
            "order_id": 2
        },
        {
            "_id": undefined,
            "order_id": 3
        },
        {
            "_id": undefined,
            "order_id": 4
        }

    ], function (err, result) {
        // using the assert module for testing
        assert.equal(err, null);
        assert.equal(4, result.result.n);
        assert.equal(4, result.ops.length);
        callback(result);
    });
};

const showOrders = function (db, callback) {
    // Using the "documents" collection
    const collection = db.collection('Orders');
    // Insert some documents
    collection.aggregate([
        { $lookup:
                {
                    from: 'Phones',
                    localField: 'order_id',
                    foreignField: 'ModelID',
                    as: 'PhoneDetails'
                }
        },
        { $lookup:
                {
                    from: 'Customers',
                    localField: 'order_id',
                    foreignField: 'CustomerID',
                    as: 'CustomerDetails'
                }
        },
    ]).toArray(function(err, res) {
        if (err) throw err;
        console.log("Order Information");
        console.log(res[0]); //Will display Shipping info while hiding Billing info
        callback(res);
    });
};

// findDocuments() : find documents in the "documents"
//                   collection (assuming it exists)
    const findCustomer = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('Customers');
        // Find some documents
        collection.find({"Email": "peter.jackson@gmail.com"}).toArray(function (err, docs) {    //Find info related to this email in Customers
            // using the assert module for testing
            assert.equal(err, null);
            console.log("Searching for Customer information with Email matching 'peter.jackson@gmail.com'");
            console.log("Found the following records");
            console.log(docs[0]); //Displays all info related to that user
            callback(docs);
        });
    };

//updateDeleteCustomer() = Updates a customer then outputs the resulting update
//                         Also deletes a random Customer from the DB

    const updateDeleteCustomer = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('Customers');
        // Update document where email is "alondra.dunne@purplemail.ie", set to "alondra.dunne@redmail.ie"
        collection.updateOne({Email: "alondra.dunne@purplemail.ie"} //Update user with this info
            , {$set: {Email: "alondra.dunne@redmail.ie", Title: "Mx", Mobile:"0874326758"}}, function (err, result) {
                // using the assert module for testing
                assert.equal(err, null);
                assert.equal(1, result.result.n);
            });
        collection.find({"Email": "alondra.dunne@redmail.ie"}).toArray(function (err, docs) {
            // using the assert module for testing
            assert.equal(err, null);
            console.log("Updated the customer: reset email field set to 'alondra.dunne@redmail.ie', reset title field set to 'Dr', reset mobile field set to '0874326758'");
            console.log(docs[0]);
        });
        //Delete user that has this info
        collection.deleteOne({Email : "clare.nunne@bluemail.ie", Mobile:"0812435687", FirstName: "Clare", Surname: "Nunne"}, function(err, result) {
            // using the assert module for testing
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the document with email : clare.nunne@bluemail.ie, mobile: 0812435687, FirstName: Clare, Surname: Nunne");
            callback(result);
        });
    };

//updateDeletePhone() = Updates a phone then outputs the resulting update
//                         Also deletes a random Phone from the DB
const updateDeletePhone = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('Phones');
    // Update document where email is "alondra.dunne@purplemail.ie", set to "alondra.dunne@redmail.ie"
    collection.updateOne({Model: "Z Flip"}
        , {$set: {Model: "ZX 780"}}, function (err, result) {
            // using the assert module for testing
            assert.equal(err, null);
            assert.equal(1, result.result.n);
        });
    collection.find({"Model": "ZX 780"}).toArray(function (err, docs) {
        // using the assert module for testing
        assert.equal(err, null);
        console.log("Updated the Phone model: Z Flip to ZX 780");
        console.log(docs[0]);
    });
    collection.deleteOne({Model : "Galaxy Note 10 Plus"}, function(err, result) {
        // using the assert module for testing
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the Phone with Model : Galaxy Note 10 Plus");
        callback(result);
    });
};

const updateDeleteOrder = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('Orders');
    // Update document where email is "alondra.dunne@purplemail.ie", set to "alondra.dunne@redmail.ie"
    collection.updateOne({order_id: 3}
        , {$set: {order_id: 6}}, function (err, result) {
            // using the assert module for testing
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the Order with order_id: 3 to order_id: 6");
        });
    collection.deleteOne({order_id : 2}, function(err, result) {
        // using the assert module for testing
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the Order with order_id: 2");
        callback(result);
    });
};

//Generators
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get Random Address
function getRandomAddress() {
    let streetname = [  //Array of roads/streets
        "Wolfe Tone Street",
        "Abbey Street",
        "Ailesbury Road",
        "Amiens Street",
        "Anglesea Road",
        "Baggot Street",
        "Bridge Street",
        "Chapel Street",
        "Carrickbrack Road",
        "College Green",
        "Dame Street",
        "Dawson Street",
        "Dorset Street",
        "Henry Street",
        "Howth Road",
        "Marrowbone Lane",
        "North Strand Road",
        "Pembroke Road",
        "Raglan Road ",
        "Falls Road"];
    return Math.floor(Math.random() * 60) + 1 + " " + streetname[Math.floor(Math.random() * 19)]; //Random number representing index
}

//Get Random Town and County/City
function getRandomTown() { //Array with Town Name and the County it is in
    var towns = [
        "Tallaght Dublin",
        "Callan Kilkenny",
        "Clonmel Tipperary",
        "Clara Kilkenny",
        "BennetsBridge Kilkenny",
        "Culraine Derry",
        "Cookstown Tyrone",
        "Carlingford Louth",
        "Athlone Westmeath",
        "Kilmessan Meath",
        "Killarney Kerry",
        "Kinsale Cork",
        "Clifden Galway",
        "Strokestown Roscommon",
        "Westport Mayo"];

    return towns[Math.floor(Math.random() * 14)]; //Random index
}

function getRandomEircode() {
    let alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //Alphabet array
    return alpha[Math.floor(Math.random() * 25)] + (Math.floor(Math.random() * (99 - 10)) + 10) + " " +
        alpha[Math.floor(Math.random() * 25)] + Math.floor(Math.random() * 10) + alpha[Math.floor(Math.random() * 25)] + Math.floor(Math.random() * 10); //Random eircode
}