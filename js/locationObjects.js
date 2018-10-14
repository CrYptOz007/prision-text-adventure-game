// JavaScript Document

/////////////////////////////////////////
// Create location
// Replace LOCATION_NAME with the name of the location
// Uncomment and reuse this template to create more locations
/*
var LOCATION_NAME = {
	desc: "DESCRIPTION OF LOCATION",
	objects: ["OBJECT 1", "OBJECT 2"]
}
*/

/////////////////////////////////////////

// room.html
var room = {
  desc: "You are trapped in a prison room. There is a toilet to the west, a bed to the east, a door to the north, a sink and mirror to the southeast. Where do you want to go?",
	objects: []
};

// sinkandmirror.html
var sinkAndMirror = {
  desc: "There is a hammer on the sink. And some 'extra-abrasive' toothpaste The mirror is loosely glued on. Go northwest to go back to the room",
  objects: ["hammer", "toothbrush", "toothpaste"]
};

var behindMirror = {
	desc: "You found a key behind the mirror! I wonder what it's for... Type 'go back' to go back to your previous location",
	objects: ["key"]
};

var toilet = {
	desc: "It's pretty shit.",
	objects : []
};

var bed = {
	desc: "A comfortable bed awaits you.",
	objects: []
};

var toothpastedWall = {
	desc: "You've applied some toothpaste on the wall. Use something to scrape it off",
	objects: []
};

var scrapedWall = {
	desc: "You've scraped the paint off the wall. Looks like it's cracked. Try breeak it with something",
	objects: []
};

var corridor = {
	desc: "You're now in the corridor. You can go east or west.",
	objects: []
};

var corridorWest = {
	desc: "There's a cafeteria to the east, storage room to the west and a stairway north",
	objects: []
};

var deadEnd = {
	desc: "Looks like a dead end.",
	objects: []
};

var storageRoom = {
	desc: "This must be the storage room. Must be something useful here that can get me out of this prison. There is a shelf to the west, wardrobe to the northwest, equipment to the northeast and a chest to the east",
	objects: []
};

var shelf = {
	desc: "There's a pickaxe. Could be useful for breaking out. Too bad the walls are to hard to break. Maybe something can weaken it somewhere",
	objects: ["pickaxe"]
};

var wardrobe = {
	desc: "A sword! To bad no one's here so I won't be needing it to defend myself",
	objects: ["sword"]
};

var equipment = {
	desc: "Some protection for myself. A metal and leather armour",
	objects: ["metal_armour", "leather_armour"]
};

var chest = {
	desc: "A chest. I thought there might be something good in here but its only an axe and an old baton",
	objects: ["axe", "baton"]
};

var cafeteria = {
	desc: "You're in the caferteria, the place looks completely worn down and it seems like no one is here. There is a painting to the west and the kitchen to the north",
	objects: []
};

var painting = {
	desc: "Could this be a famous painting? I wonder what it's worth.",
	objects: ["painting"]
};

var kitchen = {
	desc: "Something smells here. I wonder where it's coming from. There's a fridge to the southeast, cupboard to the east, sink to the northeast and the freezer room to the north",
	objects: []
};

var fridge = {
	desc: "Hmm, the smell isn't coming from here",
	objects: []
}

var cupboard = {
	desc: "Some utensils and plates here",
	objects: ['utensil', 'plate']
}

var sink = {
	desc: "The sink is broken. Nothing here",
	objects: []
}

var freezerRoom = {
	desc: "The smell is definitely coming from this room. Go east or west to check it out",
	objects: []
};

var deadBody = {
	desc: "Omg a dead body. It's one of the guards and he has a key on him",
	objects: ["ward_key"]
};

var freezer = {
	desc: "There's something inside the freezer. Nevermind, it's just some food",
	objects: ["food"]
};

var upstairs = {
	desc: "There are rooms to your east and west and a bathroom north",
	objects: []
};

var bathroom = {
	desc: "Hmm, this place is pretty gross. Might be something here but I doubt it. There's a shower to the north and toilets to the west",
	objects: []
};

var bathroomToilet = {
	desc: "Ewww, this is worse than the toilet in my cell",
	objects: []
};

var shower = {
	desc: "Ahhh, a nice warm shower",
	objects: []
};

var guardRoomA = {
	desc: "Hmm, this must be one of the guard rooms. There is a shelf to the west, wardrobe northwest, bookshelf northeast and a desk east",
	objects: []
};

var guardRoomAWardrobe = {
	desc: "Fancy some new clothes?",
	objects: ["clothes", "disc"]
};

var guardRoomAShelf = {
	desc: "There's a pot on the shelf. Nothing inside though",
	objects: []
};

var guardRoomABookshelf = {
	desc: "'In Search of Lost Time' by Marcel Proust, 'Ulysses' by James Joyce, 'Moby Dick' by Herman Melville... This man is a collector.",
	objects: ["books", "bookmark"]
};

var guardRoomADesk = {
	desc: "This must be his desk, there's a drawer to the northwest and northeast",
	objects: ["pen"]
};

var leftDrawer = {
	desc: "There's a note! It says... nothing. Really???",
	objects: ["note"]
};

var rightDrawer = {
	desc: "There's a wire. Hmm...",
	objects: ["wire"]
};

var guardRoomB = {
	desc: "Looks like this is the dead man's guard room. Probably something valuable here. There's a bookshelf west, wardrobe north and a desk northeast",
	objects: []
};

var guardRoomBBookshelf = {
	desc: "Some pretty old books.",
	objects: []
};

var guardRoomBWardrobe = {
	desc: "This guy's not a fashion enthusiast and there's something's down here that's pretty deep...",
	objects: []
};

var guardRoomBHole = {
	desc: "You've hooked onto something. It's a key!",
	objects: ["storage_key"]
};

var guardRoomBDesk = {
	desc: "Nothing much here...",
	objects: []
};