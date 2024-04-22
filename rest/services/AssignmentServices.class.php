<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/AssignmentsDao.class.php";

class AssignmentServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new AssignmentsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


}




?>