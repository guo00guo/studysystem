package com.xzc.service;

import com.xzc.mapper.CourseAndTeacherMapper;
import com.xzc.model.Course;
import com.xzc.model.CourseExt;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 郭超 on 2018/5/18.
 */
@Service
public class CourseAndTeacherService {
    @Autowired
    CourseAndTeacherMapper courseAndTeacherMapper;

    public List<CourseExt> getCourseAndTeacher(){
        List<CourseExt> CourseAndTeacher = courseAndTeacherMapper.getCourseAndTeacher();
        return CourseAndTeacher;
    }

    public CourseExt getCourseAndTeacherById(Integer courseId){
        CourseExt Course = courseAndTeacherMapper.getCourseAndTeacherById(courseId);
        return Course;

    }

    public List<Course> getAllCourse(){
        return courseAndTeacherMapper.getAllCourse();
    }

    /**
     * 分页查找课程
     */
    public List<CourseExt> findAllCourseExtByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize){
        Integer nowPage = (currentPage-1) * pageSize;
        return courseAndTeacherMapper.seleteCourseExtByPage(nowPage,pageSize);}

    /**
     * 分页查找课程By课程名
     */
    public List<CourseExt> findAllCourseExtByPageByName(@Param("currentPage") Integer currentPage,
                                                        @Param("pageSize") Integer pageSize, @Param("courseName") String courseName){
        Integer nowPage = (currentPage-1) * pageSize;
        return courseAndTeacherMapper.selectCourseExtByPageByName(nowPage,pageSize,courseName);
    }
    /**
     * 找所有课程By课程名
     */
    public List<CourseExt> findCourseExtByName(@Param("courseName") String courseName){
        return courseAndTeacherMapper.selectCourseExtByName(courseName);
    }

    /**
     * 删除课程By课程ID
     */
    public int deleteCourseExtById(@Param("courseId") Integer courseId){
        return courseAndTeacherMapper.deleteCourseExtById(courseId);
    }
    /**
     * 新加
     */
    /**
     * 获取所有已开课程
     * @return
     */
    public List<Course> getAllCourseAndFlag(){
        return courseAndTeacherMapper.getAllCourseAndFlag();
    }
}
