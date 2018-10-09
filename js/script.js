// All available directions
var directionArray = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

// All action verbs
var verbs = ['get', 'retrieve', 'pickup', 'drop', 'remove', 'go', 'use', 'destroy', 'smash'];

// Verbs for retrieving an item
var retrievalVerbs = ['get', 'retrieve', 'pickup'];

// Verbs for dropping an item
var removeVerbs = ['drop', 'remove'];

// Verbs for using an item
var useVerbs = ['use', 'destroy', 'smash']

// Validate Verbs
function validateVerbs(userInput, tempLocationArray, tempLocationArrayName, locationName) {
	var count = 0;
	while (count < locationName.objects.length) {
		for (x = 0; x < retrievalVerbs.length; x++) {
			var validation = retrievalVerbs[x] + ' ' + tempLocationArray[count];
			if (userInput === validation) {
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
				if (tempLocationArray.includes(tempLocationArray[count])) {
					playerInventory.push(tempLocationArray[count]);
					
					activityLogMessage(`You have picked up ${tempLocationArray[count]}`)
					
					tempLocationArray = tempLocationArray.filter (item => item !== tempLocationArray[count]);
					
					setLocalStorage("playerInventory", playerInventory);
					setLocalStorage(tempLocationArrayName, tempLocationArray);
				} else {
					activityLogMessage(`Object is not found in this place`);
				}
			}
		}
		for (x = 0; x < removeVerbs.length; x++) {
			var validation = removeVerbs[x] + ' ' + locationName.objects[count];
			if (userInput === validation) {
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
				if (playerInventory.includes(locationName.objects[count])) {
					tempLocationArray.push(locationName.objects[count]);
					
					playerInventory = playerInventory.filter (item => item !== locationName.objects[count]);
					
					activityLogMessage(`You have dropped ${locationName.objects[count]}`)
					
					setLocalStorage("playerInventory", playerInventory);
					setLocalStorage(tempLocationArrayName, tempLocationArray);
				} else {
					activityLogMessage(`Object is not in your inventory`)
				}
			}
		}
		count++
	}
}

// Validate use verbs
function validateUseVerbs(userInput, item, locationName) {
	for (i = 0; i < useVerbs.length; i++) {
		var validateVerbs = useVerbs[i] + " " + item;
		if (userInput === validateVerbs) {
			var playerInventory = getLocalStorage("playerInventory")
			if (playerInventory.includes(item)) {
				event.preventDefault();
				window.location = locationName + ".html";
			} else {
				activityLogMessage(`You don't have the item in your inventory`)
			}
		}
	}
}

// Debug Message Alert
function debugMessage(message) {
  window.alert(message);
}

// Set Local Storage
function setLocalStorage(name,array) {
  localStorage.setItem(name, JSON.stringify(array));
}

// Get Local Storage
function getLocalStorage(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

// Refresh contents of a HTML Selection eg. playerInventory and activityLog
function refreshContent(array) {
	// Set array from localstorage array
	var array = getLocalStorage(array);
  
	// Refresh elements in array
  for (i = 0; i < array.length; i++ ){
    document.write('<option>', array[i], '</option>');
  }
}

// Go back function
function goBack(userInput,locationName) {
	var validation = "go back";
	if (userInput === validation) {
		event.preventDefault();
		window.location = locationName + ".html";
	}
}

// Go to Location

function goLocation(userInput, direction, locationName, objectRequired = false, objectRequiredMessage = false) {
	var validation = "go " + direction;
	var playerInventory = getLocalStorage("playerInventory", playerInventory);
	if (userInput === validation) {
		// If objectRequired is false
		if (!objectRequired) {
			//Redirect to location
			event.preventDefault();
			window.location = locationName + ".html";
		} else { // If objectRequired has a value then
			// If player does not have object in his inventory then
				if (!playerInventory.includes(objectRequired)) {
					// Print objectRequired Message
					var activityLog = getLocalStorage("activityLog", activityLog);
					activityLog.unshift(objectRequiredMessage + "<br>");
					setLocalStorage("activityLog", activityLog);
					return false;
			} else { // If player has object in his inventory then
				// Redirect to location
				event.preventDefault();
				window.location = locationName + ".html";
			}
		}
	}
}

// Get Location Description

function getDescription (locationName) {
	document.getElementById("description").innerHTML = locationName.desc;
}

// Error Message

function errorMessage(userInput) {
	var count = 0
	while (count < verbs.length) {
		if (!userInput.includes(verbs[count])) {
			count++
		} else {
			break;
		}
	}
	if (count === verbs.length) {
		var activityLog = getLocalStorage("activityLog", activityLog);
		activityLog.unshift("Invalid Command");
		setLocalStorage("activityLog", activityLog);
	}
}

// Unshift activity log message

function activityLogMessage(message) {
	var activityLog = getLocalStorage("activityLog", activityLog);
	activityLog.unshift(message + "<br>");
	setLocalStorage("activityLog", activityLog);
}

// Validate Objects

function checkObjects (array) {
	if (array.length === 0) {
		document.getElementById("objects").innerHTML = "There are no objects in this room";
	}
	else {
		document.getElementById("objects").innerHTML = "These are the items in the room: " + array.join(", ");
	}
}
