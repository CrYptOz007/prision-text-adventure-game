//////////////////////////////////////////////////////////////////////
// Global Arrays
//////////////////////////////////////////////////////////////////////

// All available directions
var directionArray = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

// All action verbs
var verbs = ['get', 'retrieve', 'pickup', 'grab', 'take', 'drop', 'remove', 'go', 'use', 'help'];

// Verbs for retrieving an item
var retrievalVerbs = ['get', 'retrieve', 'pickup', 'grab', 'take'];

// Verbs for dropping an item
var removeVerbs = ['drop', 'remove'];

// Verbs for using an item
var useVerbs = ['use'];


//////////////////////////////////////////////////////////////////////
// Basic functions
//////////////////////////////////////////////////////////////////////


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

// Return the last word in a string
function lastWord(words) {
	// Set n as an array with each word seperated by a space as an element
	var n = words.split(" ");
	// Return the last element of the array
	return n[n.length - 1]
}


// Seperate a camelCase string with spaces
function insertSpaces(s) {
    return s.split(/(?=[A-Z])/).map(function(p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
    }).join(' ');
}

// Compare arrays
/*function compareArray (reference, target) {
	// Stringify reference array
	reference = JSON.stringify(reference)
	// Loop target array
	for (i = 0; i < target.length; i++) {
		// If reference string includes target[i]
		if (reference.includes(target[i])) {
			return true
		} else {
			return false
		}
	}
}*/

//////////////////////////////////////////////////////////////////////
// Object management system
//////////////////////////////////////////////////////////////////////


// Load objects when new user visits the page
function loadObjects (tempLocationObjectName, tempLocationObjects, locationName) {
	// If user has not visited this page
	if (typeof tempLocationObjects == "undefined" || !(tempLocationObjects instanceof Array)) {
		// Create objects into localStorage location Array
		var tempLocationObjects = locationName.objects;
		// Set localStorage Array
		setLocalStorage(tempLocationObjectName, tempLocationObjects);
		location.reload();
	} // End if
}


// Validate Verbs
function validateVerbs(userInput, tempLocationArray, tempLocationArrayName, locationName) {
	// Set count = 0
	var count = 0;
	// Set playerInventory from getLocalStorage
	var playerInventory = getLocalStorage("playerInventory", playerInventory);
	// While count < locationName.objects array length
	while (count < locationName.objects.length) {
		
		// Loop through retrieval Verbs
		for (x = 0; x < retrievalVerbs.length; x++) {
			// Set validation string = retrivalVerbs + object
			var validation = retrievalVerbs[x] + ' ' + tempLocationArray[count];
			// If userInput === validation string
			if (userInput === validation) {
				// If the object is in the location
				if (tempLocationArray.includes(tempLocationArray[count])) {
					// Add the object to the playerInventory
					playerInventory.push(tempLocationArray[count]);
					// Log the message in the activityLog
					activityLogMessage(`You have picked up ${tempLocationArray[count]}`)
					// Filter out the object in the localstorage location array
					tempLocationArray = tempLocationArray.filter (item => item !== tempLocationArray[count]);
					
					// Set LocalStorage values
					setLocalStorage("playerInventory", playerInventory);
					setLocalStorage(tempLocationArrayName, tempLocationArray);
					return false;
				}
				// Else if userInput includes any retrieval verb
			} else if (userInput.includes(retrievalVerbs[x])) {
				// If locationName.objects include the lastWord of userInput && the object is in the players inventory
				if (locationName.objects.includes(lastWord(userInput)) && playerInventory.includes(lastWord(userInput))) {
					// Output: it is in your inventory
					return activityLogMessage(lastWord(userInput) + ' is already in your inventory')
					// Else if locationName.object doesn't include lastWord of userInput
				} else if (!locationName.objects.includes(lastWord(userInput))) {
					// Output: invalid item
					return activityLogMessage(lastWord(userInput) + ' is an invalid item');
				} 
			}
		} // End For
		
		// Loop through removal Verbs
		for (x = 0; x < removeVerbs.length; x++) {
			// Set validation string = retrivalVerbs + object
			var validation = removeVerbs[x] + ' ' + locationName.objects[count];
			// If userInput === validation string
			if (userInput === validation) {
				// If the object is in the player's inventory
				if (playerInventory.includes(locationName.objects[count])) {
					// Add the object to the localstorage location array
					tempLocationArray.push(locationName.objects[count]);
					// Filter out the object in the player's inventory
					playerInventory = playerInventory.filter (item => item !== locationName.objects[count]);
					// Log the message in the activityLog
					activityLogMessage(`You have dropped ${locationName.objects[count]}`)
					
					// Set LocalStorage values
					setLocalStorage("playerInventory", playerInventory);
					setLocalStorage(tempLocationArrayName, tempLocationArray);
					return false;
				} // End iI
				// Else if userInput includes any removal verbs
			} else if (userInput.includes(removeVerbs[x])) {
				// If locationName.objects include lastWord of userInput && tempLocationArray includes lastWord of userInput
				if (locationName.objects.includes(lastWord(userInput)) && tempLocationArray.includes(lastWord(userInput))) { 
					// Output: item is already in this area
					return activityLogMessage(lastWord(userInput) + ' is already in the area')
					// Else if locationName doesn't include the lastWord of userInput
				} else if (!locationName.objects.includes(lastWord(userInput))){
					// Invalid item
					return activityLogMessage(lastWord(userInput) + ' is an invalid item');
				} // End else if
			} // end else if
		} // End for
		
		count++ // Increase count to next object
	} // End while
} // End Function


// Validate use verbs
function validateUseVerbs(userInput, item, locationName) {
	// Loop through useVerbs array
	for (i = 0; i < useVerbs.length; i++) {
		// Set validation string = useVerbs + item parameter
		var validateVerbs = useVerbs[i] + " " + item;
		// Retrieve the last word of the userInput parameter
		var incorrectItem = lastWord(userInput)
		// Set playerInventory from getLocalStorage
		var playerInventory = getLocalStorage("playerInventory")
		// If userInput === validation string
		if (userInput === validateVerbs) {
			// If player has the item
			if (playerInventory.includes(item)) {
				// Log message
				activityLogMessage("You have used the " + item)
				// Redirect to locationName parameter
				event.preventDefault();
				window.location = locationName + ".html";
			} else { // If player doesn't have the item
				// Log message in activityLog
				activityLogMessage(`You don't have the item in your inventory`)
			} // End else
			// If userInput includes the useVerbs but typed the incorrect item
		} else if (userInput.includes(useVerbs[i])) {
			// If playerInventory has the incorrect item
			if (playerInventory.includes(incorrectItem)) {
				// Log message
				activityLogMessage("You can't use this item")
			} else { // If playerInventory doesn't have the incorrect item
				activityLogMessage("You don't have the item in your inventory")
			} // End else
		} // End else if
	} // End for
} // End function


//////////////////////////////////////////////////////////////////////
// Go command function
//////////////////////////////////////////////////////////////////////


// Go back function
function goBack(userInput, locationName) {
	// Set validation string
	var validation = "go back";
	// If userInput === validation string
	if (userInput === validation) {
		// Log the message
		activityLogMessage("You went back to " + insertSpaces(locationName));
		// Redirect to page
		event.preventDefault();
		window.location = locationName + ".html";
	} // End if
} // End function


// Go to Location
function goLocation(userInput, direction, locationName, objectRequired = false, objectRequiredMessage = false) {
	// Set validation string = "go" + direction parameter
	var validation = "go " + direction;
	// Set playerInventory from getLocalStorage
	var playerInventory = getLocalStorage("playerInventory", playerInventory);
	// If userInput === validation string
	if (userInput === validation) {
		// If objectRequired is false
		if (!objectRequired) {
			// Log the message
			activityLogMessage("You went " + direction + " to the " + insertSpaces(locationName));
			//Redirect to location
			event.preventDefault();
			window.location = locationName + ".html";
		} else { // If objectRequired has a value then
			// If player does not have object in his inventory then
				if (!playerInventory.includes(objectRequired)) {
					// Print objectRequired Message
					activityLogMessage(objectRequiredMessage);
					return false;
			} else { // If player has object in his inventory then
				// Log the message
				activityLogMessage("You went " + direction + " to " + insertSpaces(locationName));
				// Redirect to location
				event.preventDefault();
				window.location = locationName + ".html";
			} // End else
		} // End else
	} // End if
} // End Function


//////////////////////////////////////////////////////////////////////
// Activity Log system
//////////////////////////////////////////////////////////////////////


// Error Message
function errorMessage(userInput) {
	// Set count = 0
	var count = 0
	// While count < verbs array length
	while (count < verbs.length) {
		// If userInput doesn't include any verbs
		if (!userInput.includes(verbs[count])) {
			// Increase count
			count++
		} else { // Else if it does include a verb
			// Stop the while loop
			break;
		} // End if
	} // End while loop
	// If count === verbs.length
	if (count === verbs.length) {
		// Log 'Invalid Command'
		activityLogMessage("Invalid Command")
	} // End if
} // End Function


// Unshift activity log message
function activityLogMessage(message) {
	// Set activityLog array from getLocalStorage
	var activityLog = getLocalStorage("activityLog", activityLog);
	// Unshift message to array
	activityLog.unshift(message + "<br>");
	// Set LocalStorage array
	setLocalStorage("activityLog", activityLog);
}

// Help commands
function helpCommands (userInput) {
	// Validation string
	var validation = "help";
	// If userInput = validation string
	if (userInput === validation) {
		// Print these messages
		activityLogMessage("drop | remove (item)");
		activityLogMessage("get | retrieve | pickup | grab | take (item)");
		activityLogMessage("use (item)");
		activityLogMessage("go back");
		activityLogMessage("go (direction)");
		activityLogMessage("Commands:");
	} // End If
} // End function


//////////////////////////////////////////////////////////////////////
// Refresh contents
//////////////////////////////////////////////////////////////////////

// Get Location Description
function getDescription (locationName) {
	// Set description by locationName
	document.getElementById("description").innerHTML = locationName.desc;
}


// Validate Objects
function checkObjects (array) {
	// If localStorage location array doesn't have any objects
	if (array.length === 0) {
		// Set Element text
		document.getElementById("objects").innerHTML = "There are no objects in this area" + "<br> Type 'help' for list of commands";
	} else { // If localStorage location array does have objects
		// Set Element text
		document.getElementById("objects").innerHTML = "These are the items in the area: " + array.join(", ") + "<br> Type 'help' for list of commands";
	} // End else
} // End function

// Refresh contents of a HTML Selection eg. playerInventory and activityLog
function refreshContent(array) {
	// Set array from localstorage array
	var array = getLocalStorage(array);
  
	// Refresh elements in array
  for (i = 0; i < array.length; i++ ){
    document.write('<option>', array[i], '</option>');
  }
}


//////////////////////////////////////////////////////////////////////
// Save/Load system
//////////////////////////////////////////////////////////////////////


// Save location
function saveLocation(page) {
	// Create savedLocation variable from page parameter
	setLocalStorage("savedLocation", page);
} // End function

// Load save
function loadSave() {
	// Get localStorage saved location
	var savedLocation = getLocalStorage("savedLocation")
	// If there is a location
	if (savedLocation) {
		// Redirect to the location
		window.location.href = savedLocation
	} else { // If there isn't a location
		// Alert: start a new game
		debugMessage("No game save found. Please start a new game")
	} // End else
} // End function

