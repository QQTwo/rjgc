package com.zl.demo.service;

import com.zl.demo.entity.Employee;

import java.util.List;

/**
 * Created by Administrator on 2016/3/14.
 */
public interface IEmployeeSeervice {
    String find(int id);

    List<Employee> findAll();

    void insertEmp(Employee emp);
}
