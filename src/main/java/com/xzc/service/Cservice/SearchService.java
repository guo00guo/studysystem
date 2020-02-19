package com.xzc.service.Cservice;

import com.xzc.mapper.CourseMapper;
import com.xzc.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 */
@Service
public class SearchService {

    @Autowired
    CourseMapper courseMapper;

    //获取所有课程
    public List<Course> getAllCourseWithPage(Map<String, Object> pageInfo) {
        return courseMapper.getAllCourseWithPage(pageInfo);
    }

    public Integer countCourse(Map<String, String> parmas) {
        return courseMapper.countCourse(parmas);
    }

    //获取一级分类下的所有的课程
    public List<Course> getCourseByCourseTwoIdsWithPage(Map<String, Object> pageInfo) {
        return courseMapper.getCourseByCourseTwoIdsWithPage(pageInfo);
    }

    public Integer countCourseByCourseTwoIds(Map<String, Object> parmas) {
        return courseMapper.countCourseByCourseTwoIds(parmas);
    }

    //获取二级分类下的所有的课程
    public List<Course> getCourseByCourseTwoIdWithPage(Map<String, Object> pageInfo) {
        return courseMapper.getCourseByCourseTwoIdWithPage(pageInfo);
    }

    public Integer countCourseByCourseTwoId(Map<String, Object> parmas) {
        return courseMapper.countCourseByCourseTwoId(parmas);
    }

    //搜索关键词课程
    public List<Course> getCourseByCourseName(String courseName) {
        return courseMapper.getCourseByCourseName(courseName);
    }

    //根据用户ID获取推荐课程
    public List<Course> getCourseByUserId(Integer userId) {
        return courseMapper.getCourseByUserId(userId);
    }

    public Integer countCourseByCourseName(String courseName) {
        return courseMapper.countCourseByCourseName(courseName);
    }


    public CourseSortTwo getCourseSortTwoByCourseSortTwoId(Integer courseSortTwoId) {
        return courseMapper.getCourseSortTwoByCourseSortTwoId(courseSortTwoId);
    }

    public CourseSortOne getCourseSortOneByCourseSortOneId(Integer courseSortOneId) {
        return courseMapper.getCourseSortOneByCourseSortOneId(courseSortOneId);
    }

    public Course getCourseAndUnitAndKPByCourseId(Integer courseId) {
        return courseMapper.getCourseAndUnitAndKPByCourseId(courseId);
    }

    public User getTeacherInfoByUserId(Integer userId) {
        return courseMapper.getTeacherInfoByUserId(userId);
    }

    public User getTeacherInfoByCourseId(Integer courseId) {
        return courseMapper.getTeacherInfoByCourseId(courseId);
    }

    public int getCountStudentsByCourseId(Integer courseId) {
        return courseMapper.countStudentsByCourseId(courseId);
    }

    public List<SelectCourse> getSelectCourseByCourseID(Integer courseId) {
        return courseMapper.getSelectCourseByCourseID(courseId);
    }

}
