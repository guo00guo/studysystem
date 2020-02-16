package com.xzc.mapper;

import com.xzc.model.Course;
import com.xzc.model.CourseExt;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 郭超 on 2018/5/18.
 */
@Mapper
@Repository
public interface CourseAndTeacherMapper {

    /**
     * 查找课程和老师的信息
     *
     * @param
     * @return
     * @throws Exception
     */
    List<CourseExt> getCourseAndTeacher();

    /**
     * 根据courseId查找课程和老师的信息
     */
    CourseExt getCourseAndTeacherById(Integer courseId);

    /**
     * 获取所有课程
     */
    List<Course> getAllCourse();

    /**
     * 分页查找课程
     */
    List<CourseExt> seleteCourseExtByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize);

    /**
     * 分页查找课程By课程名
     */
    List<CourseExt> selectCourseExtByPageByName(@Param("currentPage") Integer currentPage,
                                                @Param("pageSize") Integer pageSize, @Param("courseName") String courseName);

    /**
     * 找所有课程By课程名
     */
    List<CourseExt> selectCourseExtByName(@Param("courseName") String courseName);

    /**
     * 删除课程By课程ID
     */
    int deleteCourseExtById(@Param("courseId") Integer courseId);

    /**
     * 新加
     */
    /**
     * 获取所有已开课程
     */
    List<Course> getAllCourseAndFlag();
}
