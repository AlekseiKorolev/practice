<?php
    $servername = "localhost";
    $username = "";
    $password = "";
    $dbname = "";


    // Create connection
    $conn = mysqli_connect($servername, $username, $password);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully<br/>";

    mysqli_select_db($conn,$dbname);

    $sql = "SELECT* FROM football";

    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($result)){
        foreach($row as $cname => $cvalue){
        print "$cname: $cvalue\t";
    }
        print "<br/>";
    }

    mysqli_close($conn);
?>
