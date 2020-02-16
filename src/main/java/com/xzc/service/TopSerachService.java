package com.xzc.service;

import com.xzc.mapper.TopSerachMapper;
import com.xzc.model.TopSerach;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 郭超 on 2018/5/20.
 */
@Service
public class TopSerachService {
    @Autowired
    TopSerachMapper topSerachMapper;

    public List<TopSerach> findAllTopSerach(){
        return topSerachMapper.findAllTopSerach();
    }

    public List<TopSerach> findAllTopSerachByPage(Integer currentPage, Integer pageSize){
        Integer nowPage = (currentPage-1) * pageSize;
        return topSerachMapper.seleteTopSerachByPage(nowPage,pageSize);}

    public List<TopSerach> findTopSerachByPageByName(Integer currentPage, Integer pageSize, String topSerachName){
        Integer nowPage = (currentPage-1) * pageSize;
        return topSerachMapper.selectByPageByName(nowPage,pageSize,topSerachName);
    }

    public Integer topSerachCount(){return topSerachMapper.count();}

    public TopSerach findTopSerachById(Integer id){
        return topSerachMapper.findTopSerachById(id);
    }

    public int updateTopSerach(TopSerach topSerach){
        return topSerachMapper.updateTopSerach(topSerach);
    }

    public int deleteTopSerachById(Integer id){
        return topSerachMapper.deleteTopSerachById(id);
    }

    public int addTopSerach(TopSerach topSerach){
        return topSerachMapper.insertTopSerach(topSerach);
    }

    public List<TopSerach> findTopSerachByName(@Param("topSerachName") String topSerachName){
        return topSerachMapper.selectByName(topSerachName);
    }
}
