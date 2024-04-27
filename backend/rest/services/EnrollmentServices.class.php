<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/EnrollmentsDao.class.php";

class EnrollmentServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new EnrollmentsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


}




?>