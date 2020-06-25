//Tested with Google Chrome (Version 80.0.3987.132 (Official Build) (64-bit))
//Created, modified and tested on Macbook Pro running MacOS Mojave (Version 10.14.6 (18G103))

var mysql = require('mysql');
let localFirst = [];
let localLast = [];
let email;
let phone;
let emailList = [];
let phoneList = [];
let idList = [];

//Create SQL connection to www.remotemysql.com
//Define Parameters
var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "5p744Fx3oI",
    password: "OmMyX9TarT",
    database: "5p744Fx3oI"
});

//C = Create
//Creating tables (dropping them if already created) and adding randomly generated data to them
//Drop existing tables of same names
con.connect(function(err) {
    if (err) throw err;
    var sql = "DROP TABLE IF EXISTS userinfo";  //If table exists, drop it to allow for creation of new table.
    con.query(sql, function (err, result) { //Query the SQL code
        if (err) throw err;
    });
    sql = "DROP TABLE IF EXISTS shippinginfo";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    //Create Table
    //Set ID to auto Increment to allow for unique ID values
    sql = "CREATE TABLE userinfo (ID INT AUTO_INCREMENT PRIMARY KEY, Title VARCHAR(80) NOT NULL, FirstName VARCHAR(80) NOT NULL, Surname VARCHAR(80) NOT NULL, Mobile INT NOT NULL, Email VARCHAR(80) NOT NULL)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    sql = "CREATE TABLE shippinginfo (ID INT AUTO_INCREMENT PRIMARY KEY, AddressLine1 VARCHAR(80) NOT NULL, AddressLine2 VARCHAR(80), Town VARCHAR(80) NOT NULL, CountyCity VARCHAR(80) NOT NULL, Eircode VARCHAR(80))";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    if (err) throw err;
    console.log("Connection Successful! Please wait while we retrieve your Database information"); //Connection successful
    
    //Create user and add to db
    //Creates 200 random users and adds them
     for(let i = 0; i<200; i++) {
        sql = "INSERT INTO userinfo (ID, Title, FirstName, Surname, Mobile, Email) VALUES ?"; //SQL Code
        let nameAr = getName().split(" "); //Name array to split name into first and second name based on whitespace
        localFirst.push(nameAr[0]); //Push firstname to firstname array
        localLast.push(nameAr[1]); //Push lastname to last name array
        phone = getRandomPhoneNumber(); //Assign random phone number to variable
        phoneList.push(phone); //Push phone number to phone number array
        email = getRandomEmail(nameAr[0].toLowerCase(), nameAr[1].toLowerCase()); //Create Email based on first and second name pushed to lower characters
        emailList.push(email); //Assign email to email array
        idList.push(i+1); //Push id value i + 1 to id array, i + 1 is used as i is set to zero by default and id begins at value 1
        var values = [
            //UNDEFINED AS ID IS AUTO INCREMENTING
            [undefined, getRandomTitle(), nameAr[0], nameAr[1], phone, email],
        ];

        //Insert random data to table
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
     }

     //Same process as before just using shippinginfo table instead of userinfo, ID's match on both.
    for(var i = 0; i<200; i++) {
        sql = "INSERT INTO shippinginfo (ID, AddressLine1, AddressLine2, Town, CountyCity, Eircode) VALUES ?";
        let townAr = getRandomTown().split(" "); //Split randomTown to town and county
        values = [
            //UNDEFINED AS ID IS AUTO INCREMENTING
            [undefined, getRandomAddress(), undefined, townAr[0], townAr[1], getRandomEircode().toUpperCase()],
        ];

        //Insert values into table
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    }

    //Get total number of rows added to userinfo
    con.query("SELECT count(*) AS count FROM userinfo", [values], function (err, result) {
        if (err) throw err;
        console.log(result[0].count + " Records Added to the table 'userinfo'");
    });
    //Get total number of rows added to shipping info
    con.query("SELECT count(*) AS count FROM shippinginfo", [values], function (err, result) {
        if (err) throw err;
        console.log(result[0].count + " Records Added to the table 'shippinginfo'");
    });

    //R =  (retrieve/search), randomly chosen user
    var randomUser = Math.floor(Math.random() * 200);
    //Using a Join SQL query as ID is set as primary key, this allows us to join the two tables matching them using the value of ID in both
    con.query("SELECT U.ID, U.Title, U.FirstName, U.Surname, U.Mobile, U.Email, S.ID, S.AddressLine1, S.AddressLine2, S.Town, S.CountyCity, S.Eircode FROM userinfo AS U, shippinginfo AS S WHERE U.ID = S.ID AND U.FirstName LIKE '" + localFirst[randomUser] + "' AND U.Surname LIKE '" + localLast[randomUser] + "' AND U.Email LIKE '" + emailList[randomUser] + "' AND U.Mobile LIKE " + phoneList[randomUser], function (err, result, fields) {
        if (err) throw err;
        console.log("ID: " + result[0].ID + " Name: " + result[0].Title + " " + result[0].FirstName + " " + result[0].Surname + " Mobile: 0" + result[0].Mobile + " Email Address: " + result[0].Email + " Address Line 1: " + result[0].AddressLine1 + " Address Line 2: " + result[0].AddressLine2 + " Town: " + result[0].Town + " County/City: " + result[0].CountyCity + " Eircode: " + result[0].Eircode);
        //Using result[0]."Column Name" returns the value within that cell
    });

    //U = Update randomly
    // select a user and update three elements of their personal (phone, email, Title).
    // Also Updated Address Line 2 and their Eircode.
    randomUser = Math.floor(Math.random() * 200);
    con.query("SELECT U.ID, U.Title, U.FirstName, U.Surname, U.Mobile, U.Email, S.ID, S.AddressLine1, S.AddressLine2, S.Town, S.CountyCity, S.Eircode FROM userinfo AS U, shippinginfo AS S WHERE U.ID = S.ID AND U.FirstName LIKE '" + localFirst[randomUser] + "' AND U.Surname LIKE '" + localLast[randomUser] + "' AND U.Email LIKE '" + emailList[randomUser] + "' AND U.Mobile LIKE " + phoneList[randomUser], function (err, result, fields) {
        if (err) throw err;
        console.log("User to be updated:");
        console.log("ID: " + result[0].ID + " Name: " + result[0].Title + " " + result[0].FirstName + " " + result[0].Surname + " Mobile: 0" + result[0].Mobile + " Email Address: " + result[0].Email + " Address Line 1: " + result[0].AddressLine1 + " Address Line 2: " + result[0].AddressLine2 + " Town: " + result[0].Town + " County/City: " + result[0].CountyCity + " Eircode: " + result[0].Eircode);
    });
    //localFirst[randomUser] is the array we created as a local Database to hold the values of first names we randomly generated. T
    //This allows ease of access to the names using the index of the randomUser number generated above.
    //This process is used throughout using different arrays for last name, phone, and email also.
    con.query("UPDATE userinfo SET Title = 'Miss' WHERE FirstName = '" + localFirst[randomUser] + "' AND Surname = '" + localLast[randomUser] + "'", function (err, result) {
        if (err) throw err;
    });
    con.query("UPDATE userinfo SET Mobile = 831867983 WHERE FirstName = '" + localFirst[randomUser] + "' AND Surname = '" + localLast[randomUser] + "'", function (err, result) {
        if (err) throw err;
    });
    con.query("UPDATE userinfo SET Email = '" + localFirst[randomUser].toLowerCase() + "1324@gmail.com' WHERE FirstName = '" + localFirst[randomUser] + "' AND Surname = '" + localLast[randomUser] + "'", function (err, result) {
        if (err) throw err;
    });

    con.query("UPDATE shippinginfo SET Eircode = 'R98 K6Q2' WHERE ID = " + idList[randomUser], function (err, result) {
        if (err) throw err;
    });
    con.query("UPDATE shippinginfo SET AddressLine2 = 'Old Narrow View' WHERE ID = " + idList[randomUser], function (err, result) {
        if (err) throw err;
        console.log("Update Complete! Here is the new data:");
    });
    con.query("SELECT U.ID, U.Title, U.FirstName, U.Surname, U.Mobile, U.Email, S.ID, S.AddressLine1, S.AddressLine2, S.Town, S.CountyCity, S.Eircode FROM userinfo AS U, shippinginfo AS S WHERE U.ID = S.ID AND U.ID = " + idList[randomUser], function (err, result, fields) {
        if (err) throw err;
        console.log("ID: " + result[0].ID + " Name: " + result[0].Title + " " + result[0].FirstName + " " + result[0].Surname + " Mobile: 0" + result[0].Mobile + " Email Address: " + result[0].Email + " Address Line 1: " + result[0].AddressLine1 + " Address Line 2: " + result[0].AddressLine2 + " Town: " + result[0].Town + " County/City: " + result[0].CountyCity + " Eircode: " + result[0].Eircode);
    });

    //D = Delete User
    //Select user matching email, phone and name(both first and last)
    randomUser = Math.floor(Math.random() * 200);
    con.query("SELECT U.ID, U.Title, U.FirstName, U.Surname, U.Mobile, U.Email, S.ID, S.AddressLine1, S.AddressLine2, S.Town, S.CountyCity, S.Eircode FROM userinfo AS U, shippinginfo AS S WHERE U.ID = S.ID AND U.FirstName LIKE '" + localFirst[randomUser] + "' AND U.Surname LIKE '" + localLast[randomUser] + "' AND U.Email LIKE '" + emailList[randomUser] + "' AND U.Mobile LIKE " + phoneList[randomUser], function (err, result, fields) {
        if (err) throw err;
        console.log("User to be deleted:");
        console.log("ID: " + result[0].ID + " Name: " + result[0].Title + " " + result[0].FirstName + " " + result[0].Surname + " Mobile: 0" + result[0].Mobile + " Email Address: " + result[0].Email + " Address Line 1: " + result[0].AddressLine1 + " Address Line 2: " + result[0].AddressLine2 + " Town: " + result[0].Town + " County/City: " + result[0].CountyCity + " Eircode: " + result[0].Eircode);
    });
    con.query("DELETE FROM userinfo WHERE FirstName LIKE '" + localFirst[randomUser] + "' AND Surname LIKE '" + localLast[randomUser] + "' AND Email LIKE '" + emailList[randomUser] + "' AND Mobile LIKE " + phoneList[randomUser], function (err, result, fields) {
        if (err) throw err;
    });
    con.query("DELETE FROM shippinginfo WHERE ID = " + idList[randomUser], function (err, result, fields) {
        if (err) throw err;
        console.log("User Deleted!");
    });
});

//Generators
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Random Phone number Generator
function getRandomPhoneNumber() {
    let prefix = Math.floor(Math.random() * 9) + 1; //Generates random Prefix, the 08 is already there so this produces the third number
    let num = Math.floor(Math.random() * 9000000) + 1000000; //Generates random 7 digit number
    return "8" + prefix + num; //Adds these values together, NOTE: we don't add a zero as the SQL table doesn't recognize it
}

//Get Random Title
function getRandomTitle () {
    let ar = ["Mx", "Mr","Ms", "Mrs", "Miss", "Dr", "Other"]; //Array of titles
    return ar[Math.floor(Math.random() * 6)]; //Genereates random number that acts as an index
}

//Get Random Email
function getRandomEmail(first, last) { //Takes in first and last name
    let year = Math.floor(Math.random() * (20 - 10)) + 10; //generates random year between 2010 and 2020
    return first + "." + last +".20" + year + "@mumail.ie" //Adds string values together with mu mail at the end
}

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
//Random Name Generator
//Given by Dr.John Keating
// CSO Baby Names of Ireland (https://www.cso.ie/en/interactivezone/visualisationtools/babynamesofireland/)
var bNames =
    `Conor
        Daniel
        Adam
        Liam
        Tadhg
        Luke
        Charlie
        Darragh
        Harry
        Oisín
        Michael
        Alex
        Fionn
        Cillian
        Thomas
        Jamie
        Patrick
        Rían
        Finn
        Seán
        Oliver
        Ryan
        Dylan
        Matthew
        Ben
        Bobby
        John
        Leo
        Cian
        Aaron
        Max
        Ethan
        Alexander
        Jake
        Tom
        Jacob
        Alfie
        David
        Senan
        Oscar
        Sam
        Callum
        Mason
        Ollie
        Aidan
        Theo
        William
        Leon
        Joseph
        Tommy
        Joshua
        Lucas
        Evan
        Donnacha
        Logan
        Luca
        Samuel
        Nathan
        Cathal
        Shay
        Archie
        Jayden
        George
        Kai
        Andrew
        Louis
        Danny
        Rory
        Theodore
        Freddie
        Eoin
        Benjamin
        Billy
        Hugo
        Muhammad
        Ronan
        Robert
        Arthur
        Kayden
        Christopher
        Henry
        Frankie
        Dara
        Kyle
        Ruairí
        Edward
        Isaac
        Martin
        Odhran
        Eli
        Mark
        Anthony
        Josh
        Zach
        Joey
        Odhrán
        Kevin
        Tadgh
        Jaxon
        Scott
        Sonny
        Tomás
        Cormac
        Peter
        Sean
        Eoghan
        Brody
        Shane
        Killian
        Tiernan
        Sebastian
        Carter
        Hunter
        Daithí
        Ciarán
        Rian
        Teddy
        Tyler
        Arlo
        Gabriel
        Jackson
        Eric
        Cody
        Éanna
        Lorcan
        Alan
        Filip
        Joe
        Elliot
        Rhys
        Oran
        Calvin
        Nicholas
        Blake
        Harrison
        Paddy
        Brian
        Caleb
        Louie
        Harvey
        Cole
        Páidí
        Séan
        Reuben
        Denis
        Ted
        Iarlaith
        Jason
        Donagh
        Elliott
        Riley
        Iarla
        Lewis
        Jordan
        Antoni
        Elijah
        Cooper
        Paul
        Hugh
        Rowan
        Daire
        Gerard
        Keelan
        Kian
        Jonathan
        Jude
        Lukas
        Jakub
        Zack
        Johnny
        Stephen
        Niall
        Charles
        Felix
        Levi
        Bradley
        Fiachra
        Conn
        Zac
        Cameron
        Kacper
        Milo
        Dáire
        Dáithí
        Robbie
        Olly
        Caolán
        Owen
        Corey
        Oskar
        Conall
        Jan
        Jonah
        Robin
        Mateo
        Adrian
        Shea
        Toby
        Diarmuid
        Myles
        Leonardo
        Ned
        Grayson
        Séamus
        Dean
        Jesse
        Zachary
        Dominic
        Pádraig
        Ruadhán
        Colm
        Richard
        Philip
        Frank
        Will
        Dan
        Christian
        Keegan
        Matteo
        Aodhán
        Gearóid
        Reece
        Marcel
        Franciszek
        Parker
        Ian
        Noel
        Conan
        Rocco
        Aleksander
        Darius
        Casey
        Jaxson
        Kieran
        Timothy
        Naoise
        Peadar
        Matei
        Kaiden
        Fíonn
        Ross
        Colin
        Lennon
        Emmet
        Luka
        Ali
        Mikey
        Maximilian
        Aiden
        Damian
        Art
        Harley
        Finley
        Daragh
        Connor
        Dominik
        Austin
        Caelan
        Jimmy
        Flynn
        Hudson
        Cían
        Mícheál
        Tiarnán
        Calum
        Lee
        Tristan
        Marcus
        Donal
        Donncha
        Bernard
        Lochlann
        Maksymilian
        Stefan
        Nathaniel
        Julian
        Cayden
        Beau
        Elias
        Lachlan
        Ezra
        Gavin
        Seamus
        Brendan
        Szymon
        Vincent
        Francis
        Ruben
        Ibrahim
        Tobias
        Faolán
        Brandon
        Darren
        Simon
        Jay
        Caolan
        Hayden
        Victor
        Mikolaj
        Alexandru
        Mohamed
        Andrei
        Andy
        Caiden
        Jace
        Cuán
        Eóin
        Micheál
        Oisin
        Justin
        Brooklyn
        Kealan
        Frederick
        Seth
        Dawson
        Lochlan
        Odin
        Beauden
        Barry
        Maxim
        Jim
        Roman
        Ahmad
        Luan
        Bruno
        Ralph
        Tymon
        Jasper
        Enzo
        Miles
        Rua
        Ewan
        Ivan
        Troy
        Pearse
        Ferdia
        Jeremiah
        Wiktor
        Diego
        Artur
        Olaf
        Leighton
        Lorenzo
        Culann
        Jayce
        Otis
        Eóghan
        Sé
        Dawid
        Morgan
        Mohammad
        Tony
        Nikodem
        Mohammed
        Nicolas
        Cuan
        Malachy
        Caden
        Rafael
        Ellis
        Alec
        Barra
        Paudie
        Lenny
        Reggie
        Shéa
        Tomas
        Dillon
        Declan
        Kane
        Ashton
        Donnchadh
        Bill
        Albert
        Fabian
        Cristian
        Ayaan
        Quinn
        Brayden
        Kyron
        Tommie
        Tymoteusz
        Ayan
        Brogan
        Carson
        Mylo
        Omar
        Spencer
        Zain
        Nico
        Zion
        Ignacy
        Ruadh
        Gael
        Cúan
        Dónal
        Seán Óg
        Séimí
        Padraig
        Patryk
        Mateusz
        Gary
        Euan
        Olan
        Marco
        Ultan
        Natan
        Oliwier
        Chris
        Piotr
        Tomasz
        Benas
        Eryk
        Domhnall
        Thady
        Axel
        Emanuel
        Rohan
        Asher
        Fiach
        Ailbe
        Bodhi
        Brodie
        Zayn
        Bogdan
        Hamish
        Matias
        Remy
        River
        Albie
        Caoimhín
        Kyren
        Lorcán
        Ódhran
        Micheal
        Tiarnan
        Michal
        Davin
        Jeremy
        Kajus
        Hubert
        Hamza
        Pedro
        Leonard
        Ajay
        Matt
        Maximus
        Raphael
        Syed
        Eduard
        Milan
        Rio
        Wyatt
        Emmett
        Freddy
        Tajus
        Yusuf
        Jenson
        Kody
        Teodor
        Óisín
        Senán
        Steven
        Damien
        Eamon
        Neil
        Eamonn
        Joel
        Roan
        Ahmed
        Laurence
        Warren
        Erik
        Karol
        Pauric
        Emil
        Mike
        Miguel
        Rayan
        Abdul
        Dennis
        Jonas
        Terence
        Cain
        Kristian
        Kyran
        Marko
        Eden
        Kaylum
        Lochlainn
        Lucca
        Braxton
        Arijus
        Karson
        Rayyan
        Avery
        Kayson
        Croí
        Fionán
        Pádraic
        Séadna
        Ace
        Ciaran
        Ruairi
        Marc
        Riain
        Emmanuel
        Travis
        Raymond
        Bartosz
        Bailey
        Glenn
        Jerry
        Aron
        Gregory
        Turlough
        Abel
        Eddie
        Krzysztof
        Xavier
        Wojciech
        Markus
        Regan
        Ricky
        Amir
        Kylan
        Luis
        Mustafa
        Nataniel
        Viktor
        Malik
        Rion
        Walter
        Zane
        Aronas
        Alessio
        Darach
        Heath
        Koby
        Mannix
        Markas
        Phoenix
        Rares
        Cruz
        Iosua
        John-Paul
        Marley
        Seamie
        Vlad
        Jordi
        Koa
        Olivers
        Lugh
        Mj
        Fionnán
        Maitiú
        Ólan
        Ultán
        Seanán
        Oakley
        Daithi
        Karl
        Bryan
        Pierce
        Kamil
        Olivier
        Mathew
        Conal
        Zak
        Aran
        Nikita
        Preston
        Roy
        Igor
        Devin
        Mario
        Abdullah
        Andre
        Feidhlim
        Maksim
        Nojus
        Devon
        Gerry
        Maurice
        Stanislaw
        Byron
        Cal
        Dominick
        Dominykas
        Aryan
        Callan
        Christy
        Con
        Cullen
        Danielius
        Fred
        Hassan
        Kaleb
        Kalvin
        Anas
        Beniamin
        Ephraim
        Ruan
        Timmy
        Alistair
        Erick
        Abraham
        Bobbie
        Bruce
        Coby
        Davi
        Dorian
        Evanas
        Haris
        Hughie
        Macdara
        Miley
        Moise
        Nikolas
        Richie
        Benny
        Constantin
        Dalton
        Herkus
        Iarfhlaith
        Kenny
        Kobi
        Kylian
        Musa
        Noa
        Timas
        Tudor
        Rico
        Karter
        Ari
        Henryk
        Zayan
        Kaiser
        Kit
        Páraic
        Rónán
        Jax
        Craig
        Shaun
        Matas
        Clayton
        Kenneth
        Tim
        Saul
        Daryl
        Gareth
        Maxwell
        Seanan
        Cailum
        Larry
        Emilis
        Jody
        Keenan
        Aedan
        Allan
        Fynn
        Jaiden
        Raul
        Alfred
        Angelo
        Cahir
        Chulainn
        Culainn
        Giovanni
        Guy
        Jia
        Kajetan
        Lincoln
        Milosz
        Orin
        Pavel
        Quin
        Zayd
        Barney
        Borys
        Dexter
        Ezekiel
        Franklin
        Aarav
        Aodh
        Kasper
        Ksawery
        Layton
        Rodrigo
        Rogan
        Sonnie
        Tommy Lee
        Tommy-Lee
        Youssef
        Zaid
        Zakaria
        Azlan
        Caolin
        Dario
        Eyad
        Gabriels
        Gene
        Idris
        Ishaan
        Jj
        Jonathon
        Kevins
        Lughaidh
        Mathias
        Mohamad
        Santiago
        Setanta
        Timur
        Valentin
        Vladimir
        Yahya
        Yaseen
        Coen
        Denver
        Mieszko
        Vihaan
        Alby
        Colby
        Damir
        Thiago
        Tyson
        Yousuf
        Clark
        Donnie
        Cobi
        Jakov
        Kiaan
        Advik
        Aodán
        Azaan
        Bernardo
        Bradán
        Cadán
        Clay
        Óran
        Rónan
        Ruán
        Seánie
        Sunny
        Théo
        Ruaidhrí
        Lawson
        Kaison
        Laoch
        Yazan
        Orán
        Pádhraic
        T J
        Teidí
        Cúán
        Denny
        Benett
        Aris
        Boston
        Brín
        Glen
        Enda
        Aodhan
        Fintan
        Padraic
        Desmond
        Finlay
        Rossa
        Antonio
        Zachariah
        Diarmaid
        Kilian
        Dion
        Finian
        Kornel
        Marcos
        Trevor
        Terry
        Carlos
        Damon
        Jared
        Kaden
        Malachi
        Russell
        Sami
        Solomon
        Wesley
        Aleks
        Anton
        Dwayne
        Enrico
        Erikas
        Felim
        Gabrielius
        Jarlath
        Jerome
        Kallum
        Lennox
        Roberto
        Rui
        Samson
        Taha
        Cohen
        Don
        Geordan
        Isaiah
        Johan
        Jon
        Kade
        Keagan
        Kurt
        Manus
        Micah
        Remi
        Roger
        Theodor
        Tiago
        Torin
        Xander
        Alejandro
        Aleksandr
        Amos
        Blaise
        Caine
        Dante
        Elvis
        Eunan
        Harris
        Jakob
        Jamal
        Joris
        Adomas
        Aj
        Arjun
        Artem
        Asa
        Ashley
        Bowie
        Casper
        Colton
        Cuinn
        Denas
        Domas
        Douglas
        Fletcher
        Franek
        Jensen
        Korey
        Lucian
        Malcolm
        Matej
        Neitas
        Nolan
        Rex
        Rylan
        Rylee
        Safwan
        Sebastien
        Steve
        Teo
        Tobiasz
        Umar
        Antony
        Arnold
        Augustas
        Ayman
        Cezary
        Connie
        Darby
        Dhruv
        Dominiks
        Donald
        Finbar
        Isac
        Israel
        Jozef
        Kaelan
        Kenzo
        Kodi
        Lleyton
        Marius
        Matheus
        Mihai
        Miracle
        Quentin
        Reginald
        Reid
        Roland
        Sameer
        Sidney
        T.J.
            Timotei
        Usman
        Yassin
        Ammar
        Archer
        Axl
        Breffni
        Arham
        Kobe
        Rob
        Sawyer
        Affan
        Jad
        Judah
        Kason
        Ziggy
        Bryson
        Cade
        Cillían
        Conán
        Éamonn
        Reyansh
        Rí
        Ríain
        Rohaan
        Younis
        Llewyn
        Malek
        Séadhna
        Seb
        Reign
        Reon
        Knox
        Vincenzo
        Rián
        Magnus
        Ríoghan
        Ronán
        Klayton
        Mikaeel
        Samy
        C J
        Alonzo
        Cónán
        Daimhín
        Evaan
        Feidhelm
        Féilim
        Beckett
        Bríon
        Afonso
        Forrest
        Eliezer
        Dómhnall
        Jem
        Casian`.split(/\n/);

// CSO Baby Names of Ireland (https://www.cso.ie/en/interactivezone/visualisationtools/babynamesofireland/)
var gNames =
    `Emily
        Grace
        Fiadh
        Sophie
        Hannah
        Amelia
        Ava
        Ellie
        Ella
        Mia
        Lucy
        Emma
        Lily
        Olivia
        Chloe
        Aoife
        Caoimhe
        Molly
        Anna
        Sophia
        Holly
        Freya
        Saoirse
        Kate
        Sadie
        Robyn
        Katie
        Ruby
        Evie
        Éabha
        Cara
        Sarah
        Isabelle
        Isla
        Alice
        Leah
        Sadhbh
        Eva
        Erin
        Róisín
        Zoe
        Sofia
        Zara
        Willow
        Charlotte
        Lauren
        Jessica
        Faye
        Ciara
        Clodagh
        Millie
        Isabella
        Eve
        Niamh
        Maya
        Layla
        Ada
        Rosie
        Abigail
        Julia
        Clara
        Maisie
        Amy
        Maria
        Aria
        Alannah
        Annie
        Harper
        Aoibhín
        Emilia
        Amber
        Bonnie
        Mila
        Heidi
        Ailbhe
        Bella
        Abbie
        Ivy
        Aoibheann
        Rose
        Sienna
        Elizabeth
        Georgia
        Rebecca
        Laura
        Ellen
        Méabh
        Alexandra
        Kayla
        Isabel
        Hollie
        Mary
        Áine
        Aisling
        Hazel
        Rachel
        Tara
        Evelyn
        Megan
        Doireann
        Daisy
        Hanna
        Lara
        Mollie
        Maeve
        Sara
        Lilly
        Luna
        Victoria
        Hailey
        Hayley
        Poppy
        Fíadh
        Zoey
        Penny
        Pippa
        Ayla
        Ayda
        Nina
        Annabelle
        Penelope
        Indie
        Alanna
        Maja
        Paige
        Lola
        Naoise
        Cora
        Matilda
        Elsie
        Laoise
        Nora
        Lexi
        Eleanor
        Hallie
        Lottie
        Aoibhe
        Ruth
        Lena
        Phoebe
        Nicole
        Eimear
        Jane
        Síofra
        Siún
        Brooke
        Mya
        Gracie
        Summer
        Tess
        Eliza
        Caitlin
        Alison
        Darcie
        Esmé
        Madison
        Lucia
        Maggie
        Callie
        Muireann
        Beth
        Kathleen
        Tessa
        Croía
        Aoibhinn
        Jasmine
        Isobel
        Juliette
        Savannah
        Riley
        Caragh
        Kara
        Stella
        Liliana
        Ariana
        Florence
        Darcy
        Esme
        Ríona
        Zuzanna
        Bridget
        Nadia
        Gabriela
        Aurora
        Éala
        Róise
        Kayleigh
        Cassie
        Elena
        Anastasia
        Nevaeh
        Alicia
        Aaliyah
        Allie
        Scarlett
        Naomi
        Margaret
        Maia
        Elise
        Farrah
        Katelyn
        Shauna
        Orla
        Aimee
        Vanessa
        Alana
        Natalia
        Rhea
        Skye
        April
        Alicja
        Nancy
        Mae
        Arabella
        Keeva
        Aoibh
        Robin
        Pearl
        Eden
        Remi
        Taylor
        Alisha
        Catherine
        Casey
        Nessa
        Lacey
        Thea
        Iris
        Maddison
        Tilly
        Bláithín
        Lydia
        Zofia
        Nell
        Amelie
        Teagan
        Alyssa
        Helena
        Juliet
        Lia
        Beatrice
        Cadhla
        Fia
        Edie
        Harley
        Violet
        Oliwia
        Jade
        Melissa
        Sally
        Elle
        Leila
        Aisha
        Gabriella
        Addison
        Maryam
        Elodie
        Frankie
        Gráinne
        Alex
        Diana
        Daria
        Kyra
        Ana
        Lana
        Lillie
        Norah
        Belle
        Quinn
        Éadaoin
        Orlaith
        Erica
        Faith
        Libby
        Lillian
        Lyla
        Harriet
        Arya
        Cali
        Ellie-Mae
        Nova
        Skylar
        Aoibhínn
        Abby
        Jennifer
        Michaela
        Ali
        Claire
        Yasmin
        Dearbhla
        Lucie
        Piper
        Bláthnaid
        Clíodhna
        Úna
        Eabha
        Sorcha
        Andrea
        Kelsey
        Rosa
        Francesca
        Aliyah
        Klara
        Mabel
        Lila
        Bailey
        Emmie
        Kaia
        Nela
        Skyler
        Roisín
        Sinéad
        Danielle
        Aleksandra
        Amanda
        Bronagh
        Darcey
        Ema
        Hope
        Antonia
        Saibh
        Juno
        Margot
        Síomha
        Moya
        Stephanie
        Christina
        Martha
        Carly
        Marie
        Maebh
        Ria
        Alisa
        Mariam
        Miriam
        Evelina
        Elisa
        Connie
        Billie
        Liadh
        Pola
        May
        Avery
        Priya
        Ariella
        Myla
        Louise
        Joanna
        Ally
        Annabel
        Cleo
        Eloise
        Vivienne
        Dara
        Gloria
        Kali
        Eliana
        Zahra
        Maisy
        Maci
        Croíadh
        Heather
        Claudia
        Aideen
        Ann
        Elisha
        Bethany
        Joy
        Sadbh
        Meghan
        Andreea
        Marta
        Arianna
        Halle
        Iseult
        Ayesha
        Myah
        Aya
        Emelia
        Kylie
        Aurelia
        Alba
        Harlow
        Indy
        Kenzie
        Khloe
        Lilah
        Saorlaith
        Valentina
        Adeline
        Dani
        Haniya
        Stevie
        Seoidín
        Shannon
        Jodie
        Kelly
        Wiktoria
        Jenna
        Ashley
        Karolina
        Sasha
        Fatima
        Helen
        Keela
        Natalie
        Beibhinn
        Meadhbh
        Weronika
        Erika
        Imogen
        Angelina
        Winnie
        Amira
        Aida
        Milana
        Autumn
        Marcelina
        Reina
        Rylee
        Michelle
        Leona
        Fiona
        Meabh
        Carla
        Kaitlyn
        Brianna
        Kacey
        Nikola
        Samantha
        Linda
        Sandra
        Serena
        Veronica
        Eileen
        Johanna
        Lauryn
        Madeleine
        Louisa
        Laragh
        Milena
        Izabella
        Paula
        Bianca
        Alessia
        Annalise
        Olive
        Ceoladh
        Edith
        Ryleigh
        Sonia
        Anaya
        Bowie
        Vada
        Eibhlín
        Esmée
        Tori
        Gabrielle
        Julie
        Angel
        Lexie
        Lea
        Una
        Neasa
        Demi
        Karina
        Esther
        Pia
        Emilija
        Leyla
        Martina
        Anne
        Daniela
        Rosemary
        Jessie
        Kyla
        Maura
        Seren
        Mai
        Polly
        Kornelia
        Selena
        Delia
        Ellie-May
        Giulia
        Kitty
        Dakota
        Ella-Mae
        Lily-Mae
        Maddie
        Melody
        Sofija
        Blake
        June
        Philippa
        Caitlín
        Órlaith
        Réiltín
        Zoë
        Síne
        Alaia
        Abbey
        Emer
        Patricia
        Charley
        Ailish
        Paulina
        Alexa
        Caoilinn
        Eilish
        Emilie
        Jamie
        Greta
        Makayla
        Mary-Kate
        Adele
        Christine
        Kaya
        Miya
        Eryn
        Lina
        Amina
        Elisabeth
        Gianna
        Irene
        Izabela
        Kaylee
        Lily-Rose
        Aifric
        Alma
        Bobbi
        Ellie-Mai
        Gaia
        Lois
        Alia
        Dorothy
        Drew
        Georgie
        Lilianna
        Melisa
        Aubrey
        Ida
        Kyah
        Rayna
        Stefania
        Everleigh
        Everly
        Wynter
        Chloé
        Mairéad
        Nicola
        Lisa
        Rachael
        Chantelle
        Sabrina
        Laila
        Charlie
        Melanie
        Caitlyn
        Klaudia
        Deborah
        Angela
        Stacey
        Nia
        Tianna
        Zainab
        Teresa
        Celine
        Nelly
        Saorla
        Aliya
        Judith
        Lili
        Neala
        Paris
        Alise
        Amna
        Anya
        Leia
        Mackenzie
        Selina
        Winifred
        Amalia
        Adah
        Adelina
        Agnes
        Alayna
        Amara
        Amaya
        Ella-Rose
        Indi
        Joni
        Liana
        Macie
        Melania
        Noor
        Rebeca
        Rowan
        Syeda
        Ayra
        Beatrix
        Fallon
        Freyja
        Noreen
        Vayda
        Harleigh
        Winter
        Aibhín
        Béibhinn
        Bríd
        Cáit
        Éirinn
        Íde
        Máire
        Nainsí
        Nóra
        Órla
        Réaltín
        Sibéal
        Érin
        Shona
        Keira
        Aoibhin
        Martyna
        Kirsten
        Katherine
        Tia
        Caroline
        Gabija
        Jorja
        Daniella
        India
        Susan
        Clare
        Enya
        Caoilainn
        Adriana
        Kiara
        Madeline
        Samara
        Kimberly
        Vanesa
        Alexia
        Milly
        Aoileann
        Hayleigh
        Kira
        Hana
        Livia
        Alva
        Anais
        Darci
        Dora
        Gwen
        Kaja
        Maud
        Rosanna
        Wendy
        Alina
        Alix
        Allison
        Ameila
        Anastazja
        Khadija
        Kiya
        Lavinia
        Aiza
        Arwen
        Aubree
        Averie
        Barbara
        Celeste
        Eibhlin
        Eshaal
        Ines
        Jasmina
        Josie
        Kalina
        Leja
        Miley
        Minnie
        Talia
        Theodora
        Yasmina
        Bella-Rose
        Brooklyn
        Delilah
        Eila
        Emmi
        Gia
        Ioana
        Lukne
        Marianna
        Myra
        Nel
        Raina
        Serah
        Tillie
        Yara
        Ellie mae
        Adaline
        Effie
        Faya
        Paisley
        Tuiren
        Aodhla
        Essie
        Aimée
        Ariyah
        Ayat
        Clíona
        Evelin
        Mirha
        Renée
        Fiádh
        Leanne
        Chelsea
        Nadine
        Avril
        Josephine
        Carrie
        Kamila
        Lorna
        Simone
        Dawn
        Jenny
        Kathryn
        Sive
        Gabriele
        Kaci
        Tiffany
        Magdalena
        Mikayla
        Alexandria
        Antonina
        Katy
        Fionnuala
        Jana
        Jess
        Katrina
        Philomena
        Estera
        Iga
        Joyce
        Julianna
        Kimberley
        Larissa
        Patricija
        Sofie
        Yusra
        Camelia
        Carmen
        Carolina
        Emmanuella
        Honor
        Lainey
        Alexis
        Audrey
        Bria
        Ebony
        Emile
        Hailie
        Honey
        Lidia
        Adela
        Adelaide
        Amelia-Rose
        Amirah
        Anabelle
        Ela
        Elia
        Elina
        Ellie-Rose
        Emmy
        Isha
        Jannat
        Kaiya
        Karlie
        Kendall
        Kourtney
        Kyrah
        Lily Mae
        Lyra
        Malwina
        Mara
        Marnie
        Miah
        Migle
        Moira
        Nika
        Reagan
        Soraya
        Thalia
        Treasa
        Vivien
        Afric
        Alena
        Ariah
        Atene
        Athena
        Betty
        Constance
        Darla
        Diya
        Eman
        Fatimah
        Flora
        Giorgia
        Jayda
        Kady
        Kaelyn
        Kora
        Leen
        Liepa
        Lilli
        Liv
        Maisey
        Marwa
        Meadow
        Mina
        Mira
        Miruna
        Olivija
        Oonagh
        Poppie
        Raya
        Remy
        Rena
        Riadh
        Roxanne
        Shelby
        Sommer
        Teodora
        Zoya
        Noa
        Meara
        Romi
        Harlee
        Esmai
        Saileog
        Sloane
        Córa
        Erín
        Júlia
        Lilith
        Lylah
        Reya
        Ríadh
        Rua
        Seána
        Shóna
        Líle
        Siana
        Mealla
        Sia
        Rylie
        Peigí
        Mollaí
        Lucía
        Seóna
        Aylah
        Alys
        Cíara
        Céala
        Damaris
        Blossom
        Féile
        Aadhya
        Éila
        Éire
        Sinead
        Gemma
        Abi
        Keelin
        Kellie
        Cliona
        Tegan
        Karen
        Sharon
        Kiera
        Alesha
        Shania
        Deirdre
        Joanne
        Kasey
        Toni
        Dominika
        Orlagh
        Caoilfhionn
        Kayley
        Kerrie
        Noelle
        Valerie
        Genevieve
        Julianne
        Noemi
        Zarah
        Bernadette
        Meg
        Princess
        Tamara
        Teegan
        Agata
        Brigid
        Denise
        Kaitlin
        Mary Kate
        Rhiannon
        Rita
        Sylvia
        Teigan
        Theresa
        Aela
        Aleena
        Elsa
        Marina
        Michalina
        Tiana
        Celina
        Destiny
        Elaina
        Haley
        Iman
        Isolde
        Olwyn
        Rebeka
        Samira
        Sefora
        Tabitha
        Ailis
        Alissa
        Astrid
        Bebhinn
        Caela
        Cecelia
        Ekaterina
        Eunice
        Evanna
        Frances
        Izzy
        Kallie
        Luiza
        Mallaidh
        Matylda
        Adina
        Amaia
        Amelija
        Arisha
        Asia
        Ayah
        Bianka
        Blanka
        Camilla
        Caoileann
        Cassidy
        Cindy
        Ella May
        Ella Rose
        Fae
        Gaja
        Hafsa
        Ina
        Inaaya
        Izabelle
        Lilla
        Luisa
        Luka
        Macy
        Manuela
        Marika
        Milla
        Molly Mae
        Petra
        Peyton
        Pixie
        Raisa
        Riah
        Shayla
        Susanna
        Sylvie
        Teja
        Tierna
        Urszula
        Viktoria
        Zoja
        Allegra
        Anabia
        Ananya
        Andra
        Anika
        Anna Rose
        Annabella
        Arina
        Beatriz
        Blair
        Bobbie
        Caelyn
        Dalia
        Darya
        Elianna
        Emilee
        Emily-Rose
        Emmeline
        Esmay
        Estela
        Feena
        Hanorah
        Ilinca
        Indiana
        Iqra
        Kaitlynn
        Karly
        Kiyah
        Laya
        Lilly-May
        Lori
        Luana
        Malika
        Marin
        Meadbh
        Mona
        Montana
        Nella
        Pennie
        Radha
        Raven
        Rawan
        Rida
        Riya
        Roseanne
        Salome
        Sana
        Shae
        Suzie
        Tabita
        Tasneem
        Trinity
        Viola
        Zaina
        Zosia
        Esmae
        Joanie
        Alayah
        Della
        Perrie
        Naya
        Nola
        Ailís
        Aodha
        Bébhinn
        Brídín
        Brónagh
        Clódagh
        Éile
        Eilís
        Ríonach
        Roísín
        Síle
        Siobhán
        Xenia
        Mayla
        Rhéa
        Rheia
        Léana
        Mayar
        Zara-Rose
        Zimal
        Rafaela
        Saylor
        Mei
        Sofía
        Teona
        Theadora
        Kenzi
        Kataleya
        Neansaí
        Lyanna
        Marlowe
        Raiya
        Veda
        Mahnoor
        Selin
        Maram
        Melany
        Yuval
        Areen
        Éada
        Ava Grace
        Ériu
        Aviana
        Alaya
        Aibhilín
        Ecaterina
        Bláthín
        Bodhi
        Anna May
        Alondra
        Éadha
        Eimíle
        Aífe
        Aliana
        Amelia Rose
        Críoa
        Adia
        Croí
        Dáire
        Dallas
        Anays
        Ivy-Rose`.split(/\n/);

// Top 100 Irish Surnames (https://www.swilson.info/topsurnames.php)
var sNames =
    `Murphy
        Kelly
        Sullivan
        Walsh
        Smith
        O'Brien
        Byrne
        Ryan
        Connor
        O'Neill
        Reilly
        Doyle
        McCarthy
        Gallagher
        Doherty
        Kennedy
        Lynch
        Murray
        Quinn
        Moore
        McLaughlin
        Carroll
        Connolly
        Daly
        Connell
        Wilson
        Dunne
        Brennan
        Burke
        Collins
        Campbell
        Clarke
        Johnston
        Hughes
        Farrell
        Fitzgerald
        Brown
        Martin
        Maguire
        Nolan
        Flynn
        Thompson
        Callaghan
        O'Donnell
        Duffy
        Mahony
        Boyle
        Healy
        Shea
        White
        Sweeney
        Hayes
        Kavanagh
        Power
        McGrath
        Moran
        Brady
        Stewart
        Casey
        Foley
        Fitzpatrick
        Leary
        McDonnell
        McMahon
        Donnelly
        Regan
        Donovan
        Burns
        Flanagan
        Mullan
        Barry
        Kane
        Robinson
        Cunningham
        Griffin
        Kenny
        Sheehan
        Ward
        Whelan
        Lyons
        Reid
        Graham
        Higgins
        Cullen
        Keane
        King
        Maher
        McKenna
        Bell
        Scott
        Hogan
        Keeffe
        Magee
        McNamara
        McDonald
        McDermott
        Moloney
        Rourke
        Buckley
        Dwyer`.split(/\n/);

// merge boys and girls names-remove duplication
// maybe could have used (must check!):
// = Array.from(new Set(bNames.concat(...gNames)))
var fNames = [...new Set([...bNames, ...gNames])];

// set up protytype for random selection from array
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
};

// set up array shuffle using Fisher-Yates method
Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i === 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
};

// get a random Irish name
function getRandomFirstName() {
    return fNames.sample().trim();
}

function getRandomSurname() {
    return sNames.sample().trim();
}
// shuffle the boys and girls names (and surnames ... sure why not!)
fNames.shuffle(); sNames.shuffle();
function getName() {
    let first = getRandomFirstName();
    let last = getRandomSurname();
    return first + " " + last;
}
