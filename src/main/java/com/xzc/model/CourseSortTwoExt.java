package com.xzc.model;

/**
 * Created by 郭超 on 2018/5/19.
 */
public class CourseSortTwoExt extends CourseSortTwo {
    //课程一级分类信息
    private CourseSortOne courseSortOne;

    public CourseSortOne getCourseSortOne() {
        return courseSortOne;
    }

    public void setCourseSortOne(CourseSortOne courseSortOne) {
        this.courseSortOne = courseSortOne;
    }
}
