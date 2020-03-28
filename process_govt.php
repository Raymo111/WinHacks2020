<?php
// inserts values from government form into database
// form names: date='date', am/pm='time', latitude='lat', longitude='lon'

$servername = "localhost";
$username = "app";
$password = "1234";
$dbname = "am_i_at_risk";

// connect to db
$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){  // check for db connection error
	die("Connection failed: " . $conn->connect_error); // die upon db connect error
}

for($counter = 1; $counter <= count($_POST)/4; $counter++){
   // check if values exist
   if(!(isset($_POST["lat{$counter}"]))){
      continue;
   }
   // prepare query
   $query = $conn->prepare("INSERT INTO affected_area VALUES (?, ?, ?, ?);");
   $query->bind_param("ssdd", $_POST["date{$counter}"], $_POST["time{$counter}"],
      $_POST["lat{$counter}"], $_POST["long{$counter}"]);

   // execute query
   if(!($query->execute())){  // upon sql failure
      die("database insertion failed");
   }
}
// close connection
$query->close();
$conn->close();

echo "database updated. Redirecting in 5s...<br>";
header("Refresh: 5; URL=index.html");
?>