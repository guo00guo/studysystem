package com.xzc.service;

import com.xzc.mapper.TeacherMapper;
import com.xzc.model.*;
import com.xzc.util.LoadFile;
import com.xzc.util.SUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 郭超 on 2018/5/25.
 */
@Service
public class TeacherService {

    @Autowired
    TeacherMapper teacherMapper;

    public List<Course> getOpenCourseByUserId(Integer userId) {
        return teacherMapper.getOpenCourseByUserId(userId);
    }

    public List<Course> getCloseCourseByUserId(Integer userId) {
        return teacherMapper.getCloseCourseByUserId(userId);
    }

    public Integer addTeacherCourse(Integer teacherId, Integer courseId, String flag){
        return teacherMapper.addTeacherCourse(teacherId, courseId, flag);
    }

    public Integer addCourseUnit(CourseUnit courseUnit){
        return teacherMapper.addCourseUnit(courseUnit);
    }

    public Integer addCourseKP(CourseKp courseKp){
        return teacherMapper.addCourseKP(courseKp);
    }

    public Integer changeCourseStatus(Integer courseId){
        return teacherMapper.changeCourseStatus(courseId);
    }

    public Integer changeCourseStatusTCourse(Integer courseId){
        return teacherMapper.changeCourseStatusTCourse(courseId);
    }

    public Integer changePassWord(Integer userId, String passWord, String newPassword) {
        passWord = SUtil.encode(passWord);
        newPassword = SUtil.encode(newPassword);

        //原始密码输入错误
        User user = teacherMapper.getStudentByIdAndPwd(userId, passWord);
        if(user == null){
            System.out.println("原始密码输入不正确！");
            return -10;
        }

        return teacherMapper.changePassWord(userId, passWord, newPassword);
    }

    public Integer updateUserById(User user, MultipartFile file) {
        if (LoadFile.isAllow(file, LoadFile.allowPhoto)) {
            String string = LoadFile.upLoad(LoadFile.imagePath, file);
            if (string != null) {
                user.setImageUrl(string);
                return teacherMapper.updateUserByIdPic(user);
            }
        }
        return teacherMapper.updateUserById(user);
    }

    //查看课程学习者
    public ArrayList<User> getStudentByCourseId(Integer courseId){
        return teacherMapper.getStudentByCourseId(courseId);
    }


    public Integer addNewCourse(Course course, MultipartFile file) {
        if (LoadFile.isAllow(file, LoadFile.allowPhoto)) {
            String string = LoadFile.upLoad(LoadFile.imagePath, file);
            System.out.println("图片路径>> " + string);
            if (string != null) {
                course.setImageUrl(string);
                return teacherMapper.addNewCoursePic(course);
            }
        }
        return teacherMapper.addNewCourse(course);
    }

    public User selectUserById(Integer userId) {
        System.out.println("UserService.selectUserByUserId");
        return teacherMapper.selectUserById(userId);
    }

    /*新加*/
    public List<User> findAllTeacher(){return teacherMapper.selectAllTeacher();}

    /**
     * 删除教师通过id
     */
    public void deleteTeacherByUserId(Integer userId){teacherMapper.deleteTeacherByUserId(userId);}
    /**
     * 通过userID查找教师
     */
    public Teacher selectTeByUserId(Integer userId){return teacherMapper.selectTeByUserId(userId);}



    /**
     * 分页查找所有教师
     */
    public List<Teacher> findAllTeacherByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize){
        currentPage = (currentPage-1)*pageSize;
        return teacherMapper.selectAllTeacherByPage(currentPage,pageSize);
    }
    /**
     * 分页查找教师BY用户名
     */
    public List<Teacher> findTeacherByPageByName(@Param("currentPage") Integer currentPage,
                                                 @Param("pageSize") Integer pageSize, @Param("userName") String userName){
        currentPage = (currentPage-1)*pageSize;
        return teacherMapper.selectTeacherByPageByName(currentPage,pageSize,userName);
    }

    /**
     * 查找所有教师BY用户名
     */
    public List<Teacher> findTeacherByName(@Param("userName") String userName){
        return teacherMapper.selectTeacherByName(userName);
    }
}
