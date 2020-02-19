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
    StudentService managerService;

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

}
