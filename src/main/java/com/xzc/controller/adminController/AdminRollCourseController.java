package com.xzc.controller.adminController;

import com.xzc.model.Course;
import com.xzc.model.RollCourse;
import com.xzc.service.CourseAndTeacherService;
import com.xzc.service.CourseService;
import com.xzc.service.RollCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 郭超 on 2018/6/1.
 */
@Controller
public class AdminRollCourseController {

    @Autowired
    private RollCourseService rollCourseService;
    @Autowired
    private CourseAndTeacherService courseAndTeacherService;
    @Autowired
    private CourseService courseService;

    //这个函数获取所有轮播课程
    @GetMapping("/adminGetAllRollCourse")
    public String getAllLunBoCourse(Model model) {
        List<RollCourse> rollCourses = rollCourseService.getAllRollCourse();
        model.addAttribute("rollCourses",rollCourses);
        model.addAttribute("count",rollCourses.size());
        System.out.println("adminGetAllLunBoCourse");
        return "admin_rollCourse_management";
    }

    //删除精品课程
    @DeleteMapping("/deleteAllRollCourse/{ids}")
    public String deleterollCourseByID(@PathVariable("ids") String ids){
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
            int j = rollCourseService.deleteRollCourseById(Integer.parseInt(sid[i]));
        }
        return "redirect:/adminGetAllRollCourse";
    }

    //跳转到增加界面
    @GetMapping("/toAddRollCoursePage")
    public String toAddRollCoursePage(Model model){
        int AllCourseId = 0;
        int rollCourseID = 0;
        ArrayList<Integer> idList = new ArrayList();
        List<Course> allCourse = courseAndTeacherService.getAllCourseAndFlag();
        List<RollCourse> rollCourse = rollCourseService.getAllCourse();
        for(int i = 0 ; i < allCourse.size(); i++){
            AllCourseId = allCourse.get(i).getCourseId();
            for(int j = 0 ; j < rollCourse.size(); j++){
                rollCourseID = rollCourse.get(j).getCourseId();
                if(AllCourseId == rollCourseID){
                    idList.add(rollCourseID);
                    continue;
                }
            }
        }
        for(int i = idList.size()-1 ; i >= 0; i--){
            Course course = courseService.getCourseAndUnitAndKPByCourseId(idList.get(i));
            boolean b = allCourse.remove(allCourse.get(idList.get(i)-1));
        }
        model.addAttribute("allCourse",allCourse);
        return "admin_rollCourse_add";
    }

    //实现增加精品课程
    @PostMapping("/addrollCourse")
    public String addrollCourse(RollCourse rollCourse){
        Course course = courseService.getCourseAndUnitAndKPByCourseId(rollCourse.getCourseId());
        rollCourse.setImageUrl(course.getImageUrl());
        System.out.println(rollCourse.getCourseName() +"  "  +rollCourse.getImageUrl());
        int i = rollCourseService.addrollCourse(rollCourse);
        System.out.println("i==" + i);
        return "redirect:/adminGetAllRollCourse";
    }

    //根据id查找轮播课程
    @GetMapping("/ajaxSerachRollCourseName/{courseId}")
    @ResponseBody
    public Course ajaxSerachRollCourseName(@PathVariable("courseId") Integer courseId){
        //根据id查找课程
        Course course = courseService.getCourseAndUnitAndKPByCourseId(courseId);
        System.out.println(course.getCourseName());
        return course;
    }
}
