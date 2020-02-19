package com.xzc.service.Cservice;

import com.xzc.mapper.CourseMapper;
import com.xzc.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Service
public class AccountService {

    @Autowired
    CourseMapper accountMapper;

    //获取所有可控用户
    public List<Course> getAllCourseWithPage(Map<String,Object> pageInfo){
        return accountMapper.getAllCourseWithPage(pageInfo);
    }

    public Integer countCourse(Map<String, String> parmas){
        return accountMapper.countCourse(parmas);
    }

    //获取一级分类下的所有的课程
    public List<Course> getCourseByCourseTwoIdsWithPage(Map<String, Object> pageInfo){
        return accountMapper.getCourseByCourseTwoIdsWithPage(pageInfo);
    }

    public Integer countCourseByCourseTwoIds(Map<String, Object> parmas){
        return accountMapper.countCourseByCourseTwoIds(parmas);
    }

    //获取二级分类下的所有的课程
    public List<Course> getCourseByCourseTwoIdWithPage(Map<String, Object> pageInfo){
        return accountMapper.getCourseByCourseTwoIdWithPage(pageInfo);
    }

    public Integer countCourseByCourseTwoId(Map<String, Object> parmas){
        return accountMapper.countCourseByCourseTwoId(parmas);
    }

    //搜索关键词课程
    public List<Course> getCourseByCourseName(String courseName){
        return accountMapper.getCourseByCourseName(courseName);
    }

    //根据用户ID获取推荐课程
    public List<Course> getCourseByUserId(Integer userId){
        return accountMapper.getCourseByUserId(userId);
    }

    public Integer countCourseByCourseName(String courseName){
        return accountMapper.countCourseByCourseName(courseName);
    }


    public CourseSortTwo getCourseSortTwoByCourseSortTwoId(Integer courseSortTwoId){
        return accountMapper.getCourseSortTwoByCourseSortTwoId(courseSortTwoId);
    }

    public CourseSortOne getCourseSortOneByCourseSortOneId(Integer courseSortOneId){
        return accountMapper.getCourseSortOneByCourseSortOneId(courseSortOneId);
    }

    public Course getCourseAndUnitAndKPByCourseId(Integer courseId){
        return accountMapper.getCourseAndUnitAndKPByCourseId(courseId);
    }

    public User getTeacherInfoByUserId(Integer userId){
        return accountMapper.getTeacherInfoByUserId(userId);
    }

    public User getTeacherInfoByCourseId(Integer courseId){
        return accountMapper.getTeacherInfoByCourseId(courseId);
    }

    public int getCountStudentsByCourseId(Integer courseId){
        return accountMapper.countStudentsByCourseId(courseId);
    }

    public List<SelectCourse> getSelectCourseByCourseID(Integer courseId){
        return accountMapper.getSelectCourseByCourseID(courseId);
    }

}
