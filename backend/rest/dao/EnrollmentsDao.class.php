<?php


require_once __DIR__ . '/BaseDao.class.php';

class EnrollmentsDao extends BaseDao {
    public function __construct(){
        parent::__construct('enrollments');
    }
    
}