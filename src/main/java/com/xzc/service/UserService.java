package com.xzc.service;

import com.xzc.mapper.UserMapper;
import com.xzc.model.Student;
import com.xzc.model.User;
import com.xzc.util.LoadFile;
import com.xzc.util.SUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    public Integer register(String realname, String password, String role) {
        System.out.println("UserService.register");
        System.out.println(realname + password + role);

        //用户名已被注册
        if (userMapper.matchUserByRealName(realname) != null) {
            return 0;
        }
        String maxusername = userMapper.findUserName(role);
        Integer intregusername = Integer.valueOf(maxusername) + 1;
        String userName = intregusername.toString();

        password = SUtil.encode(password);
        System.out.println(realname + password);

        if(userMapper.register(userName, password, role, realname) == 1){
            return intregusername;
        }
        else{
            return -1;
        }
    }

    public User selectUserByName(String userName) {
        System.out.println("UserService.selectUserByName");
        System.out.println(userMapper.selectUsersByName(userName).size());

        return userMapper.selectUserByName(userName);
    }

    public List<User> findAllUser(){return userMapper.selectAllUser();}

    /**
     * 分页查找所有学习者
     */
    public List<Student> findAllStudentByPage(@Param("currentPage") Integer currentPage, @Param("pageSize") Integer pageSize){
        currentPage = (currentPage-1)*pageSize;
        return userMapper.selectAllStudentByPage(currentPage,pageSize);
    }
    /**
     * 分页查找学习者BY用户名
     */
    public List<Student> findStudentByPageByName(@Param("currentPage") Integer currentPage,
                                                 @Param("pageSize") Integer pageSize, @Param("userName") String userName){
        currentPage = (currentPage-1)*pageSize;
        return userMapper.selectStudentByPageByName(currentPage,pageSize,userName);
    }

    /**
     * 查找所有学习者BY用户名
     */
    public List<Student> findStudentByName(@Param("userName") String userName){
        return userMapper.selectStudentByName(userName);
    }
    /**
     * 删除学习者通过ID
     */
    public void deleteStudentByUserId(Integer userId){userMapper.deleteStudentByUserId(userId);}

    /**
     * 新加
     */
    public int changePassWord(@Param("userId") String userId, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword){
        return userMapper.changePassWord(userId,oldPassword,newPassword);
    }

    public int changePassWordByUserName(@Param("userName") String userName, @Param("oldPassword") String oldPassword, @Param("newPassword") String newPassword){
        return userMapper.changePassWordByUserName(userName,oldPassword,newPassword);
    }

    /**
     * 插入图片路径
     * @param user
     * @param file
     * @return
     */
    public Integer updateUserById(User user, MultipartFile file) {
        if (LoadFile.isAllow(file, LoadFile.allowPhoto)) {
            String string = LoadFile.upLoad(LoadFile.imagePath, file);
            if (string != null) {
                user.setImageUrl(string);
                System.out.println("img url" + user.getImageUrl());
                return userMapper.updateUserByUserNamePic(user);
            }
        }
        return userMapper.updateUserById(user);
    }
}
