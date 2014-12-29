//Problem:User interaction doesn't provide desired results
//Solution: Add interactivity

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-task"); //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed tasks

//New task list item
var createNewTaskElement = function(taskString) {
	//create list item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input") //checkbox
	
	//label
	var label = document.createElement("label")

	//input (text)
	var editInput = document.createElement("input"); //text

	//button.edit
	var editButton = document.createElement("button");

	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying 
	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit"

	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	//And each element needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
var addTask = function(){
	console.log("add task");

	if (taskInput.value) {
		//Create a new list item with text from #new-task
		var listItem = createNewTaskElement(taskInput.value);

		//Append listItem to incompleteTasksHolder
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);

		taskInput.value = "";
	} else {
		alert("Enter something man !!!!!!!!!!!!!!!!!!");
	}
}


//Edit an existing task
var editTask = function() {
	console.log("edit task");

	var listItem = this.parentNode;


	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");	
	
	var containsClass = listItem.classList.contains("editMode");
	
	//if the class of the parent is .editMode
	if(containsClass) {
		//switch from .editMode
		//label's text become the input's value
		this.innerText = "Edit";
		label.innerText = editInput.value;
	} else {
		//switch to edit mode
		//input value becomes the label's text
		this.innerText = "Save";
		editInput.value = label.innerText;
	}

	//togle parent mode on the parent
	listItem.classList.toggle("editMode");
}


//Delete an existing task
var deleteTask = function() {
	
	console.log("delete task");
	
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//remove the parent list item from ul
	ul.removeChild(listItem);
}


//Mark a task as complete
var taskCompleted = function() {
	console.log("complete task");
	//append task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}


//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("task incomplete");
	//append task list item to the #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("bind task list events");
	
	//select list item's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	var editBox = taskListItem.querySelector("input[type=text]");
	
	//bind editTask to edit button
	editButton.addEventListener("click", editTask);
	editBox.addEventListener("keyup", function(e) {
		if(e.keyCode === 13) {
			editTask.call(editButton);
		}
	});

	//bind deleteTask to delete button
	deleteButton.addEventListener("click", deleteTask);

	//bind checkBoxEventHandler to the checkbox
	checkBox.onchange = checkBoxEventHandler;
}

//set the click handler to addTask function
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function(e) {
	if(e.keyCode === 13) {
		addTask();
	}
});

//cycle over incompleteTasksHolder ul list item
for (i = 0; i < incompleteTasksHolder.children.length; i++) {
		//bind events to list item's children(taskCompleted)
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


//cycle over completedTasksHolder ul list item
for (i = 0; i < completedTasksHolder.children.length; i++) {
		//bind events to list item's children(taskIncomplete)
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}








