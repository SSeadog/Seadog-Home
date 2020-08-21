<?php
    include "connect_db.php";
    $sql="select RANK, SCORE from break_block_rank order by RANK";
    $res=mysqli_query($connect,$sql);
    
    $username = $_GET['username'];
    $score = $_GET['score'];
    $rank = 100; // 100으로 초기화
    $rows = [];
    while($row=mysqli_fetch_array($res)) {
        if($score>$row[1]) {
            // 1등부터 아래 등수 확인하며 score가 크면 break
            break;
        }
        // $rows에 1등부터 하나씩 저장
        $rows[] = $row;
    }
    $low_rank = count($rows);
    $rank = $rows[$low_rank-1][0]+1;
    // 등록된 랭크 중에서 꼴등이 아닌 경우
    if($rank!=100) {
        $sql="update break_block_rank set rank = rank + 1 where rank >={$rank}";
        mysqli_query($connect,$sql);
        $sql="insert into break_block_rank(RANK, NAME, SCORE) values({$rank},'{$username}',{$score})";
        mysqli_query($connect,$sql);
    // 등록된 기록 중에서 꼴등인 경우
    } else {
        if(count($rows) < 50) {
            $low_rank +=1;
            $sql="insert into break_block_rank(RANK, NAME, SCORE) values({$low_rank},'{$username}',{$score})";
            mysqli_query($connect,$sql);
            // 50개 이하라 꼴등이어도 등록 가능
            
        }
    }
?>