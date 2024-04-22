<?php


require_once __DIR__ . '/BaseDao.class.php';

class GradesDao extends BaseDao {
    public function __construct(){
        parent::__construct('grades');
    }
    
}