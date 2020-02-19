package com.xzc.controller.Cctrl;

import com.xzc.model.CourseSortOne;
import com.xzc.service.CourseSortOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ExploreController")
public class ExploreController {

    @Autowired
    CourseSortOneService courseSortOneService;

    /*
    管理员可以通过搜索查看制定用户信息
     */

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

    /*
    管理员通过搜索查看指定用户信息
     */
    @RequestMapping("/getCourseSortOneByCourseOneId1")
    public CourseSortOne getCourseSortOneByCourseOneId1(Integer courseSortOneId){
        System.out.println("CourseSortOne.getCourseSortOneByCourseOneId");

        CourseSortOne courseOne =  courseSortOneService.getCourseSortOneByCourseOneId(courseSortOneId);
        System.out.println(courseOne.getCourseSortOneName());

        return courseOne;
    }

    /*
    指定用户的信息显示
     */
    @RequestMapping("/getAllCourseSortOne1")
    public List<CourseSortOne> getAllCourseSortOne1(){
        System.out.println("CourseSortOne.getAllCourseSortOne");
        return courseSortOneService.getAllCourseSortOne();
    }

    /*
    管理员身份认证
     */
    @RequestMapping("/getAllCourseSort1")
    public List<CourseSortOne> getAllCourseSort1() {
        System.out.println("CourseSortOne.getAllCourseSort");
        return courseSortOneService.getAllCourseSort();
    }

}
