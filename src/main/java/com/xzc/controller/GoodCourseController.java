package com.xzc.controller;

import com.xzc.model.Course;
import com.xzc.model.GoodCourse;
import com.xzc.service.GoodCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@RestController
@RequestMapping("/GoodCourse")
public class GoodCourseController {

    @Autowired
    GoodCourseService goodCourseService;

    //这个函数获取所有精品课程
    @RequestMapping("/getAllCourse")
    public List<GoodCourse> getAllCourse() {
        return goodCourseService.getAllCourse();
    }
    @RequestMapping("/getAllGoodCourse")
    public List<GoodCourse> getAllGoodCourse() {
        return goodCourseService.getAllGoodCourse();
    }
    @RequestMapping("/getAllGoodCourseIndex")
    public List<Course> getAllGoodCourseIndex() {
        return goodCourseService.getAllGoodCourseIndex();
    }
}
