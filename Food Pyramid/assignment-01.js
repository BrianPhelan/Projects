//Array of colors
var colors = ["red", "blue", "green", "yellow", "purple", "brown", "pink", "grey", "turquoise", "aqua", "cyan", "paleturquoise", "teal", "slateblue", "blueviolet", "indigo", "linen", "darkslategrey", "burlywood", "sienna", "maroon"];
//Control variable
var i = 0;
//Variable to assign color
var selectedColor;
//function to change color, imports element id as 'el'
function changeColour(el)
{
    let value = parseInt(document.getElementById(el).value, 10);
    //Check whether value is an illegal number
    value = isNaN(value) ? 0 : value;
    //set i equal to value
    i=value;
    //selected color is equal to array index of i
    selectedColor = colors[i];
    //set background color as selected color
    document.getElementById(el).style.backgroundColor = selectedColor;
}


function printDate()
{
    //Get date id and set is value to variable
    let value = document.getElementById("date").value;
    //Print submitted date
    document.getElementById("subDate").innerHTML = "My Food Pyramid \nDate: " + value;
}

function incrementValue(el)
{
    //Get date id and set is value to variable
    let value = parseInt(document.getElementById(el).value, 10);
    //Check whether value is an illegal number
    value = isNaN(value) ? 0 : value;
    //increment value
    value++;
    //assign value to the element
    document.getElementById(el).value = value;
    //document.getElementById(trap).style.borderBottom += "20px";
}


function decrementValue(el)
{
    //Get date id and set is value to variable
    let value = parseInt(document.getElementById(el).value, 10);
    //Check whether value is an illegal number
    value = isNaN(value) ? 0 : value;
    //if value is greater than 0 decrement the value else do nothing
    if (value > 0) {
        value--;
    }
    //assign value to the element
    document.getElementById(el).value = value;
   // document.getElementById(trap).style.height -= "20px";
}