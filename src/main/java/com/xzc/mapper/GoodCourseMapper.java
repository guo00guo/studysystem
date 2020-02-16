package com.xzc.mapper;

import com.xzc.model.Course;
import com.xzc.model.GoodCourse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Mapper
@Repository
public interface GoodCourseMapper {

    //获取所有精品课程
    List<GoodCourse> getAllCourse();

    List<GoodCourse> getAllGoodCourse();

    @Select("select * from t_goodcourse g,t_course c where g.courseId = c.courseId")
    List<Course> getAllGoodCourseIndex();

    //删除精品课程
    void deleteGoodCourseById(@Param("goodCourseId") Integer goodCourseId);

    //添加
    int insertGoodCourse(GoodCourse goodCourse);
}
