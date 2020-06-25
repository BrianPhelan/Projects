//Global variables
let avg;
let count = 0;
let finalGrades = [];
let pointer = 0;
let letters = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
let scales = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];
let assignmentCount;
let rowCount = 0;
let ob = [];
let tableString = "";
let newArray = null;

//Function to find the average of the assignments and assign them to the final grade column
function findAvg() {
    count = 0; //Count for unsubmitted assignments
    //Sorts through each row
    $('tr').each(function() {
        let totalmarks = 0; //Keeps track of running total
        assignmentCount = 0; //Keeps track of number of assignments
        //Sorts through only the assignments
        $(this).find('.assignments').each(function() {
            var marks = $(this).text(); { //Set marks to the text contained in that column
                //If the value in marks (current assignment value) is not equal to values from 0-100
                //I.E. If its equal to any letter, symbol, or number less than 0/ Greater than 100
                if ((/^[0-9][0-9]?$|^100$/.test(marks)) === false) {
                    count++; //Increase unsubmitted number
                    $(this).css({"background-color": "yellow"}); //Set background to yellow
                    $(this).html('-'); //Set text to "-"
                    $(this).css({"text-align": "center"}); //Center the text
                }
                else {
                    totalmarks += parseFloat(marks); //Convert the value of mark to a float and add it to running total
                    assignmentCount++; //Increase the number of assignments
                    $(this).css({"background-color": "initial"}); //Set background to it's default value
                    $(this).css({"text-align": "right"}); //Align the text to the right
                }
            }
        });
        if(totalmarks !== 0) { //If the total is not equal to 0
            avg = Math.round(totalmarks / assignmentCount); //Divide the total marks by number of assignments to find the average then convert to an integer by rounding
        }
        else {
            avg = 0; //Otherwise the average is 0
        }
        finalGrades.push(avg); //Push the average to the finalgrades array
        $(this).find('.finalmark').html(avg); //Set the value of the final grade to the average
        if(avg < 60) { //If the average is less than 60
            $(this).find('.finalmark').css({"background-color": "red"}); //Set background color to red
        }
        else
        {
            $(this).find('.finalmark').css({"background-color": "initial"}); //Otherwise set it to it's initial value
        }
    });
    document.getElementById("assignmentsSub").innerHTML = "Number of Assignments Not Submitted: " + count; //Print the number of unsubmitted assignments to the screen
}

//Function to keep track of which grade type is selected when the column is clicked
$(function() {
    $("#finalgrade").on('click', () => {
        //Pointer value is:
        //0 = Average [%]
        //1 = Letter Grade
        //2 = 4.0 Grade Average
        switch (pointer) {
            case 0: //If average is selected
                pointer = 1; //Set to Letter pointer
                getGrade(pointer); //Pass pointer when calling getGrade function
                break; //Break the loop
            case 1: //If letter is selected
                pointer = 2; //Set pointer to 4.0
                getGrade(pointer); //Pass Pointer to when calling getGrade function
                break; //Break Loop
            case 2: //If 4.0 is selected
                $("#finalgrade").text("Average [%]"); //Set text of column to average
                pointer = 0; //Set pointer to average
                findAvg(); //Call find average function
                break; //Break loop
        }

    });
});

function getGrade(pointer) {
    //If desired form is Letter Grade
    if (pointer === 1) {
        $("#finalgrade").text("Letter Grade"); //Set column text to Letter Grade
        //Sort through rows to find average (same as findAvg Function)
        $('tr').each(function() {
            var totalmarks = 0;
            $(this).find('.assignments').each(function() {
                var marks = $(this).text(); {
                    if (marks !== "-") {
                        totalmarks += parseFloat(marks);
                        count++;
                    }
                }
            });
            avg = Math.round(totalmarks / 5);
            finalGrades.push(avg);
            //If average is between 93 and 100 inclusive, set final grade value to index 0 in letters array (A)
            //Similar for rest of else if statements just changing range and index value for different letters
            if(avg > 92 && avg < 101) {
                $(this).find('.finalmark').html(letters[0]);
            }
            else if(avg > 89 && avg < 93) {
                $(this).find('.finalmark').html(letters[1]);
            }
            else if(avg > 85 && avg < 91) {
                $(this).find('.finalmark').html(letters[2]);
            }
            else if(avg > 82 && avg < 87) {
                $(this).find('.finalmark').html(letters[3]);
            }
            else if(avg > 79 && avg < 83) {
                $(this).find('.finalmark').html(letters[4]);
            }
            else if(avg > 76 && avg < 80) {
                $(this).find('.finalmark').html(letters[5]);
            }
            else if(avg > 72 && avg < 77) {
                $(this).find('.finalmark').html(letters[6]);
            }
            else if(avg > 69 && avg < 73) {
                $(this).find('.finalmark').html(letters[7]);
            }
            else if(avg > 66 && avg < 70) {
                $(this).find('.finalmark').html(letters[8]);
            }
            else if(avg > 62 && avg < 67) {
                $(this).find('.finalmark').html(letters[9]);
            }
            else if(avg > 59 && avg < 63) {
                $(this).find('.finalmark').html(letters[10]);
            }
            else {
                $(this).find('.finalmark').html(letters[11])
            }
        });

        //}
        //If desired form is 4.0
    } else if (pointer === 2) {
        $("#finalgrade").text("4.0 Grade Average"); //Set Column text to 4.0 Grade Average
        //Same as findAvg function
        $('tr').each(function() {
            var totalmarks = 0;
            $(this).find('.assignments').each(function() {
                var marks = $(this).text(); {
                    if (marks !== "-") {
                        totalmarks += parseFloat(marks);
                        count++;
                    }
                }
            });
            avg = Math.round(totalmarks / 5);
            finalGrades.push(avg);
            //Same as previous if statement just changing array to 4.0 scale instead of letters
            if(avg > 92 && avg < 101) {
                $(this).find('.finalmark').html(scales[0] + ".0");
            }
            else if(avg > 89 && avg < 93) {
                $(this).find('.finalmark').html(scales[1]);
            }
            else if(avg > 85 && avg < 91) {
                $(this).find('.finalmark').html(scales[2]);
            }
            else if(avg > 82 && avg < 87) {
                $(this).find('.finalmark').html(scales[3] + ".0");
            }
            else if(avg > 79 && avg < 83) {
                $(this).find('.finalmark').html(scales[4]);
            }
            else if(avg > 76 && avg < 80) {
                $(this).find('.finalmark').html(scales[5]);
            }
            else if(avg > 72 && avg < 77) {
                $(this).find('.finalmark').html(scales[6] + ".0");
            }
            else if(avg > 69 && avg < 73) {
                $(this).find('.finalmark').html(scales[7]);
            }
            else if(avg > 66 && avg < 70) {
                $(this).find('.finalmark').html(scales[8]);
            }
            else if(avg > 62 && avg < 67) {
                $(this).find('.finalmark').html(scales[9] +".0");
            }
            else if(avg > 59 && avg < 63) {
                $(this).find('.finalmark').html(scales[10]);
            }
            else {
                $(this).find('.finalmark').html(scales[11] + ".0")
            }
        });
    }
    else {

    }
}

//Function to add Row to end of table
function addRow() {
    //Changes depending on how many rows already exist in the table
    switch(rowCount) {
        case 0:
            //Append the table to include another row with the same settings as the default rows just with different student values
            $('#table').append('<tr>' +
                '<td>Ellen Ripley</td>' +
                '<td>18342345</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></td></tr>');
            rowCount++;
            break;
        case 1:
            $('#table').append('<tr>' +
                '<td>Han Solo</td>' +
                '<td>14313808</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++; //Increase Row Count
            break;
        case 2:
            $('#table').append('<tr>' +
                '<td>Norman Bates</td>' +
                '<td>52913824</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 3:
            $('#table').append('<tr>' +
                '<td>Vito Coreone</td>' +
                '<td>81656055</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 4:
            $('#table').append('<tr>' +
                '<td>Emmet Brown</td>' +
                '<td>18871288</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 5:
            $('#table').append('<tr>' +
                '<td>Keyser Söze</td>' +
                '<td>90652973</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 6:
            $('#table').append('<tr>' +
                '<td>Marty McFly</td>' +
                '<td>51633831</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 7:
            $('#table').append('<tr>' +
                '<td>Obi-Wan Kenobi</td>' +
                '<td>08929991</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 8:
            $('#table').append('<tr>' +
                '<td>Atticus Finch</td>' +
                '<td>89719327</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 9:
            $('#table').append('<tr>' +
                '<td>Peter Venkman</td>' +
                '<td>98093001</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount++;
            break;
        case 10:
            $('#table').append('<tr>' +
                '<td>James T. Kirk</td>' +
                '<td>15818025</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>' +
                '<td class="finalmark" align="right"></tr>');
            rowCount = 0;
            break;
    }
    //Call Find average function to update table
    findAvg();
}

//Function to add column
function addColumn() {
    assignmentCount++; //Increase number of assignments
    //sort through the rows and add assignment column @ second last value (-1 -1)
    $('#table').find('tr').each(function(){ $(this).find('th').eq(-1 -1).after('<th contenteditable="true"><h3>Assignment</h3></th>');
    //Add cells to the new column @ second last value (-1 -1)
        $(this).find('td').eq(-1 -1).after('<td class= "assignments" align="right" contenteditable="true" onkeyup="findAvg()" onclick="this.textContent=\'\'">-</td>');
    });
    //Update Table
    findAvg();
}

//Function to save table to a cookie to be restored later
function saveTable() {
    //Cycle through table, saving each cell value to an array
    ob = $('#table tr').map(function() {
        return $(this).find('td').map(function() {
            return $(this).text();
        }).get();
    }).get();
    console.log(ob);

    //Convert Array to string
    tableString = JSON.stringify(ob);
    //Save string to cookie
    document.cookie = tableString;

}

function restoreTable() {
    //Decode cookie value
    var decodedCookie = decodeURIComponent(document.cookie);
    //Convert string to new array
    newArray = JSON.parse(decodedCookie);
    console.log(newArray);

    let table = document.getElementById("table"); //Id for table
    let index = 0; //Index of saved array
    for(let i = 1; i < table.rows.length; i++) //Sort through rows
    {
        for(let j = 0; j < table.rows[i].cells.length; j++) //Sort through columns
        {
                table.rows[i].cells[j].innerHTML = newArray[index]; //Set current cell value to array at index value
                console.log(newArray[index]);
                index++; //Increase index value
        }
    }
    findAvg(); //Update table
}


function removeRow() {
    $('#table tr:not(:nth-child(1))' && '#table tr:last').remove(); //Remove the last row but don't remove header row
    findAvg(); //Update table
}