var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        displayNumberOfTasks(true);
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(element) {
    if (element.target.tagName === 'LI') {
        element.target.classList.toggle('checked');
    }
}, false);

function newTask() {
    var task = document.createElement("li");
    var inputTask = document.getElementById("taskInput").value;
    if(inputTask === "") {
        alert("No task found! Please enter a task")
    }
    else {
        var text = document.createTextNode(inputTask);
        task.appendChild(text);
        document.getElementById("tasks").appendChild(task);
    }
    document.getElementById("taskInput").value = "";

    var spanDelete = document.createElement("SPAN");
    var textDelete = document.createTextNode("Delete");
    spanDelete.className = "close";
    spanDelete.appendChild(textDelete);
    task.appendChild(spanDelete);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function displayNumberOfTasks() {
    var list = document.getElementById("tasks").getElementsByTagName("li");
    var header = document.getElementById("listCount");
    header.innerHTML = "Number of tasks: " + list.length;
}