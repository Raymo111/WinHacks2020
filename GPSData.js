const UNSAFE_DISTANCE = 50;
var lats = [[]];
var longs = [];
var glats = [[]];
var glongs = [];
var safety;

function getLats() {
	// Form
	var array = [[]];
	var numValues = document.getElementById("numRows").innerHTML;
	for(var i = 0;i < numValues;i++) {
		array[i] = [];
		array[i].push(document.getElementById("lat" + (i + 1)).innerHTML);
		array[i].push(document.getElementById("day" + (i + 1)).innerHTML);
		array[i].push(document.getElementById("tod" + (i + 1)).innerHTML);
		/*
		if(array[i][2] == "am") {
			array[i][2] = 0;
		}
		else if(array[i][2] == "pm") {
			array[i][2] = 1;
		}
		*/
	}
	// return [[42.096400, 2, 1], [77.654431, 4, 0], [37.423021, 7, 1], [77.685736, 11, 0]];
	return array;
}

function getLongs() {
	// Form
	var array = [];
	var numValues = document.getElementById("numRows").innerHTML;
	for(var i = 0;i < numValues;i++) {
		array.push(document.getElementById("long" + (i + 1)).innerHTML);
	}
	return array;
	// return [-83.109663, -87.654431, -122.083739, -87.685736]; 
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

function getLatsGOV() {
	return [[42.096432, "2020-03-23", "am"], [42.096326, "2020-03-20", "pm"]];
}

function getLongsGOV() {
	return [-83.109735, -83.107145];
}

function checkSafety() {
	var risk = 0;
	var distance = 0;
	
	lats = getLats();
	longs = getLongs();
	glats = getLatsGOV();
	glongs = getLongsGOV();
	
	for(var i = 0;i < lats.length;i++) {
		for(var j = 0;j < glats.length;j++) {
			distance = measure(lats[i][0], longs[i], glats[j][0], glongs[j]);
			document.write(distance + "<br />");
			if(distance <= UNSAFE_DISTANCE) {
				if(lats[i][1] == glats[j][1] && lats[i][2] == glats[j][2]) {
					risk++;
				}
			}
		}
	}
	
	return risk;
}

function describePhysicalState(risk) {
	if(risk <= 0) {
		return "You are safe from the virus.";
	}
	else if(risk == 1) {
		return "You are at the risk of catching the virus. Please stay at home to prevent further spreading the virus.";
	}
	else if(risk == 2) {
		return "You are at a high risk.";
	}
	else if(risk >= 3) {
		return "You're going to die.";
	}
}