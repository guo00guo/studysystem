package com.xzc.mapper;

import com.xzc.model.TopSerach;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 郭超 on 2018/5/20.
 */
@Mapper
@Repository
public interface TopSerachMapper {
    /**
     * 查出所有热搜
     * @return
     */
    List<TopSerach> findAllTopSerach();

    /**
     * 分页查找
     */
    List<TopSerach> seleteTopSerachByPage(@Param("nowPage") Integer nowPage, @Param("pageSize") Integer pageSize);

    /**
     * 查看数量
     * @return
     */
    Integer count();

    /**
     *
     * @param id
     * @return
     */
    /*根据ID查找热搜*/
    TopSerach findTopSerachById(Integer id);

    /*根据ID修改热搜*/
    int updateTopSerach(TopSerach topSerach);

    //根据ID删除热搜
    int deleteTopSerachById(Integer id);

    //增加热搜
    int insertTopSerach(TopSerach topSerach);

    //根据热搜名查找
    List<TopSerach> selectByName(@Param("topSerachName") String topSerachName);

    /**
     * 根据热搜名分页查找
     * @param topSerachName
     * @return
     */
    List<TopSerach> selectByPageByName(@Param("nowPage") Integer nowPage, @Param("pageSize") Integer pageSize, @Param("topSerachName") String topSerachName);


}
