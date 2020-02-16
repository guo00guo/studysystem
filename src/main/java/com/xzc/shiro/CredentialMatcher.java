package com.xzc.shiro;

import com.xzc.util.SUtil;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

public class CredentialMatcher extends SimpleCredentialsMatcher {

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        System.out.println("CredentialMatcher.doCredentialsMatch");
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        String password = new String(usernamePasswordToken.getPassword());//用户填写
        String dbPassword = (String) info.getCredentials();//数据库
        System.out.println(password + SUtil.encode(password) + dbPassword);
        return this.equals(SUtil.encode(password), dbPassword);
    }
}
