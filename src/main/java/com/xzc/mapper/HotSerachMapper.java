package com.xzc.mapper;

import com.xzc.model.TopSerach;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/9.
 */
@Mapper
@Repository
public interface HotSerachMapper {

    //获取所有轮播课程
    @Select("select * from t_topserach")
    List<TopSerach> getAllSerach();
}
