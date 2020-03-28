<?php
// inserts values from government form into database
// form names: date='date', am/pm='time', latitude='lat', longitude='lon'

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
$query = $conn->prepare("INSERT INTO affected_area VALUES (?, ?, ?, ?);");
$query->bind_param("ssdd", $_POST['date'], $_POST['time'], $_POST['lat'], $_POST['lon']);

// execute query
if(!($query->execute())){  // upon sql failure
   echo "database insertion failed<br>";
}
else{
   echo "database updated. Redirecting in 5<br>";
   header("Refresh: 5; URL=index.html");
}

// close connection
$query->close();
$conn->close();
?>