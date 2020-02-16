package com.xzc.controller;

import com.xzc.model.TopSerach;
import com.xzc.service.HotSerachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@RestController
@RequestMapping("/topserach")
public class HotSerachController {

    @Autowired
    HotSerachService hotSerachService;

    //这个函数获取所有轮播课程
    @RequestMapping("/getAllSerach")
    public List<TopSerach> getAllCourse() {
        return hotSerachService.getAllSerach();
    }
}
