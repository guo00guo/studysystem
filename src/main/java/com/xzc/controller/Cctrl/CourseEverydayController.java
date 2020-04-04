package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CourseEverydayController {
    @Autowired
    CourseService courseService;


    //返回所有已开课程，以分页的形式
    @RequestMapping("/getAllCourseWithPage")
    public Pager getAllCourseWithPage(Integer currentPage, Integer pageSize) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");

        //获取课程数据
        List<Course> courseList = courseService.getAllCourseWithPage(pageInfo);

        Map<String, String> parmas = new HashMap<String, String>();
        parmas.put("flag", "yes");

        //获取课程总数
        Integer courseCount = courseService.countCourse(parmas);

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(courseCount);

        return pager;
    }


    //返回所有已开课程，以分页的形式
    @RequestMapping("/getCourseByCourseSortTwos")
    public Pager getCourseByCourseSortTwos(Integer currentPage, Integer pageSize, @RequestParam(value = "courseTwoIds") ArrayList<Integer> courseTwoIds) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");
        pageInfo.put("courseTwoIds", courseTwoIds);

        //获取课程数据
        List<Course> courseList = courseService.getCourseByCourseTwoIdsWithPage(pageInfo);

        Map<String, Object> parmas = new HashMap<String, Object>();
        parmas.put("flag", "yes");
        parmas.put("courseTwoIds", courseTwoIds);

        //获取课程总数
        Integer courseCount = courseService.countCourseByCourseTwoIds(parmas);

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(courseCount);

        return pager;
    }


    @RequestMapping("/getCourseforEveryday")
    public Pager getCourseforEveryday(Integer currentPage, Integer pageSize, Integer courseTwoId) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");
        pageInfo.put("courseTwoId", courseTwoId);

        //获取课程数据
        List<Course> courseList = courseService.getCourseByCourseTwoIdWithPage(pageInfo);

        Map<String, Object> parmas = new HashMap<String, Object>();
        parmas.put("flag", "yes");
        parmas.put("courseTwoId", courseTwoId);

        //获取课程总数
        Integer courseCount = courseService.countCourseByCourseTwoId(parmas);
        Integer recommendCount = courseCount/2;

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(recommendCount);

        return pager;
    }
}
