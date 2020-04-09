package com.xzc.controller;

import com.xzc.model.*;
import com.xzc.service.StudentService;
import com.xzc.service.TeacherService;
import com.xzc.util.LoadFile;
import com.xzc.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @Autowired
    StudentService studentService;

    @RequestMapping(value = "/getOpenCourseByUserId")
    public List<Course> getOpenCourseByUserId(Integer userId) {
        return teacherService.getOpenCourseByUserId(userId);
    }

    @RequestMapping(value = "/getCloseCourseByUserId")
    public List<Course> getCloseCourseByUserId(Integer userId) {
        return teacherService.getCloseCourseByUserId(userId);
    }

    //查看课程的学习者
    @RequestMapping(value = "/getStudentByCourseId")
    public ArrayList<User> getStudentByCourseId(Integer courseId) {
        ArrayList<User> studentByCourseId = teacherService.getStudentByCourseId(courseId);
        return studentByCourseId;
    }

    @RequestMapping(value = "/updateTeacherById", method = RequestMethod.POST)
    public Result updateUserById(User user, MultipartFile file) {
        System.out.println("teacher.updateTeacherById");
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

    @RequestMapping(value = "/addNewCourse", method = RequestMethod.POST)
    public Result addNewCourse(Course course,Integer userId, MultipartFile file) {
        System.out.println(course.toString());
        course.setUserId(userId);
        teacherService.addNewCourse(course,file);
        System.out.println("userId = " + userId);
        Integer courseId = course.getCourseId();
        String flag = course.getFlag();
        Teacher teacherUser = teacherService.selectTeByUserId(userId);
        Integer j = teacherService.addTeacherCourse(teacherUser.getTeacherId(), courseId,"no");
        System.out.println("j = " + j);
        if (j < 1) {
            return Result.error();
        }
        else{
            return Result.success(j);
        }
    }

    //添加课程章节
    @RequestMapping(value = "/addCourseUnit", method = RequestMethod.POST)
    public Result addCourseUnit(CourseUnit courseUnit) {
        Integer j = teacherService.addCourseUnit(courseUnit);
        if (j < 1) {
            return Result.error();
        }
        else{
            return Result.success(j);
        }
    }

    //添加课程知识点
    @RequestMapping(value = "/addCourseKP", method = RequestMethod.POST)
    public Result addCourseKP(CourseKp courseKp) {
        System.out.println(courseKp.toString());
        Integer j = teacherService.addCourseKP(courseKp);
        System.out.println("courseUnit = " + courseKp.getCourseKPName());
        System.out.println("j = " + j);
        if (j < 1) {
            return Result.error();
        }
        else{
            return Result.success(j);
        }
    }

    //改变开课状态
    @RequestMapping(value = "/changeCourseStatus", method = RequestMethod.POST)
    public Result changeCourseStatus(Integer courseId) {
        teacherService.changeCourseStatusTCourse(courseId);
        Integer j = teacherService.changeCourseStatus(courseId);
        System.out.println("j = " + j);
        if (j < 1) {
            return Result.error();
        }
        else{
            return Result.success(j);
        }
    }


    //通过courseId获取所有章节
    @RequestMapping(value = "/getCourseUnitByCourseId", method = RequestMethod.POST)
    public Result getCourseUnitByCourseId(Integer courseId) {
        System.out.println("courseId = " + courseId);
        List<CourseUnit> unitList = studentService.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);

        System.out.println("unitList = " + unitList.toString());
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/changeTeacherPassWord")
    public Result changePassWord(Integer userId, String oldPassword, String newPassword) {
        System.out.println("TeacherController.changeTeacherPassWord");
        Integer i = teacherService.changePassWord(userId, oldPassword, newPassword);
        if (i < 1) {
            return Result.error(i, "原始密码输入不正确！");
        }
        return Result.success(i);
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
