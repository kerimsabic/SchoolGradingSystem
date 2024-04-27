<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao//ProfessorsDao.class.php";

class ProfessorServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new ProfessorsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


}




?>