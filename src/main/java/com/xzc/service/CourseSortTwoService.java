package com.xzc.service;

import com.xzc.mapper.CourseSortTwoMapper;
import com.xzc.model.CourseSortTwo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Service
public class CourseSortTwoService {

    @Autowired
    CourseSortTwoMapper courseSortTwoMapper;

    //这个函数根据SortOneId获取其所有的二级子分类，包括课程
    public List<CourseSortTwo> getCourseSortTwosByCourseOneId(Integer courseSortOneId){
        List<CourseSortTwo> courseSortTwoAndCourse = courseSortTwoMapper.getCourseSortTwosByCourseOneId(courseSortOneId);
        return courseSortTwoAndCourse;
    }

    public CourseSortTwo getCourseSortTwoByCourseTwoId(Integer courseSortTwoId){
        return courseSortTwoMapper.getCourseSortTwoByCourseTwoId(courseSortTwoId);
    }

    //这个函数根据SortOneId获取其所有的二级子分类，包括课程
    public List<CourseSortTwo> getCourseSortTwoAndCourse(Integer courseSortOneId){
        List<CourseSortTwo> courseSortTwoAndCourse = courseSortTwoMapper.getCourseSortTwoByCourseSortOneId(courseSortOneId);
        return courseSortTwoAndCourse;
    }

}
