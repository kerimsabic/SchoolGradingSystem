<?php


require_once __DIR__ . '/BaseDao.class.php';

class CoursesDao extends BaseDao {
    public function __construct(){
        parent::__construct('courses');
    }
    
}