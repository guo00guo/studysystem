package com.xzc.controller.adminController;

import com.xzc.model.Course;
import com.xzc.model.GoodCourse;
import com.xzc.service.CourseAndTeacherService;
import com.xzc.service.CourseService;
import com.xzc.service.GoodCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 郭超 on 2018/5/18.
 */

@Controller
public class AdminGoodCourseController {

    @Autowired
    private GoodCourseService goodCourseService;
    @Autowired
    private CourseAndTeacherService courseAndTeacherService;
    @Autowired
    private CourseService courseService;

    //这个函数获取所有精品课程
    @GetMapping("/adminGetAllGoodCourse")
    public String getAllGoodCourse(Model model) {
        List<GoodCourse> goodCourses = goodCourseService.getAllGoodCourse();
        model.addAttribute("goodCourses",goodCourses);
        model.addAttribute("count",goodCourses.size());
        return "admin_goodCourse_management";
    }

    //这个函数获取所有每日课程
    @GetMapping("/adminGetAllDayCourse")
    public String getAllDayCourse(Model model) {
        List<GoodCourse> goodCourses = goodCourseService.getAllGoodCourse();
        model.addAttribute("goodCourses",goodCourses);
        model.addAttribute("count",goodCourses.size());
        System.out.println("adminGetAllDayCourse");
        return "admin_everyDayCourse_management";
    }

    //删除精品课程
    @DeleteMapping("/deleteAllGoodCourse/{ids}")
    public String deleteGoodCourseByID(@PathVariable("ids") String ids){
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
            goodCourseService.deleteGoodCourseById(Integer.parseInt(sid[i]));
        }
        return "redirect:/adminGetAllGoodCourse";
    }

    //跳转到增加界面
    @GetMapping("/toAddGoodCoursePage")
    public String toAddGoodCoursePage( Model model){
        int AllCourseId = 0;
        int goodCourseID = 0;
        ArrayList<Integer> idList = new ArrayList();
        List<Course> allCourse = courseAndTeacherService.getAllCourseAndFlag();//！！！！
        List<GoodCourse> goodCourses = goodCourseService.getAllGoodCourse();
        for(int i = 0 ; i < allCourse.size(); i++){
            AllCourseId = allCourse.get(i).getCourseId();
            for(int j = 0 ; j < goodCourses.size(); j++){
                goodCourseID = goodCourses.get(j).getCourseId();
                if(AllCourseId == goodCourseID){
                    idList.add(goodCourseID);
                    continue;
                }
            }
        }
        for(int i = idList.size()-1 ; i >= 0; i--){
            Course course = courseService.getCourseAndUnitAndKPByCourseId(idList.get(i));
            boolean b = allCourse.remove(allCourse.get(idList.get(i)-1));
        }
        model.addAttribute("allCourse",allCourse);
        return "admin_goodCourse_add";
    }

    //实现增加精品课程
    @PostMapping("/addGoodCourse")
    public String addGoodCourse(GoodCourse goodCourse){
        Course course = courseService.getCourseAndUnitAndKPByCourseId(goodCourse.getCourseId());
        goodCourse.setImageUrl(course.getImageUrl());
        System.out.println(goodCourse.getCourseName() +"  "  +goodCourse.getImageUrl());
        int i = goodCourseService.addGoodCourse(goodCourse);
        System.out.println("i==" + i);
        return "redirect:/adminGetAllGoodCourse";
    }


    //根据id查找课程
    @GetMapping("/ajaxSerachCourseName/{courseId}")
    @ResponseBody
    public Course ajaxSerachCourseName(@PathVariable("courseId") Integer courseId){
        //根据id查找课程
        Course course = courseService.getCourseAndUnitAndKPByCourseId(courseId);
        System.out.println(course.getCourseName());
        return course;
    }

}
