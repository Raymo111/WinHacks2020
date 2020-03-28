<?php
	$servername = "localhost";
	$username = "app";
	$password = "1234";
	$dbname = "am_i_at_risk";

	// connect to db
	$conn = new mysqli($servername, $username, $password, $dbname);
	if($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
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
		<script type="text/javascript" src="GPSData.js"></script>
	</head>
	<body>
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
		<script type="text/javascript">
			document.write(checkSafety());
		</script>
	</body>
</html>