// All available directions
var direction = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

// All action verbs
var verbs = ['get', 'retrieve', 'pickup', 'drop', 'remove'];

// Verbs for retrieving an item
var retrievalVerbs = ['get', 'retrieve', 'pickup'];

// Verbs for dropping an item
var removeVerbs = ['drop', 'remove'];

// Validate Verbs
function validateVerbs(userInput, locationObject) {
	var count = 0;
	debugMessage(locationObject.length)
	while (count < locationObject.length) {
		debugMessage("test")
		for (x = 0; x < retrievalVerbs.length; x++) {
			var validation = retrievalVerbs[x] + ' ' + locationObject[count];
			debugMessage(validation)
			debugMessage(locationObject[count]);
			if (userInput === validation) {
				var playerInventory = getLocalStorage("playerInventory", playerInventory);
				playerInventory.push(locationObject[count]);
				debugMessage(locationObject[count])
				debugMessage(playerInventory)
				var index = locationObject.indexOf(locationObject[count])
				
				if (index > -1) {
					locationObject = locationObject.splice(index, 1)
				}
				setLocalStorage("playerInventory", playerInventory)
				setLocalStorage(`${locationObject}`, locationObject)
			}
		}
			
		for (y = 0; y < removeVerbs.length; y++) {
			var validation = removeVerbs[y] + ' ' + locationObject[count]
			if (userInput === validation) {
				var index = playerInventory.indexOf(locationObject[count])
				
				if (index > -1) {
					playerInventory.splice(index, 1);
					locationObject.push(locationObject[count])
				}
				setLocalStorage("playerInventory", playerInventory)
				setLocalStorage(`${locationObject}`, locationObject)
				
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

class objectsInPage {
  constructor(pageName) {
    this.pageName = pageName;
  }
  
  // Getter
  get getObjects() {
    return this.objects();
  }
  
  // Method
  objects() {
    if (this.pageName.length == 0 || typeof this.pageName.objects == "undefined" ) {
    return this.notExists();
  } else {
    return this.exists();
    }
  }
  
  // If there are no objects in the room
  notExists() {
    var setObject = "<p>There are no objects in this room</p>";
    return setObject;
  }
  
	
  // If there are objects in the room
  exists() {
    var setObject = this.pageName.objects
    return "These are the objects in the room" = setObject;
  }
}