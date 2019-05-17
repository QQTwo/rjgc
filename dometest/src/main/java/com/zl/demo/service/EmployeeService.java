package com.zl.demo.service;


import com.zl.demo.entity.Employee;
import com.zl.demo.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2016/3/14.
 */
@Service
public class EmployeeService implements IEmployeeSeervice {
    @Autowired
    private EmployeeMapper mapper;

    @Override
//    @Transactional
    public String find(int id) {
        String ename = mapper.findByPramaryKey(id);
        return ename;
    }

    @Override
    public List<Employee> findAll() {
        List<Employee> list = mapper.findAll();
        return list;
    }

    @Override
    @Transactional
    public void insertEmp(Employee emp) {
        System.out.println(emp.getEmpname());
        mapper.insertEmp(emp);
    }
}
