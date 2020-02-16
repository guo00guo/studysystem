package com.xzc.mapper;

import com.xzc.model.CourseSortOne;
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
public interface CourseSortOneMapper {

    List<CourseSortOne> getAllCourseSort();

    List<CourseSortOne> getAllCourseSortOne();

    @Select("select * from t_coursesortone where courseSortOneId = #{courseSortOneId}")
    CourseSortOne getCourseSortOneByCourseOneId(@Param("courseSortOneId") Integer courseSortOneId);

    CourseSortOne selectByPrimaryKey(@Param("courseSortOneId") Integer courseSortOneId);

    List<CourseSortTwo> selectAllSortTwoBySortOneId(@Param("courseSortOneId") Integer courseSortOneId);

    //修改CourseSortOne信息
    int updateCourseSortOne(CourseSortOne courseSortOne);

    //增加一级分类
    int addCourseSortOne(CourseSortOne courseSortOne);

    //删除
    void deleteCourseSortOneById(@Param("courseSortOneId") Integer courseSortOneId);

    /**
     * 分页查找
     */
    List<CourseSortOne> seleteByPage(@Param("nowPage") Integer nowPage, @Param("pageSize") Integer pageSize);

    /**
     * 根据查询分页查找
     * @param
     * @return
     */
    List<CourseSortOne> selectByPageByName(@Param("nowPage") Integer nowPage, @Param("pageSize") Integer pageSize, @Param("queryName") String queryName);
    /**
     * 根据名称查找
     * @param
     * @return
     */
    List<CourseSortOne> selectByName(@Param("queryName")String queryName);

    /**
     * 总数
     */
    int count();
}
