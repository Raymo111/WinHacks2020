<?php
$servername = "localhost";
$username = "app";
$password = "1234";
$dbname = "winhacks";

// connect to db
$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
	die("Connection failed: " . $conn->connect_error);
}

// prepare query
$query = $conn->prepare("SELECT * FROM affected_area;");

// execute sql
if(!($query->execute())){  // upon sql failure
   die("SQL failure");
}
else{
   $close_coords = array();   // array of coordinates near the user
   $result = $query->get_result();

   $user_latitude = round(doubleval($_POST['lat']), 2);
   $user_longitude = round(doubleval($_POST['lon']), 2);
   // NOT DONE
   while($row = $result->fetch_assoc()){  // loop through sql results and filter
      // round longitude and latitude to 2 fractional digits
      $longitude = round(doubleval($row['longitude']), 2);
      $latitude = round(doubleval($row['latitude']), 2);

      // check if ($latitude, $longitude) is a coord near the user
      if(abs($user_latitude - $latitude) < 0.1 && abs($user_longitude - $longitude) < 0.1){
         // user is close to affected area
         $close_coords.push("{$row['latitude']}, {$row['longitude']}");
      }
   }
}
?>