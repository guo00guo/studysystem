package com.xzc.model;

/**
 * Created by XIAORONG_YI on 2018/5/25.
 */
public class CourseDetail {

    private CourseSortOne courseSortOne;

    private CourseSortTwo courseSortTwo;

    private Course course;

    private User user;

    private int count;

    public CourseSortOne getCourseSortOne() {
        return courseSortOne;
    }

    public void setCourseSortOne(CourseSortOne courseSortOne) {
        this.courseSortOne = courseSortOne;
    }

    public CourseSortTwo getCourseSortTwo() {
        return courseSortTwo;
    }

    public void setCourseSortTwo(CourseSortTwo courseSortTwo) {
        this.courseSortTwo = courseSortTwo;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
