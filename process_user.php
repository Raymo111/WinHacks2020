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

$close_coords = array();   // array of coordinates near the user

// execute sql
if(!($query->execute())){  // upon sql failure
   die("SQL failure");
}
else{
   $result = $query->get_result();
   // form returns triples, so there are count($_POST)/3 triples
   for($counter = 1; $counter < count($_POST)/3; $counter++){
      $user_latitude = round(doubleval($_POST["lat{$counter}"]), 2);
      $user_longitude = round(doubleval($_POST["long{$counter}"]), 2);
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
}
?>