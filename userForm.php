<?php
	$servername = "localhost";
	$username = "app";
	$password = "1234";
	$dbname = "am_i_at_risk";

	// connect to db
	$conn = new mysqli($servername, $username, $password, $dbname);
	if($conn->connect_error) {
		die("Sorry, an internal error occured. Please try again!");
	}

	// prepare query
	// $query = $conn->prepare("SELECT * FROM affected_area;");
	$query = "SELECT * FROM affected_area;";
	$result = $conn->query($query) or die($conn->error.__LINE__);
	$numResults = mysqli_num_rows($result);
?>
<!doctype html>
<html>
	<head>
		<title>Am I At Risk?</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" integrity="sha256-PHcOkPmOshsMBC+vtJdVr5Mwb7r0LkSVJPlPrp/IMpU=" crossorigin="anonymous" />
		<script type="text/javascript" src="GPSData.js"></script>
	</head>
	<body>
		<div id="secrets">
			<p id="numRows" style="display: none;"><?php echo $numResults; ?></p>
			<table id="lat" style="display: none;">
			<?php
				// Loop through results
				$count = 0;
				mysqli_data_seek($result, 0);
				while($row = $result->fetch_assoc()) {
					$count++;
					echo '<tr>';
					echo '<td id="lat'.$count.'">'.$row['latitude'].'</td>';
					echo '<td id="day'.$count.'">'.$row['day'].'</td>';
					echo '<td id="tod'.$count.'">'.$row['time_of_day'].'</td>';
					echo '</tr>';
					// echo $row['day'].'|'.$row['time_of_day'].'|'.$row['latitude'].'|<br />';
				}
				mysqli_data_seek($result, 0);
			?>
			</table>
			<table id="long" style="display: none;">
			<?php
				// Loop through results
				$count = 0;
				mysqli_data_seek($result, 0);
				while($row = $result->fetch_assoc()) {
					$count++;
					echo '<tr>';
					echo '<td id="long'.$count.'">'.$row['longitude'].'</td>';
					echo '</tr>';
					// echo $row['day'].'|'.$row['time_of_day'].'|'.$row['latitude'].'|<br />';
				}
				mysqli_data_seek($result, 0);
			?>
			</table>
		</div>
		<script type="text/javascript">
			var numPlaces = 1;

			function done() {
				lats = getLats(numPlaces, "place", "date", "t");
				longs = getLongs(numPlaces);

				document.getElementById("safety").style.display = "block";
				document.getElementById("safety").innerHTML = describePhysicalState(checkSafety(lats, longs));
			}

			function addPlace() {
				numPlaces++;
				var place = document.createElement("DIV");
				place.id = "p" + numPlaces;

				var group1 = document.createElement("DIV");
				group1.className = "form-group";

				var label1 = document.createElement("LABEL");
				label1.className = "custom-control-label";
				label1.style.fontWeight = "bold";
				label1.innerHTML = "Place " + numPlaces;

				var address = document.createElement("INPUT");
				address.type = "text";
				address.className = "form-control";
				address.id = "place" + numPlaces;
				address.placeholder = "Enter Address of Place you Visited";

				group1.appendChild(label1);
				group1.appendChild(address);

				var group2 = document.createElement("DIV");
				group2.className = "form-group";

				var label2 = document.createElement("LABEL");
				label2.className = "custom-control-label";
				label2.innerHTML = "Enter the day you visited this place.";

				var date = document.createElement("INPUT");
				date.type = "date";
				date.className = "form-control";
				date.id = "date" + numPlaces;

				group2.appendChild(label2);
				group2.appendChild(date);

				var group3 = document.createElement("DIV");
				group3.className = "form-group";
				group3.id = "t" + numPlaces;

				var label3 = document.createElement("LABEL");
				label3.className = "custom-control-label";
				label3.innerHTML = "Did you visit in the morning (A.M. times) or the afternoon (P.M. times)? ";

				var amDiv = document.createElement("DIV");
				amDiv.className = "custom-control custom-radio custom-control-inline";

				var amInput = document.createElement("INPUT");
				amInput.type = "radio";
				amInput.className = "custom-control-input";
				amInput.id = "am" + numPlaces;
				amInput.name = "time" + numPlaces;

				var label4 = document.createElement("LABEL");
				label4.className = "custom-control-label";
				label4.setAttribute("for", amInput.id);
				label4.innerHTML = "Morning";

				amDiv.appendChild(amInput);
				amDiv.appendChild(label4);

				var pmDiv = document.createElement("DIV");
				pmDiv.className = "custom-control custom-radio custom-control-inline";

				var pmInput = document.createElement("INPUT");
				pmInput.type = "radio";
				pmInput.className = "custom-control-input";
				pmInput.id = "pm" + numPlaces;
				pmInput.name = "time" + numPlaces;

				var label5 = document.createElement("LABEL");
				label5.className = "custom-control-label";
				label5.setAttribute("for", pmInput.id);
				label5.innerHTML = "Afternoon";

				var rmButton = document.createElement("BUTTON"),
				br = document.createElement('br');
				rmButton.type = "button";
				rmButton.addEventListener('click', function() {
					rmPlace(document.getElementById(place.id));
				}, false);
				rmButton.innerHTML = "Remove Place";

				pmDiv.appendChild(pmInput);
				pmDiv.appendChild(label5);

				group3.appendChild(label3);
				group3.appendChild(amDiv);
				group3.appendChild(pmDiv);

				place.appendChild(group1);
				place.appendChild(group2);
				place.appendChild(group3);

				place.appendChild(rmButton);

				document.getElementById("addedPlaces").appendChild(place);
				document.getElementById("addedPlaces").appendChild(br);
			}

			function rmPlace(place) {
				numPlaces--;
				document.getElementById("addedPlaces").removeChild(place);
			}
		</script>
		<div class="container">
			<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			  <a class="navbar-brand" href="#">Am I At Risk?</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
				  <li class="nav-item active">
					<a class="nav-link" href="userForm.php">Enter Details<span class="sr-only">(current)</span></a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="governmentForm.php">Form for Government</a>
				  </li>
				</ul>
			  </div>
			</nav>
			<br /><br /><br />
			<h2 id="safety" style="display: none;"></h2>
			<form>
				<div class="form-group">
					<label>Please enter the various places you visited in the past 14 days.</label>
				</div>
				<div id="p1">
					<div class="form-group">
						<label class="custom-control-label"><b>Place 1</b></label>
						<input type="text" class="form-control" id="place1" placeholder="Start typing to serach for the place you visited..."></input>
					</div>
					<div class="form-group">
						<label class="custom-control-label">Enter the day you visited this place.</label>
						<input type="date" class="form-control" id="date1"></input>
					</div>
					<div class="form-group" id="t1">
						<label class="custom-control-label">Did you visit in the morning (A.M. times) or the afternoon (P.M. times)?</label>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input" id="am1" name="time1" value="am">
							<label class="custom-control-label" for="am1">Morning</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input" id="pm1" name="time1" value="pm">
							<label class="custom-control-label" for="pm1">Afternoon</label>
						</div>
					</div>
				</div>
				<br />

				<div id="addedPlaces"></div>

				<button type="button" onclick="addPlace();">Add Place</button>
				<button type="button" onclick="done();">Submit</button>

				<!--<button type="submit" class="btn btn-primary">Submit</button>-->
			</form>
		</div>
	</body>
</html>
