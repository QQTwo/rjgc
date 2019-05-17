package com.zl.demo.controller;

import com.zl.demo.entity.Employee;
import com.zl.demo.service.IEmployeeSeervice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

/**
 * Created by Administrator on 2016/3/14.
 */
@Controller
//@RestController
public class HelloController {
    @Autowired
    private IEmployeeSeervice service;

    @RequestMapping("/hello")
    public String hello() {
        String ename = service.find(12);
        System.out.println("首次进入springboot控制器,找到的用户是：" + ename);
        return "index";
    }

    @RequestMapping("/list")
    @ResponseBody
    public List<Employee> allEmp() {
        List<Employee> list = service.findAll();
        for (Employee e : list
                ) {
            System.out.print(e.getEmpname());
        }
        return list;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST,
            consumes = "application/json", produces = "application/json")
    @ResponseBody
    public Employee add(@RequestBody Employee emp) {
        System.out.println(emp.getEmpname());
        service.insertEmp(emp);
        return emp;
    }

    public boolean createordropDB(String sqlstring) {
        // JDBC driver name and database URL
        String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        String DB_URL = "jdbc:mysql://localhost/";

        //  Database credentials
        String USER = "root";
        String PASS = "root";
        Connection conn = null;
        Statement stmt = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Connected database successfully...");
            System.out.println("Deleting database...");
            stmt = conn.createStatement();
            stmt.executeUpdate(sqlstring);
            System.out.println("Database deleted successfully...");
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (null != conn)
                    conn.close();
            } catch (SQLException se) {
            }
            try {
                if (conn != null)
                    conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
                return false;
            }

        }
        return true;
    }

    // String sql = "DROP DATABASE jdbc_db";//create database demo
    @RequestMapping(value = "/createdb")
    @ResponseBody
    public String createDb() {
        boolean isok = this.createordropDB("create database demo");
        if (isok) {
            return "数据库创建成功";
        } else {
            return "数据库创建失败";
        }
    }

    @RequestMapping(value = "/dropdb")
    @ResponseBody
    public String dropDb() {
        boolean isok = this.createordropDB("DROP DATABASE demo");
        if (isok) {
            return "数据库删除成功";
        } else {
            return "数据库删除失败";
        }
    }
}
