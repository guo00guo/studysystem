package com.xzc.service.Cservice;

import com.xzc.mapper.CourseMapper;
import com.xzc.model.Course;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class CourseReleaseService {

    @Autowired
    CourseMapper courseMapper;

    public Integer noticeCourse(Integer teacherId, Integer courseId, String flag){
        return 0;
    }


}
