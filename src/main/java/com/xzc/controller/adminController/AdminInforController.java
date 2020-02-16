package com.xzc.controller.adminController;

import com.xzc.model.User;
import com.xzc.service.AdminInforService;
import com.xzc.service.UserService;
import com.xzc.util.Result;
import com.xzc.util.SUtil;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by 郭超 on 2018/6/5.
 */
@Controller
public class AdminInforController {

    @Autowired
    AdminInforService adminInforService;
    @Autowired
    UserService userService;

    @GetMapping("/toAdminIndexPage")
    public String toAdminIndexPage(){
        System.out.println("toAdminIndexPage");
        return "admin_index";
    }

    //到个人信息界面
    @GetMapping("/adminInforPage/{username}")
    public String adminInforPage(Model model, @PathVariable("username") String username){
        User user = userService.selectUserByName(username);
        model.addAttribute("admin",user);
        System.out.println("getImageUrl   "  + user.getImageUrl());
//        System.out.println(user);
        return "admin_admin_inforEdit";
    }

    //修改个人信息
    @PostMapping("/adminEditInfor")
    public String adminEditInfor(User user){
//        System.out.println("befor  ImageUrl   "  + user.getImageUrl() + "id   "  + user.getUserId());
//        Integer i = userService.updateUserById(user,file);
        int i = adminInforService.editAdminByUser(user);
//        System.out.println("sssssgetImageUrl   "  + user.getImageUrl());
        return "redirect:/adminInforPage";
    }

    //到修改密码界面
    @GetMapping("/adminChangePwdPage/{username}")
    public String adminChangePwdPage(Model model, @PathVariable("username") String username){
        model.addAttribute("username",username);
        return "admin_admin_changePassword";
    }

    //修改密码
    @PostMapping("/adminChangePwd/{username}")
    public String adminChangePwd(@PathVariable("username") String username,@Param("oldPassword") String oldPassword,@Param("newPassword") String newPassword ){
//        System.out.println(username+ "        " +oldPassword + "        " +newPassword );
        oldPassword = SUtil.encode(oldPassword);
        newPassword = SUtil.encode(newPassword);
        int i = userService.changePassWordByUserName(username, oldPassword, newPassword);
//        System.out.println("修改密码  " + i);
        return "admin_index";
    }

    //核对密码
    @ResponseBody
    @GetMapping("/ajaxCheckPassword/{username}/{oldPassword}")
    public Boolean ajaxCheckPassword(@PathVariable("username") String username,@PathVariable("oldPassword") String oldPassword){
        User user = userService.selectUserByName(username);
        String password = user.getPassWord();
//        System.out.println("数据库中的oldpassword  " + password);
        oldPassword = SUtil.encode(oldPassword);
//        System.out.println("输入的MD5password  " + oldPassword);
        if(password.equals(oldPassword)){
            return true;
        }else {
            return false;
        }
    }

    @GetMapping("/adminLogout")
    public String adminLogout() {
        System.out.println("UserController.logout");
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            subject.logout();
        }
        Result.success("退出");
        return "index.html";
    }

}
