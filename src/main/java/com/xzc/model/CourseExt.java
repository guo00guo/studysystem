package com.xzc.model;

/**
 * 课程、老师两张表的联合查询
 */
public class CourseExt extends Course {

    //教师信息
    private Teacher teacher;

    //精选课程信息
//    private GoodCourse goodCourse;

    //课程二级分类信息
    private CourseSortTwoExt courseSortTwoExt;

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public CourseSortTwoExt getCourseSortTwoExt() {
        return courseSortTwoExt;
    }

    public void setCourseSortTwoExt(CourseSortTwoExt courseSortTwoExt) {
        this.courseSortTwoExt = courseSortTwoExt;
    }
}
