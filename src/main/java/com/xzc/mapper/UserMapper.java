package com.xzc.mapper;

import com.xzc.model.Student;
import com.xzc.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserMapper {

    @Select("select * from t_user where realName =#{realname}")
    User matchUserByRealName(@Param("realname") String realname);

    @Select("select * from t_user where userName =#{userName}")
    User selectUserByName(@Param("userName") String userName);

    @Select("select * from t_user where userId =#{userId}")
    User selectUserById(@Param("userId") Integer userId);

    @Select("select MAX(userName) from t_user where role =#{role}")
    String findUserName(String role);

    @Update("update t_user set passWord =#{newPassword} where userId=#{userId} and passWord=#{oldPassword}")
    Integer changePassWord(@Param("userId") String userId, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword);

    @Update("update t_user set imageUrl=#{imageUrl},gender=#{gender},realName=#{realName},address=#{address} where userId=#{userId}")
    Integer updateUserByIdPic(User user);

    @Update("update t_user set gender=#{gender},realName=#{realName},address=#{address} where userId=#{userId}")
    Integer updateUserById(User user);

    @Select("select * from t_user where userName like '%${userName}%'")
    List<User> selectUsersByName(@Param("userName") String userName);

    @Insert("insert into t_user(userName,passWord,role,realName) values(#{userName},#{password},#{role},#{realname})")
    Integer register(@Param("userName") String userName, @Param("password") String password, @Param("role") String role, @Param("realname") String realname);

    @Select("select * from t_user u,`t_student` s where u.userId = s.userId")
    List<User> selectAllUser();

    /**
     * 分页查找所有学习者
     */
    List<Student> selectAllStudentByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize);

    /**
     * 分页查找学习者BY用户名
     */
    List<Student> selectStudentByPageByName(@Param("currentPage") Integer currentPage,
                                            @Param("pageSize") Integer pageSize, @Param("userName") String userName);

    /**
     * 查找所有学习者BY用户名
     */
    List<Student> selectStudentByName(@Param("userName") String userName);

    /**
     * 删除学习者通过id
     */
    void deleteStudentByUserId(Integer userId);

    /**
     * 新加
     */
    @Update("update t_user set passWord =#{newPassword} where userName=#{userName} and passWord=#{oldPassword}")
    int changePassWordByUserName(@Param("userName") String userName, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword);

    /**
     * 插入图片
     */
    @Update("update t_user set imageUrl=#{imageUrl},gender=#{gender},realName=#{realName},address = #{address},description=#{description} where userName=#{userName}")
    Integer updateUserByUserNamePic(User user);
}
