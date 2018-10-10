// JavaScript Document

// room.html
var room = {
  desc: "You are trapped in a prison room. There is a toilet to the west, a bed to the east, a door to the north, a sink and mirror to the southeast. Where do you want to go?",
	objects: []
};

// sinkandmirror.html
var sinkAndMirror = {
  desc: "There is a hammer on the sink. The mirror is loosely glued on. Go northwest to go back to the room",
  objects: ["hammer", "toothbrush", "toothpaste"]
};

var behindMirror = {
	desc: "You found a key behind the mirror! I wonder what it's for... Type 'go back' to go back to your previous location",
	objects: ["key"]
}

var toilet = {
	desc: "It's pretty shit.",
	objects : []
}

var bed = {
	desc: "A comfortable bed awaits you",
	objects: []
}

