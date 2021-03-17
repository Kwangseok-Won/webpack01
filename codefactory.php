<?php
  $item1 = array(
    'sort' => $_GET['sort'],
    'name' => 'book1',
    'title' => 'Hello'
  );
  $item2 = array(
    'sort' => $_GET['sort'],
    'name' => 'book2',
    'title' => 'JavaScript'
  );
  $item3 = array(
    'sort' => $_GET['sort'],
    'name' => 'book3',
    'title' => 'Book'
  );

  $arr = array($item1, $item2, $item3);

  echo json_encode($arr);
?>