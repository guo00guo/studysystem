package com.xzc.controller;

import com.xzc.model.RollCourse;
import com.xzc.service.RollCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@RestController
@RequestMapping("/RollCourse")
public class RollCourseController {

    @Autowired
    RollCourseService rollCourseService;

    //这个函数获取所有轮播课程
    @RequestMapping("/getAllCourse")
    public List<RollCourse> getAllCourse() {
        System.out.println("RollCourse.getAllCourse");
        return rollCourseService.getAllCourse();
    }
}
