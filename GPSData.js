const UNSAFE_DISTANCE = 50;
var lats = [[]];
var longs = [];
var glats = [[]];
var glongs = [];
var safety;

function getLats(numPlaces, id1, id2, id3) {
	// return [[42.096432, "2020-03-23", "am"], [42.096326, "2020-03-20", "pm"]];
	var arr = [[]];
	for(var i = 0;i < numPlaces;i++) {
		if(document.getElementById(id1 + (i + 1)).value == null || document.getElementById(id1 + (i + 1)).value == "") {
			break;
		}
		else {
			arr[i] = [];
			// arr[i].push(document.getElementById(id1 + (i + 1)).value);
			arr[i].push(3);
			arr[i].push(document.getElementById(id2 + (i + 1)).value);
			if(document.getElementById("am" + (i + 1)).checked) {
				arr[i].push("am");
			}
			else if(document.getElementById("pm" + (i + 1)).checked) {
				arr[i].push("pm");
			}
		}
	}
	return arr;
}

function getLongs(numPlaces) {
	var arr = [];

	for(var i = 0;i < numPlaces;i++) {
		if(document.getElementById("place" + (i + 1)).value == null || document.getElementById("place" + (i + 1)).value == "") {
			break;
		}
		else {
			arr.push(5);
			// arr.push(document.getElementById("place" + (i + 1)).value);
		}
	}
	return arr;
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

function getLongsGOV() {
	// Form
	var array = [];
	var numValues = document.getElementById("numRows").innerHTML;
	for(var i = 0;i < numValues;i++) {
		array.push(document.getElementById("long" + (i + 1)).innerHTML);
	}
	return array;
	// return [-83.109663, -87.654431, -122.083739, -87.685736];
}

function checkSafety(lats, longs) {
	var risk = 0;
	var distance = 0;

	// lats = getLats();
	// longs = getLongs();
	glats = getLatsGOV();
	glongs = getLongsGOV();

	for(var i = 0;i < lats.length;i++) {
		for(var j = 0;j < glats.length;j++) {
			distance = measure(lats[i][0], longs[i], glats[j][0], glongs[j]);
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
		return "You have not had any known exposure to individuals with confirmed cases. This does not mean that you're completely virus-free, and you should still follow all directions by the government.";
	}
	else if(risk == 1) {
		return "You are at moderate risk of carrying the virus. Please self-isolate at home and monitor your health for 14 days to #flattenthecurve.";
	}
	else if(risk == 2) {
		return "You are at a high risk of .";
	}
	else if(risk >= 3) {
		return "Contact the COViD-19 services in your country ASAP; you might die.";
	}
}

// Takes string and returns an array[lat, long]
async function geocode(address) {
	const gc = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(address) + "&key=AIzaSyAO_09jmvMrs1N-_AA4f8OvU81k0Mj_BGk")
		.then(function(response) {
			return response.json();
		});
	return [gc["results"][0]["geometry"]["location"]["lat"], gc["results"][0]["geometry"]["location"]["lng"]];
}
