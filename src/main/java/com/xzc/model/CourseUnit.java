package com.xzc.model;

import java.util.List;

public class CourseUnit {
    private Integer courseUnitId;

    private Integer courseId;

    private String courseUnitName;

    private List<CourseKp> courseKpList;

    public List<CourseKp> getCourseKpList() {
        return courseKpList;
    }

    public void setCourseKpList(List<CourseKp> courseKpList) {
        this.courseKpList = courseKpList;
    }

    public Integer getCourseUnitId() {
        return courseUnitId;
    }

    public void setCourseUnitId(Integer courseUnitId) {
        this.courseUnitId = courseUnitId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseUnitName() {
        return courseUnitName;
    }

    public void setCourseUnitName(String courseUnitName) {
        this.courseUnitName = courseUnitName == null ? null : courseUnitName.trim();
    }
}