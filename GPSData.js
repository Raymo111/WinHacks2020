const UNSAFE_DISTANCE = 50;
var lats = [];
var longs = [];
var glats = [];
var glongs = [];
var safety;

function getLats {
	// Form
	return [77.654432, 77.654431, 65.345676, 77.685736]; 
}

function getLongs {
	// Form
	return [87.654432, 87.654431, 75.345676, 87.685736]; 
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
	return [77.654466, 77.548385];
}

function getLongsGOV() {
	return [87.654466, 87.548385];
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
			if(distance <= UNSAFE_DISTANCE) {
				risk++;
			}
		}
	}
	
	return risk;
}