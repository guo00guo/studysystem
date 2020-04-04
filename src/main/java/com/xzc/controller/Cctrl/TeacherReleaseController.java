package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.service.Cservice.CourseReleaseService;
import com.xzc.service.TeacherService;
import com.xzc.util.LoadFile;
import com.xzc.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

public class TeacherReleaseController {
    @Autowired
    TeacherService teacherService;

    @Autowired
    CourseReleaseService courseService;

    @RequestMapping(value = "/getOpenCourseByUserId")
    public List<Course> getOpenCourseByUserId(Integer userId) {
        return teacherService.getOpenCourseByUserId(userId);
    }

    @RequestMapping(value = "/getCloseCourseByUserId")
    public List<Course> getCloseCourseByUserId(Integer userId) {
        return teacherService.getCloseCourseByUserId(userId);
    }

    //查看课程
    @RequestMapping(value = "/getCourseById")
    public ArrayList<User> getCourseId(Integer courseId) {
        ArrayList<User> CourseId = teacherService.getStudentByCourseId(courseId);
        return CourseId;
    }

    @RequestMapping(value = "/updateCourseById", method = RequestMethod.POST)
    public Result updateCourseById(User user, MultipartFile file) {
        System.out.println("teacher.updateCourseById");
        System.out.println(user.toString());
        Integer i = teacherService.updateUserById(user,file);

        if (i < 1) {
            return Result.error();
        }
        else{
            User newUser = teacherService.selectUserById(user.getUserId());
            return Result.success(newUser);
        }
    }

    @RequestMapping(value = "/releaseCourse", method = RequestMethod.POST)
    public Result releaseCourse(Course course,Integer userId, MultipartFile file) {
        System.out.println(course.toString());
        System.out.println("userId = " + userId);
        Integer courseId = course.getCourseId();
        String flag = course.getFlag();
        Teacher teacherUser = teacherService.selectTeByUserId(userId);
        Integer j = courseService.noticeCourse(teacherUser.getTeacherId(), courseId,"no");
        System.out.println("j = " + j);
        if (j < 1) {
            return Result.error();
        }
        else{
            return Result.success(j);
        }
    }

    @RequestMapping("/upLoadVideo")
    public Result upLoadVideo(MultipartFile file) {
        System.out.println("TeacherController.upLoadVideo");
        if (LoadFile.isAllow(file,LoadFile.allowVideo)) {
            String videoUrl = LoadFile.upLoad(LoadFile.videoPath, file);
            if (videoUrl != null) {
                return Result.success("视屏上传成功");
            }
        }
        return Result.error();
    }
}
