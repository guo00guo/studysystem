package com.xzc.mapper;

import com.xzc.model.RollCourse;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Mapper
@Repository
public interface RollCourseMapper {

    //获取所有轮播课程
    List<RollCourse> getAllCourse();

    /**
     *获取所有轮播课程（包含课程名），连接了Course表
     * @param
     */
    List<RollCourse> getAllRollCourse();

    /**
     *  //通过id删除轮播课程
     * @param rollCourseId
     */
    int deleteRollCourseById(Integer rollCourseId);

    /**
     * 增加轮播课程
     */
    int insertRollCourse(RollCourse rollCourse);
}
