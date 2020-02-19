package com.xzc.service.Cservice;

import com.xzc.mapper.CourseMapper;
import com.xzc.mapper.StudentMapper;
import com.xzc.model.*;
import com.xzc.util.LoadFile;
import com.xzc.util.SUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Service
public class AccountService {

    @Autowired
    StudentMapper studentMapper;
    CourseMapper accountMapper;

    public List<SelectCourse> getAllSelectCourseByUserId(Integer userId) {
        return studentMapper.getAllSelectCourseByUserId(userId);
    }
    public Course getCourseAndUnitAndKPByCourseId(Integer accountId) {
        return studentMapper.getRecommendCourseByUserId(accountId).get(0);
    }
    public List<Course> getRecommendCourseByUserId(Integer userId) {
        return studentMapper.getRecommendCourseByUserId(userId);
    }

    public Integer addCourseToSelectCourseByCourseId(Integer courseId, Integer userId) {
        //已存在
        SelectCourse selectCourse = studentMapper.findSelectCourseByCourseIdAndUserId(courseId, userId);
        if(selectCourse != null){
            return -1;
        }

        return studentMapper.addCourseToSelectCourseByCourseId(courseId, userId);
    }

    public Integer judgeSelectCourseByCourseIdAndUserId(Integer courseId, Integer userId) {
        //已存在
        SelectCourse selectCourse = studentMapper.findSelectCourseByCourseIdAndUserId(courseId, userId);

        if(selectCourse != null){
            return 1;
        }
        else {
            return -1;
        }
    }

    public List<CourseUnit> getCourseAndUnitAndKpAndRecourseByCourseId(Integer courseId) {
        return studentMapper.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);
    }

    public List<Resource> getResourceByCourseKPId(Integer courseKPId) {
        return studentMapper.getResourceByCourseKPId(courseKPId);
    }

    /**
     * 删除学习者通过id
     */
    public void deleteStudentByUserId(Integer userId){studentMapper.deleteStudentById(userId);}
    /**
     * 通过userID查找学习者
     */
    public Student selectStuByUserId(Integer userId){return studentMapper.selectStuByUserId(userId);}

    public List<Course> getAllCourseWithPage(Map<String,Object> pageInfo){
        return accountMapper.getAllCourseWithPage(pageInfo);
    }

    public Integer countCourse(Map<String, String> parmas){
        return accountMapper.countCourse(parmas);
    }

    public Integer changePassWord(Integer userId, String passWord, String newPassword) {
        passWord = SUtil.encode(passWord);
        newPassword = SUtil.encode(newPassword);

        //原始密码输入错误
        User user = studentMapper.getStudentByIdAndPwd(userId, passWord);
        if(user == null){
            System.out.println("原始密码输入不正确！");
            return -10;
        }

        return studentMapper.changePassWord(userId, passWord, newPassword);
    }

    public Integer updateUserById(User user, MultipartFile file) {
        if (LoadFile.isAllow(file, LoadFile.allowPhoto)) {
            String imageUrl = LoadFile.upLoad(LoadFile.imagePath, file);
            if (imageUrl != null) {
                user.setImageUrl(imageUrl);
                return studentMapper.updateUserByIdPic(user);
            }
        }
        return studentMapper.updateUserById(user);
    }

    public User selectUserById(Integer userId) {
        System.out.println("UserService.selectUserByuserId");
        return studentMapper.selectUserById(userId);
    }
}
