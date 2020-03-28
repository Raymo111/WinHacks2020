const UNSAFE_DISTANCE = 50;
var lats = [];
var longs = [];
var glats = [];
var glongs = [];
var safety;

function getLats() {
	// Form
	return [42.096340, 77.654431, 37.423021, 77.685736]; 
}

function getLongs() {
	// Form
	return [-83.107963, -87.654431, -122.083739, -87.685736]; 
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
	return [42.096432, 42.096326];
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
			distance = measure(lats[i], longs[i], glats[j], glongs[j]);
			document.write(distance + "<br />");
			if(distance <= UNSAFE_DISTANCE) {
				risk++;
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