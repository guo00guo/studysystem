package com.xzc.controller;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.service.StudentService;
import com.xzc.service.UserService;
import com.xzc.util.Result;
import com.xzc.util.UserCF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @Autowired
    CourseService courseService;

    @Autowired
    UserCF userCF;

    @RequestMapping(value = "/updateStudentById", method = RequestMethod.POST)
    public Result updateUserById(User user, MultipartFile file) {
        System.out.println("StudentController.updateStudentById");
        System.out.println(user.toString());
        Integer i = studentService.updateUserById(user,file);

        if (i < 1) {
            return Result.error();
        }
        else{
            User newUser = studentService.selectUserById(user.getUserId());
            return Result.success(newUser);
        }
    }

    @RequestMapping(value = "/changeStudentPassWord")
    public Result changePassWord(Integer userId, String oldPassword, String newPassword) {
        System.out.println("StudentController.changePassWord");
        Integer i = studentService.changePassWord(userId, oldPassword, newPassword);
        if (i < 1) {
            return Result.error(i, "原始密码输入不正确！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAllSelectCourseByUserId")
    public List<SelectCourse> getAllSelectCourseByUserId(Integer userId) {
        return studentService.getAllSelectCourseByUserId(userId);
    }

    //根据studentId获取推荐课程
    @RequestMapping(value = "/getRecommendCourseByUserId")
    public ArrayList<Course> getRecommendCourseByUserId(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendCourses = new ArrayList<Course>();
        for (Integer courseId:recommendResult) {
            System.out.println("courseId = " + courseId);
            Course recommendCourse = courseService.getCourseAndUnitAndKPByCourseId(courseId);
            System.out.println("recommendCourse = " + recommendCourse.toString());
            recommendCourses.add(recommendCourse);
        }
        System.out.println("recommendCourses.size() = " + recommendCourses.size());
        return recommendCourses;
    }

    @RequestMapping(value = "/addCourseToSelectCourseByCourseId")
    public Result addCourseToSelectCourseByCourseId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = studentService.addCourseToSelectCourseByCourseId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectCourseByCourseIdAndUserId")
    public Result judgeSelectCourseByCourseIdAndUserId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = studentService.judgeSelectCourseByCourseIdAndUserId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getCourseAndUnitAndKpAndRecourseByCourseId")
    public Result getCourseAndUnitAndKpAndRecourseByCourseId(Integer courseId) {
        List<CourseUnit> unitList = studentService.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByCourseKPId")
    public Result getResourceByCourseKPId(Integer courseKPId) {
        List<Resource> resourceList = studentService.getResourceByCourseKPId(courseKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }

}
