package com.xzc.controller;

import com.xzc.model.CourseSortTwo;
import com.xzc.service.CourseSortTwoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/CourseSortTwo")
public class CourseSortTwoController {

    @Autowired
    CourseSortTwoService courseSortTwoService;

    //这个函数根据SortOneId获取其所有的二级子分类，包括课程
    @RequestMapping("/getCourseSortTwosByCourseOneId")
    public List<CourseSortTwo> getCourseSortTwoAndCourse(Integer courseSortOneId) {
        System.out.println("CourseSortTwo.getCourseSortTwosByCourseOneId");
        System.out.println(courseSortOneId);
        return courseSortTwoService.getCourseSortTwosByCourseOneId(courseSortOneId);
    }

    //这个函数获取所有一级分类
    @RequestMapping("/getCourseSortTwoByCourseTwoId")
    public CourseSortTwo getCourseSortTwoByCourseTwoId(Integer courseSortTwoId){
        System.out.println("CourseSortTwo.getCourseSortTwoByCourseTwoId      " + courseSortTwoId);

        CourseSortTwo courseTwo =  courseSortTwoService.getCourseSortTwoByCourseTwoId(courseSortTwoId);
        System.out.println(courseTwo.getCourseSortTwoName());

        return courseTwo;
    }

}
