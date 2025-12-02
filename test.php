<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table with database</title>
</head>
<body>
    <table>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </table>

    <?php 
    $conn = mysqli_connect(hostname: "localhost",username: "root",password: "",database: "autok");
    if($conn -> connect_error) die("Connection failed" . $conn -> connect_error);
    
    $sql = "SELECT id, brand, model, year, body_type, mileage, color, price, fuel, top_speed, power_hp, drive, transmission, doors, seats from cars";
    $result = $conn -> query($sql);

    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            echo "<tr><td>". $row["id"]."</td><td>". $row["brand"]."</td><td>". $row["model"]."</td><td>". $row["year"]."</td><td>". $row["body_type"]."</td><td>". $row["mileage"]."</td><td>". $row["color"]."</td><td>". $row["price"]."</td><td>". $row["fuel"]."</td><td>". $row["top_speed"]."</td><td>". $row["power_hp"]."</td><td>". $row["drive"]."</td><td>". $row["transmission"]."</td><td>". $row["doors"]."</td><td>". $row["seats"]."</td></tr>";
        }
        echo "</table>";
    }
    else {
        print("0 results");
    }
    $conn -> close();
    ?>

</body>
</html>