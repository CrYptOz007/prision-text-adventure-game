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
	// Set count = 0
	var count = 0;
	// While count < locationName.objects array length
	while (count < locationName.objects.length) {
		
		// Loop through retrieval Verbs
		for (x = 0; x < retrievalVerbs.length; x++) {
			// Set validation string = retrivalVerbs + object
			var validation = retrievalVerbs[x] + ' ' + tempLocationArray[count];
			// If userInput === validation string
			if (userInput === validation) {
				// Set playerInventory from getLocalStorage
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
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
				} // End If
			} // End If userInput validation
		} // End For
		
		// Loop through removal Verbs
		for (x = 0; x < removeVerbs.length; x++) {
			// Set validation string = retrivalVerbs + object
			var validation = removeVerbs[x] + ' ' + locationName.objects[count];
			// If userInput === validation string
			if (userInput === validation) {
				// Set playerInventory from getLocalStorage
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
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
				} // End if 
			} // End if userInput validation
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
		// If userInput === validation string
		if (userInput === validateVerbs) {
			// Set playerInventory from getLocalStorage
			var playerInventory = getLocalStorage("playerInventory")
			// If player has the item
			if (playerInventory.includes(item)) {
				// Redirect to locationName parameter
				event.preventDefault();
				window.location = locationName + ".html";
			} else { // If player doesn't have the item
				// Log message in activityLog
				activityLogMessage(`You don't have the item in your inventory`)
			} // End else
		} // End if
	} // End for
} // End function


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
	// Set validation string
	var validation = "go back";
	// If userInput === validation string
	if (userInput === validation) {
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
				// Redirect to location
				event.preventDefault();
				window.location = locationName + ".html";
			} // End else
		} // End else
	} // End if
} // End Function


// Get Location Description
function getDescription (locationName) {
	// Set description by locationName
	document.getElementById("description").innerHTML = locationName.desc;
}


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


// Validate Objects
function checkObjects (array) {
	// If localStorage location array doesn't have any objects
	if (array.length === 0) {
		// Set Element text
		document.getElementById("objects").innerHTML = "There are no objects in this room";
	} else { // If localStorage location array does have objects
		// Set Element text
		document.getElementById("objects").innerHTML = "These are the items in the room: " + array.join(", ");
	} // End else
} // End function
