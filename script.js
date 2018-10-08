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
	debugMessage( locationArray['objects'].length)
	while (count < locationArray['objects'].length) {
		debugMessage("test")
		for (x = 0; x < retrievalVerbs.length; x++) {
			var validation = retrievalVerbs[x] + ' ' + tempLocationArray[count];
			//debugMessage(validation)
			//debugMessage(tempLocationArray[count]);
			if (userInput === validation) {
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
				playerInventory.push(tempLocationArray[count]);
				//debugMessage(tempLocationArray[count])
				tempLocationArray = tempLocationArray.filter (item => item !== tempLocationArray[count])
				setLocalStorage("playerInventory", playerInventory)
				setLocalStorage(tempLocationArrayName, tempLocationArray)
				debugMessage(tempLocationArrayName)
			}
			debugMessage("test")
		}
			debugMessage("test")
		for (y = 0; y < removeVerbs.length; y++) {
			var validation = removeVerbs[y] + ' ' + tempLocationArray[count]
			debugMessage("test")
			if (userInput === validation) {
				tempLocationArray.push(tempLocationArray[count])
				//debugMessage(tempLocationArray[count])
				playerInventory = playerInventory.filter (item => item !== tempLocationArray[count])
				setLocalStorage("playerInventory", playerInventory)
				setLocalStorage(tempLocationArrayName, tempLocationArray)
				
			}
		}
		count++
	}
	return false;
}
/*
class playerChoice {
	constructor(message, direction, hasItem = false, locationPage) {
		this.message = message;
		this.direction = direction;
		this.hasItem = hasItem;
		this.locationPage = locationPage
	}
	get location() {
		case this.direction:
		if (this.hasItem) {
			if (playerInventory.includes(hasItem)) {
				window.location.replace(locationPage)
 			}
			document.getElementById("message").innerHTML += message;
      return false;
      break;
		}
	}
	
}
*/


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

//Validate Objects

function checkObjects (array) {
	if (array.length === 0) {
		document.getElementById("objects").innerHTML = "There are no objects in this room";
	}
	else {
		document.getElementById("objects").innerHTML = "These are the items in the room: " + array.join(", ")
	}
}