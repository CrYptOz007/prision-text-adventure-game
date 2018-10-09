// All available directions
var direction = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

// All action verbs
var verbs = ['get', 'retrieve', 'pickup', 'drop', 'remove'];

// Verbs for retrieving an item
var retrievalVerbs = ['get', 'retrieve', 'pickup'];

// Verbs for dropping an item
var removeVerbs = ['drop', 'remove'];

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
					tempLocationArray = tempLocationArray.filter (item => item !== tempLocationArray[count])
					setLocalStorage("playerInventory", playerInventory)
					setLocalStorage(tempLocationArrayName, tempLocationArray)
				}
			}
		}
		for (y = 0; y < removeVerbs.length; y++) {
			var validation = removeVerbs[y] + ' ' + locationName.objects[count]
			if (userInput === validation) {
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
				if (playerInventory.includes(locationName.objects[count])) {
					tempLocationArray.push(locationName.objects[count])
					playerInventory = playerInventory.filter (item => item !== locationName.objects[count])
					setLocalStorage("playerInventory", playerInventory)
					setLocalStorage(tempLocationArrayName, tempLocationArray)
				}
			}
		}
		count++
	}
	return false;
}

function debugMessage(message) {
  window.alert(message);
}

function setLocalStorage(name,array) {
  localStorage.setItem(name, JSON.stringify(array));
}

function getLocalStorage(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

function getInventory() {
	var inventory = getLocalStorage("playerInventory");
            
  for (i = 0; i < inventory.length; i++ ){
    document.write('<option>', inventory[i], '</option>')
  }
}

// Go to Location

function goLocation (userInput, locationName, objectRequired = false, objectRequiredMessage = false) {
	for (i = 0; i < direction.length) {
		var validation = "go " + direction;
		if (userInput === validation) {
			if (!objectRequired) {
				window.location.replace(locationName + ".html")
			} else {
					if (!playerInventory.includes(objectRequired)) {
					document.getElementById("activityLog").innerHTML += objectRequiredMessage
				} else {
					window.location.replace(locationName + ".html")
				}
			}
		}
	}
}

// Get Location Description

function getDescription (locationName) {
	document.getElementById("description").innerHTML = locationName.desc
}

// Validate Objects

function checkObjects (array) {
	if (array.length === 0) {
		document.getElementById("objects").innerHTML = "There are no objects in this room";
	}
	else {
		document.getElementById("objects").innerHTML = "These are the items in the room: " + array.join(", ")
	}
}