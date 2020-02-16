package com.xzc.mapper;

import com.xzc.model.Admin;
import com.xzc.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * Created by 郭超 on 2018/6/5.
 */
@Mapper
@Repository
public interface AdminInforMapper {
    /**
     * 根据ID查找管理员
     */
    Admin selectAdminById(Integer userId);
    /**
     * 修改管理员信息
     * @param user
     */
    int updateAdminByUser(User user);
}
