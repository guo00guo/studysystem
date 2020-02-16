package com.xzc.mapper;

import com.xzc.model.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by XIAORONG_YI on 2018/5/11.
 */
@Mapper
@Repository
public interface CourseMapper {

    /**
     * 分页查询数据
     * @param
     * @return
     * @throws Exception
     */
    List<Course> getAllCourseWithPage(Map<String, Object> parmas);
    /**
      *
      * 分页统计数据
      * @param
      * @return
      * @throws Exception
      */
    int countCourse(Map<String, String> parmas);


    /**
     * 分页查询数据
     * @param
     * @return
     * @throws Exception
     */
    List<Course> getCourseByCourseTwoIdsWithPage(Map<String, Object> parmas);
    /**
     *
     * 分页统计数据
     * @param
     * @return
     * @throws Exception
     */
    int countCourseByCourseTwoIds(Map<String, Object> parmas);

    /**
     * 分页查询数据
     * @param
     * @return
     * @throws Exception
     */
    List<Course> getCourseByCourseTwoIdWithPage(Map<String, Object> parmas);
    /**
     *
     * 分页统计数据
     * @param
     * @return
     * @throws Exception
     */
    int countCourseByCourseTwoId(Map<String, Object> parmas);


    /**
     * @param
     * @return
     * @throws Exception
     */
    List<Course> getCourseByCourseName(String courseName);
    /**
     * @param
     * @return
     * @throws Exception
     */
    int countCourseByCourseName(String courseName);


    //curse_detail.html界面获取的信息
    Course getCourseAndUnitAndKPByCourseId(Integer courseId);


    @Select("select * from t_coursesorttwo where courseSortTwoId =#{courseSortTwoId}")
    CourseSortTwo getCourseSortTwoByCourseSortTwoId(@Param("courseSortTwoId") Integer courseSortTwoId);

    @Select("select * from t_coursesortone where courseSortOneId =#{courseSortOneId}")
    CourseSortOne getCourseSortOneByCourseSortOneId(@Param("courseSortOneId") Integer courseSortOneId);

    @Select("select * from t_user where userId = #{userId}")
    User getTeacherInfoByUserId(@Param("userId") Integer userId);

    @Select("SELECT * FROM t_user where userId IN (SELECT userId FROM t_teacher where teacherId IN (SELECT teacherId FROM `t_teachercourse` where courseId =  #{courseId}))")
    User getTeacherInfoByCourseId(@Param("courseId") Integer courseId);

    //根据用户ID获取推荐课程
    List<Course> getCourseByUserId(@Param("userId") Integer userId);

    @Select("select count(*) from t_selectcourse where courseId = #{courseId}")
    int countStudentsByCourseId(@Param("courseId") Integer courseId);

    @Select("select * from t_selectcourse where courseId = #{courseId}")
    List<SelectCourse>getSelectCourseByCourseID(@Param("courseId") Integer courseId);


}
