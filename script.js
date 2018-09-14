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
		for (x = 0; x < retrievalVerbs.length; x++) {
			var validation = retrievalVerbs[x] + ' ' + locationObject[count];
			debugMessage(locationObject[count]);
			if (userInput === validation) {
				playerInventory.push(locationObject[count]);
				var index = locationObject.indexOf(locationObject[count])
				
				if (index > -1) {
					locationObjects.splice(index, 1)
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
    return setObject;
  }
}