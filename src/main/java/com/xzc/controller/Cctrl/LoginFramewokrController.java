package com.xzc.controller.Cctrl;

import com.xzc.model.User;
import com.xzc.service.UserService;
import com.xzc.util.Result;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;

@RestController
@RequestMapping("/login/frame")
public class LoginFramewokrController {

    @Autowired
    UserService userService;

    @RequestMapping("/register")
    public Result register(String realname, String password, String role) {
        System.out.println("UserController.register");
        System.out.println(realname + password + role);

        int code = userService.register(realname, password, role);
        System.out.println(code);

        if (code == 0) {
            return Result.error(0, "该用户名不可用!");
        }
        else if(code == -1){
            return Result.error(-1, "注册失败!");
        }
        else{
            return loginFrame(new Integer(code).toString(), password);
        }
    }

    @RequestMapping("/loginFrame")
    public Result loginFrame(String userName, String password) {
        UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
        Subject subject = SecurityUtils.getSubject();
        try {
            SecurityUtils.getSubject();
            subject.login(token);
            User user = (User) subject.getPrincipal();
            return Result.success(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Result.error();
    }

    @RequestMapping("/logout")
    public Result logout() {
        System.out.println("UserController.logout");
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            subject.logout();
        }
        return Result.success("退出");
    }
}
