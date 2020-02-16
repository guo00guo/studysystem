package com.xzc.service;

import com.xzc.mapper.RollCourseMapper;
import com.xzc.model.RollCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Service
public class RollCourseService {

    @Autowired
    RollCourseMapper rollCourseMapper;

    //获取所有的一级分类及其以下的二级分类
    public List<RollCourse> getAllCourse(){
        return rollCourseMapper.getAllCourse();
    }

    /**
     *获取所有轮播课程（包含课程名），连接了Course表
     * @param
     */
    public List<RollCourse> getAllRollCourse(){
        return rollCourseMapper.getAllRollCourse();
    }

    /**
     * 通过id删除轮播课程
     * @param rollCourseId
     */
    public int deleteRollCourseById(Integer rollCourseId){return rollCourseMapper.deleteRollCourseById(rollCourseId);}

    /**
     * 增加轮播课程
     */
    public int addrollCourse(RollCourse rollCourse){return rollCourseMapper.insertRollCourse(rollCourse);}
}
