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

// prepare query: select all data from the last 14 days
$query = $conn->prepare("SELECT * FROM affected_area WHERE day BETWEEN 
   date_sub(now(), INTERVAL 14 DAY) AND now();");

// execute sql
if(!($query->execute())){  // upon sql failure
   die("SQL failure: " . $query->error);
}
$result = $query->get_result();
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
   <h1>Processing user form page</h1>
   <h2>Affected coords</h2>
   <?php 
      // test loop
      while($row = $result->fetch_assoc()){  
         echo $row['day'] . " (" . $row['latitude'] . "," . $row['longitude'] . ")<br>";
      }
   ?>
</body>
</html>