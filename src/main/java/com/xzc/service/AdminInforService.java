package com.xzc.service;

import com.xzc.mapper.AdminInforMapper;
import com.xzc.model.Admin;
import com.xzc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 郭超 on 2018/6/5.
 */
@Service
public class AdminInforService {

    @Autowired
    AdminInforMapper adminInforMapper;

    /**
     * 根据ID查找管理员
     * @param userId
     */
    public Admin findAdminByID(Integer userId){return adminInforMapper.selectAdminById(userId);}
    /**
     * 修改管理员信息
     * @param user
     */
    public int editAdminByUser(User user){return adminInforMapper.updateAdminByUser(user);}
}
