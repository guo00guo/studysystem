package com.xzc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestShiro {


    @RequestMapping("/admin/test")
    public void adminTest() {
        System.out.println("TestShiro.adminTest");
    }

    @RequestMapping("/student/test")
    public void studentTest() {
        System.out.println("TestShiro.studentTest");
    }

    @RequestMapping("/student/update")
    public void studentUpdate() {
        System.out.println("TestShiro.studentUpdate");
    }
}
