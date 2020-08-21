<?php
    include "connect_db.php";
    $sql="select RANK, NAME, SCORE from break_block_rank";
    $res=mysqli_query($connect,$sql);
    
    $rows = [];
    while($row=mysqli_fetch_array($res)) {
        $rows[]= $row;
    }

    foreach($rows as $row) {
        echo "<tr><td>{$row[0]}</td><td>{$row[1]}</td><td>{$row[2]}</td>";
    }
?>