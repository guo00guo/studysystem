package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.service.StudentService;
import com.xzc.util.Result;
import com.xzc.util.UserCF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Course")
public class RecommendController {

    @Autowired
    CourseService courseService;

    @Autowired
    StudentService studentService;

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



}

