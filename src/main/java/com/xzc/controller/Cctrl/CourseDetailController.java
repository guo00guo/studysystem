package com.xzc.controller.Cctrl;

import com.xzc.model.CourseSortTwo;
import com.xzc.service.CourseSortTwoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Sunjh
 */
@RestController
@RequestMapping("/course/detail/")
public class CourseDetailController {

    @Autowired
    CourseSortTwoService courseSortTwoService;

    /**
     * 根据SortOneId获取其所有的二级子分类
     *
     * @param courseSortOneId id
     * @return 二级子分类，包括课程
     */
    @RequestMapping("/getCourseSortTwosByCourseOneId")
    public List<CourseSortTwo> getCourseSortTwoAndCourse(Integer courseSortOneId) {
        System.out.println("CourseSortTwo.getCourseSortTwosByCourseOneId");
        System.out.println(courseSortOneId);
        return courseSortTwoService.getCourseSortTwosByCourseOneId(courseSortOneId);
    }

    /**
     * 获取所有一级分类
     *
     * @param courseSortTwoId id
     * @return 所有一级分类
     */
    @RequestMapping("/getCourseSortTwoByCourseTwoId")
    public CourseSortTwo getCourseSortTwoByCourseTwoId(Integer courseSortTwoId) {
        System.out.println("CourseSortTwo.getCourseSortTwoByCourseTwoId      " + courseSortTwoId);

        CourseSortTwo courseTwo = courseSortTwoService.getCourseSortTwoByCourseTwoId(courseSortTwoId);
        System.out.println(courseTwo.getCourseSortTwoName());

        return courseTwo;
    }

}
