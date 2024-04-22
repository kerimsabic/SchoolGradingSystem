<?php


require_once __DIR__ . '/BaseDao.class.php';

class AssignmentsDao extends BaseDao {
    public function __construct(){
        parent::__construct('assignments');
    }
    
}