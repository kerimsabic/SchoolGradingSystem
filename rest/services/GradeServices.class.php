<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/GradesDao.class.php";

class GradeServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new GradesDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


}




?>