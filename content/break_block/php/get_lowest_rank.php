<?php
    include "connect_db.php";
    $sql="select RANK, SCORE from break_block_rank where SCORE in (select min(SCORE) from break_block_rank)";
    $res=mysqli_query($connect,$sql);
    $row=mysqli_fetch_row($res);

    echo "{$row[0]},{$row[1]}";
?>