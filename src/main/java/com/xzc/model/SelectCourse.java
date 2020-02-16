package com.xzc.model;

import java.sql.Timestamp;
import java.util.List;

public class SelectCourse {
    private Integer selectCourseId;

    private Integer userId;

    private Integer courseId;

    private Timestamp joinTime;

    private List<Course> courseList;

    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    public Integer getSelectCourseId() {
        return selectCourseId;
    }

    public void setSelectCourseId(Integer selectCourseId) {
        this.selectCourseId = selectCourseId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Timestamp getJoinTime() {
        return joinTime;
    }

    public void setJoinTime(Timestamp joinTime) {
        this.joinTime = joinTime;
    }
}