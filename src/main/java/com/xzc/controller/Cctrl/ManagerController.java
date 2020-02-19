package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.service.Cservice.AccountService;
import com.xzc.service.StudentService;
import com.xzc.util.Result;
import com.xzc.util.UserCF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    AccountService managerService;

    @Autowired
    AccountService accountService;

    @Autowired
    UserCF userCF;

    @RequestMapping(value = "/updateManagerById", method = RequestMethod.POST)
    public Result updateUserById(User user, MultipartFile file) {
        System.out.println("AccountController.updateAccountById");
        System.out.println(user.toString());
        Integer i = managerService.updateUserById(user,file);

        if (i < 1) {
            return Result.error();
        }
        else{
            User newUser = managerService.selectUserById(user.getUserId());
            return Result.success(newUser);
        }
    }

    @RequestMapping(value = "/changeManagerPassWord")
    public Result changePassWord(Integer userId, String oldPassword, String newPassword) {
        System.out.println("ManagerController.changePassWord");
        Integer i = managerService.changePassWord(userId, oldPassword, newPassword);
        if (i < 1) {
            return Result.error(i, "原始密码输入不正确！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAllSelectAccountByUserId")
    public List<SelectCourse> getAllSelectAccountByUserId(Integer userId) {
        return managerService.getAllSelectCourseByUserId(userId);
    }

    //根据ManagerId获取可控账户
    @RequestMapping(value = "/getRecommendAccountByUserId")
    public ArrayList<Course> getRecommendAccountByUserId(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendAccounts = new ArrayList<Course>();
        for (Integer accountId:recommendResult) {
            System.out.println("AccountId = " + accountId);
            Course recommendAccount = accountService.getCourseAndUnitAndKPByCourseId(accountId);
            System.out.println("recommendAccount = " + recommendAccount.toString());
            recommendAccounts.add(recommendAccount);
        }
        System.out.println("recommendAccounts.size() = " + recommendAccounts.size());
        return recommendAccounts;
    }

    @RequestMapping(value = "/addAccountToSelectAccountByAccountId")
    public Result addAccountToSelectAccountByAccountId(Integer AccountId, Integer userId) {
        System.out.println("AccountId ==== userId      " + AccountId + "   " + userId);
        Integer i = managerService.addCourseToSelectCourseByCourseId(AccountId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectAccountByAccountIdAndUserId")
    public Result judgeSelectAccountByAccountIdAndUserId(Integer AccountId, Integer userId) {
        System.out.println("AccountId ==== userId      " + AccountId + "   " + userId);
        Integer i = managerService.judgeSelectCourseByCourseIdAndUserId(AccountId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAccountAndUnitAndKpAndReAccountByAccountId")
    public Result getAccountAndUnitAndKpAndReAccountByAccountId(Integer AccountId) {
        List<CourseUnit> unitList = managerService.getCourseAndUnitAndKpAndRecourseByCourseId(AccountId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByAccountKPId")
    public Result getResourceByAccountKPId(Integer AccountKPId) {
        List<Resource> resourceList = managerService.getResourceByCourseKPId(AccountKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }

    @RequestMapping(value = "/getAllSelectCourseByUserId")
    public List<SelectCourse> getAllSelectCourseByUserId(Integer userId) {
        return accountService.getAllSelectCourseByUserId(userId);
    }

    //根据studentId获取推荐课程
    @RequestMapping(value = "/getRecommendCourseByUserId")
    public ArrayList<Course> getRecommendCourseByUserId(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendCourses = new ArrayList<Course>();
        for (Integer courseId:recommendResult) {
            System.out.println("courseId = " + courseId);
            Course recommendCourse = accountService.getCourseAndUnitAndKPByCourseId(courseId);
            System.out.println("recommendCourse = " + recommendCourse.toString());
            recommendCourses.add(recommendCourse);
        }
        System.out.println("recommendCourses.size() = " + recommendCourses.size());
        return recommendCourses;
    }

    @RequestMapping(value = "/addCourseToSelectCourseByCourseId")
    public Result addCourseToSelectCourseByCourseId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = accountService.addCourseToSelectCourseByCourseId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectCourseByCourseIdAndUserId")
    public Result judgeSelectCourseByCourseIdAndUserId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = accountService.judgeSelectCourseByCourseIdAndUserId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getCourseAndUnitAndKpAndRecourseByCourseId")
    public Result getCourseAndUnitAndKpAndRecourseByCourseId(Integer courseId) {
        List<CourseUnit> unitList = accountService.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByCourseKPId")
    public Result getResourceByCourseKPId(Integer courseKPId) {
        List<Resource> resourceList = accountService.getResourceByCourseKPId(courseKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }

    @RequestMapping(value = "/updateManagerById/manage", method = RequestMethod.POST)
    public Result updateUserByIdWithManage(User user, MultipartFile file) {
        System.out.println("AccountController.updateAccountById");
        System.out.println(user.toString());
        Integer i = managerService.updateUserById(user,file);

        if (i < 1) {
            return Result.error();
        }
        else{
            User newUser = managerService.selectUserById(user.getUserId());
            return Result.success(newUser);
        }
    }

    @RequestMapping(value = "/changeManagerPassWord/manage")
    public Result changePassWordWithManage(Integer userId, String oldPassword, String newPassword) {
        System.out.println("ManagerController.changePassWord");
        Integer i = managerService.changePassWord(userId, oldPassword, newPassword);
        if (i < 1) {
            return Result.error(i, "原始密码输入不正确！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAllSelectAccountByUserId/manage")
    public List<SelectCourse> getAllSelectAccountByUserIdWithManage(Integer userId) {
        return managerService.getAllSelectCourseByUserId(userId);
    }

    //根据ManagerId获取可控账户
    @RequestMapping(value = "/getRecommendAccountByUserId/manage")
    public ArrayList<Course> getRecommendAccountByUserIdWithManage(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendAccounts = new ArrayList<Course>();
        for (Integer accountId:recommendResult) {
            System.out.println("AccountId = " + accountId);
            Course recommendAccount = accountService.getCourseAndUnitAndKPByCourseId(accountId);
            System.out.println("recommendAccount = " + recommendAccount.toString());
            recommendAccounts.add(recommendAccount);
        }
        System.out.println("recommendAccounts.size() = " + recommendAccounts.size());
        return recommendAccounts;
    }

    @RequestMapping(value = "/addAccountToSelectAccountByAccountId/manage")
    public Result addAccountToSelectAccountByAccountIdWithManage(Integer AccountId, Integer userId) {
        System.out.println("AccountId ==== userId      " + AccountId + "   " + userId);
        Integer i = managerService.addCourseToSelectCourseByCourseId(AccountId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectAccountByAccountIdAndUserId/manage")
    public Result judgeSelectAccountByAccountIdAndUserIdWithManage(Integer AccountId, Integer userId) {
        System.out.println("AccountId ==== userId      " + AccountId + "   " + userId);
        Integer i = managerService.judgeSelectCourseByCourseIdAndUserId(AccountId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAccountAndUnitAndKpAndReAccountByAccountId/manage")
    public Result getAccountAndUnitAndKpAndReAccountByAccountIdWithManage(Integer AccountId) {
        List<CourseUnit> unitList = managerService.getCourseAndUnitAndKpAndRecourseByCourseId(AccountId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByAccountKPId/manage")
    public Result getResourceByAccountKPIdWithManage(Integer AccountKPId) {
        List<Resource> resourceList = managerService.getResourceByCourseKPId(AccountKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }

    @RequestMapping(value = "/getAllSelectCourseByUserId/manage")
    public List<SelectCourse> getAllSelectCourseByUserIdWithManage(Integer userId) {
        return accountService.getAllSelectCourseByUserId(userId);
    }

    //根据studentId获取推荐课程
    @RequestMapping(value = "/getRecommendCourseByUserId/manage")
    public ArrayList<Course> getRecommendCourseByUserIdWithManage(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendCourses = new ArrayList<Course>();
        for (Integer courseId:recommendResult) {
            System.out.println("courseId = " + courseId);
            Course recommendCourse = accountService.getCourseAndUnitAndKPByCourseId(courseId);
            System.out.println("recommendCourse = " + recommendCourse.toString());
            recommendCourses.add(recommendCourse);
        }
        System.out.println("recommendCourses.size() = " + recommendCourses.size());
        return recommendCourses;
    }

    @RequestMapping(value = "/addCourseToSelectCourseByCourseId/manage")
    public Result addCourseToSelectCourseByCourseIdWithManage(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = accountService.addCourseToSelectCourseByCourseId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectCourseByCourseIdAndUserId/manage")
    public Result judgeSelectCourseByCourseIdAndUserIdWithManage(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = accountService.judgeSelectCourseByCourseIdAndUserId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getCourseAndUnitAndKpAndRecourseByCourseId/manage")
    public Result getCourseAndUnitAndKpAndRecourseByCourseIdWithManage(Integer courseId) {
        List<CourseUnit> unitList = accountService.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByCourseKPId/manage")
    public Result getResourceByCourseKPIdWithManage(Integer courseKPId) {
        List<Resource> resourceList = accountService.getResourceByCourseKPId(courseKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }
}
