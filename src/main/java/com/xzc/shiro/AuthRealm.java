package com.xzc.shiro;

import com.xzc.model.User;
import com.xzc.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class AuthRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    // 授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        System.out.println("AuthRealm.doGetAuthorizationInfo");
        User user = (User) principals.fromRealm(this.getClass().getName()).iterator().next();
        List<String> roleNameList = new ArrayList<String>();
        roleNameList.add(user.getRole());
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addRoles(roleNameList);
        return info;
    }

    // 认证登录
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        System.out.println("AuthRealm.doGetAuthenticationInfo");
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        String username = usernamePasswordToken.getUsername();
        User user = userService.selectUserByName(username);
        System.out.println(user);
        return new SimpleAuthenticationInfo(user, user.getPassWord(), this.getClass().getName());
    }
}
