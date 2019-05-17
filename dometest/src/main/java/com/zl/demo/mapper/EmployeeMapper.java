package com.zl.demo.mapper;

import com.zl.demo.entity.Employee;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by Administrator on 2016/3/14.
 */
/*
* +-------+-------------------------------
| Table | Create Table
+-------+-------------------------------
| emp   | CREATE TABLE `emp2` (
  `id` int(11) DEFAULT NULL,
  `empname` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |
+-------+-------------------------------

drop table if exists emp2;
create table emp2 (id int not null,empname varchar(20));
* */
@Mapper
public interface EmployeeMapper {
    @Select("select empname from emp2 where id=#{id}")
    String findByPramaryKey(@Param("id") Integer id);

    @Select("select * from emp2")
    List<Employee> findAll();

    @Insert("insert into emp2 values(#{id},#{empname})")
    void insertEmp(Employee emp);
}
