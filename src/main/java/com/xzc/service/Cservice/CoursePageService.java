package com.xzc.service.Cservice;

import com.xzc.mapper.CourseSortOneMapper;
import com.xzc.model.CourseSortOne;
import com.xzc.model.CourseSortTwo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XIAORONG_YI on 2018/5/8.
 */
@Service
public class CoursePageService {

    @Autowired
    CourseSortOneMapper courseSortOneMapper;

    //获取所有的一级分类及其以下的二级分类
    public List<CourseSortOne> getAllCourseSort(){
        return courseSortOneMapper.getAllCourseSort();
    }

    //获取所有的一级分类
    public List<CourseSortOne> getAllCourseSortOne(){
        return courseSortOneMapper.getAllCourseSortOne();
    }

    public CourseSortOne getCourseSortOneByCourseOneId(Integer courseOneId){
        return courseSortOneMapper.getCourseSortOneByCourseOneId(courseOneId);
    }

    public CourseSortOne findById(Integer id){return courseSortOneMapper.selectByPrimaryKey(id);}

    public List<CourseSortTwo> findSortTwoBySortOneId(Integer courseOneId){return courseSortOneMapper.selectAllSortTwoBySortOneId(courseOneId);}

    //修改CourseSortOne
    public int editCourseSortOne(CourseSortOne courseSortOne){return courseSortOneMapper.updateCourseSortOne(courseSortOne);}

    //增加
    public int addCourseSortOne(CourseSortOne courseSortOne){return courseSortOneMapper.addCourseSortOne(courseSortOne);}

    //删除
    public void deleteCourseSortOneById(Integer courseOneId){courseSortOneMapper.deleteCourseSortOneById(courseOneId);}

    //分页查看
    public List<CourseSortOne> findAllByPage(Integer currentPage, Integer pageSize){
        Integer nowPage = (currentPage-1) * pageSize;
        return courseSortOneMapper.seleteByPage(nowPage,pageSize);}

    //查询分页查看
    public List<CourseSortOne> findByPageByName(Integer currentPage, Integer pageSize,@Param("queryName") String queryName){
        Integer nowPage = (currentPage-1) * pageSize;
        return courseSortOneMapper.selectByPageByName(nowPage,pageSize,queryName);
    }

    //根据name查询所有
    public List<CourseSortOne> findByName(@Param("queryName")String queryName){return courseSortOneMapper.selectByName(queryName);}

    //查出总数
    public int count(){return courseSortOneMapper.count();}
}
