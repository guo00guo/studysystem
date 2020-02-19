package com.xzc.controller;

import com.xzc.model.CourseSortOne;
import com.xzc.service.CourseSortOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/CourseSortOne")
public class CourseSortOneController {

    @Autowired
    CourseSortOneService courseSortOneService;

    //这个函数获取的是所有的分类，包括一级和二级
    @RequestMapping("/getAllCourseSort")
    public List<CourseSortOne> getAllCourseSort() {
        System.out.println("CourseSortOne.getAllCourseSort");
        return courseSortOneService.getAllCourseSort();
    }

    //这个函数获取所有一级分类
    @RequestMapping("/getAllCourseSortOne")
    public List<CourseSortOne> getAllCourseSortOne(){
        System.out.println("CourseSortOne.getAllCourseSortOne");
        return courseSortOneService.getAllCourseSortOne();
    }

    //这个函数获取所有一级分类
    @RequestMapping("/getCourseSortOneByCourseOneId")
    public CourseSortOne getCourseSortOneByCourseOneId(Integer courseSortOneId){
        System.out.println("CourseSortOne.getCourseSortOneByCourseOneId");

        CourseSortOne courseOne =  courseSortOneService.getCourseSortOneByCourseOneId(courseSortOneId);
        System.out.println(courseOne.getCourseSortOneName());

        return courseOne;
    }

}
