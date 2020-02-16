package com.xzc.mapper;

import com.xzc.model.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface StudentMapper {

    @Select("select * from t_user where userId =#{userId}")
    User selectUserById(@Param("userId") Integer userId);

    @Update("update t_user set passWord =#{newPassword} where userId=#{userId} and passWord=#{oldPassword}")
    Integer changePassWord(@Param("userId") Integer userId, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword);

    @Update("update t_user set imageUrl=#{imageUrl},gender=#{gender},realName=#{realName},address=#{address} where userId=#{userId}")
    Integer updateUserByIdPic(User user);

    @Update("update t_user set gender=#{gender},realName=#{realName},address=#{address} where userId=#{userId}")
    Integer updateUserById(User user);

    @Select("select * from t_user where userId =#{userId} and passWord = #{passWord}")
    User getStudentByIdAndPwd(@Param("userId") Integer userId, @Param("passWord") String passWord);

    //根据studentID获取课程
    List<SelectCourse> getAllSelectCourseByUserId(@Param("userId") Integer userId);

    //根据studentId获取推荐课程
    @Select("select * from t_course where courseId in (select courseId from t_selectcourse where userId = #{userId})")
    List<Course> getRecommendCourseByUserId(@Param("userId") Integer userId);

    @Select("select * from t_selectcourse where courseId = #{courseId} and userId = #{userId}")
    SelectCourse findSelectCourseByCourseIdAndUserId(@Param("courseId") Integer courseId, @Param("userId") Integer userId);

    @Insert("insert into t_selectcourse(userId,courseId) values(#{userId},#{courseId})")
    Integer addCourseToSelectCourseByCourseId(@Param("courseId") Integer courseId, @Param("userId") Integer userId);


    List<CourseUnit> getCourseAndUnitAndKpAndRecourseByCourseId(Integer courseId);

    @Select("select * from t_resource where courseKPId = #{courseKPId}")
    List<Resource> getResourceByCourseKPId(@Param("courseKPId") Integer courseKPId);

    /**
     * 删除学习者通过id
     */
    void deleteStudentById(@Param("userId") Integer userId);

    /**
     * 通过userID查找学习者
     */
    Student selectStuByUserId(@Param("userId") Integer userId);
}
