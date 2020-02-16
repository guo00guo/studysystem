package com.xzc.mapper;

import com.xzc.model.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Mapper
@Repository
public interface TeacherMapper {

    //根据studentID获取课程
    List<Course> getOpenCourseByUserId(@Param("userId") Integer userId);

    //根据studentID获取课程
    List<Course> getCloseCourseByUserId(@Param("userId") Integer userId);

    //根据courseId获取学习者
    @Select("select * from t_user where userId IN (select userId from t_selectcourse where courseId = #{courseId})")
    ArrayList<User> getStudentByCourseId(Integer courseId);

    @Select("select * from t_user where userId =#{userId}")
    User selectUserById(@Param("userId") Integer userId);

    @Update("update t_user set passWord =#{newPassword} where userId=#{userId} and passWord=#{oldPassword}")
    Integer changePassWord(@Param("userId") Integer userId, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword);

    @Update("update t_user set imageUrl=#{imageUrl},gender=#{gender},realName=#{realName},description=#{description} where userId=#{userId}")
    Integer updateUserByIdPic(User user);

//    @Update("insert into t_course (courseName, courseSortTwoId, imageUrl, description, flag) values(#{courseName}, #{courseSortTwoId}, #{imageUrl}, #{description}, 'no')")
    Integer addNewCoursePic(Course course);

//    @Update("insert into t_course (courseName, courseSortTwoId, description, flag) values(#{courseName}, #{courseSortTwoId}, #{description}, 'no')")
    Integer addNewCourse(Course course);

    Integer addCourseUnit(CourseUnit courseUnit);

    Integer addCourseKP(CourseKp courseKp);

    @Update("update t_teachercourse set flag = 'yes' where courseId=#{courseId}")
    Integer changeCourseStatus(Integer courseId);

    @Update("update t_course set flag = 'yes' where courseId=#{courseId}")
    Integer changeCourseStatusTCourse(Integer courseId);

    @Update("insert into t_teachercourse(teacherId,courseId,flag) values(#{teacherId}, #{courseId}, #{flag})")
    Integer addTeacherCourse(@Param("teacherId") Integer teacherId, @Param("courseId") Integer courseId,@Param("flag")  String flag);

    @Update("update t_user set gender=#{gender},realName=#{realName},description=#{description} where userId=#{userId}")
    Integer updateUserById(User user);

    @Select("select * from t_user where userId =#{userId} and passWord = #{passWord}")
    User getStudentByIdAndPwd(@Param("userId") Integer userId, @Param("passWord") String passWord);

    @Select("select * from t_user u,`t_teacher` t where u.userId = t.userId")
    List<User> selectAllTeacher();

    /**
     * 删除教师通过id
     */
    void deleteTeacherByUserId(@Param("userId") Integer userId);

    /**
     * 通过userID查找教师
     */
    Teacher selectTeByUserId(@Param("userId") Integer userId);

    /**
     * 分页查找所有教师
     */
    List<Teacher> selectAllTeacherByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize);

    /**
     * 分页查找教师BY用户名
     */
    List<Teacher> selectTeacherByPageByName(@Param("currentPage") Integer currentPage,
                                            @Param("pageSize") Integer pageSize, @Param("userName") String userName);

    /**
     * 查找所有教师BY用户名
     */
    List<Teacher> selectTeacherByName(@Param("userName") String userName);
}
