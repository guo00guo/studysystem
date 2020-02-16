package com.xzc.service;

import com.xzc.mapper.HotSerachMapper;
import com.xzc.model.TopSerach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Service
public class HotSerachService {

    @Autowired
    HotSerachMapper hotSerachMapper;

    //获取所有的一级分类及其以下的二级分类
    public List<TopSerach> getAllSerach(){
        return hotSerachMapper.getAllSerach();
    }
}
