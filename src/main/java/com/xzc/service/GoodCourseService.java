package com.xzc.service;

import com.xzc.mapper.GoodCourseMapper;
import com.xzc.model.Course;
import com.xzc.model.GoodCourse;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/8.
 */
@Service
public class GoodCourseService {

    @Autowired
    GoodCourseMapper goodCourseMapper;

    //获取所有的一级分类及其以下的二级分类
    public List<GoodCourse> getAllCourse(){
        return goodCourseMapper.getAllCourse();
    }

    public List<GoodCourse> getAllGoodCourse(){
        return goodCourseMapper.getAllGoodCourse();
    }

    public List<Course> getAllGoodCourseIndex(){
        return goodCourseMapper.getAllGoodCourseIndex();
    }

    //删除
    public void deleteGoodCourseById(@Param("goodCourseId") Integer goodCourseId){  goodCourseMapper.deleteGoodCourseById(goodCourseId);}

    //增加
    public int addGoodCourse(GoodCourse goodCourse){return goodCourseMapper.insertGoodCourse(goodCourse);}
}
