package com.xzc.mapper;

import com.xzc.model.CourseSortTwo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/8.
 */
@Mapper
@Repository
public interface CourseSortTwoMapper {

    List<CourseSortTwo> getCourseSortTwosByCourseOneId(@Param("courseSortOneId") Integer courseSortOneId);

    @Select("select * from t_coursesorttwo where courseSortTwoId = #{courseSortTwoId}")
    CourseSortTwo getCourseSortTwoByCourseTwoId(@Param("courseSortTwoId") Integer courseSortTwoId);

    List<CourseSortTwo> getCourseSortTwoByCourseSortOneId(@Param("courseSortOneId") Integer courseSortOneId);
}
