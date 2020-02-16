package com.xzc.model;

import java.util.List;

public class CourseSortTwo {
    private Integer courseSortTwoId;

    private String courseSortTwoName;

    private Integer courseSortOneId;

    private List<Course> courseList;

    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    public Integer getCourseSortTwoId() {
        return courseSortTwoId;
    }

    public void setCourseSortTwoId(Integer courseSortTwoId) {
        this.courseSortTwoId = courseSortTwoId;
    }

    public String getCourseSortTwoName() {
        return courseSortTwoName;
    }

    public void setCourseSortTwoName(String courseSortTwoName) {
        this.courseSortTwoName = courseSortTwoName == null ? null : courseSortTwoName.trim();
    }

    public Integer getCourseSortOneId() {
        return courseSortOneId;
    }

    public void setCourseSortOneId(Integer courseSortOneId) {
        this.courseSortOneId = courseSortOneId;
    }

    @Override
    public String toString() {
        return "CourseSortTwo{" +
                "courseSortTwoId=" + courseSortTwoId +
                ", courseSortTwoName='" + courseSortTwoName + '\'' +
                ", courseSortOneId=" + courseSortOneId +
                ", courseList=" + courseList +
                '}';
    }
}