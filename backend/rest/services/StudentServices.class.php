<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/StudentsDao.class.php";

class StudentServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new StudentsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


}




?>