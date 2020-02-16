package com.xzc.model;

import java.util.List;

public class CourseKp {
    private Integer courseKPId;

    private Integer courseUnitId;

    private String courseKPName;

    private String courseKPLocation;

    public Integer getCourseKPId() {
        return courseKPId;
    }

    public void setCourseKPId(Integer courseKPId) {
        this.courseKPId = courseKPId;
    }

    public Integer getCourseUnitId() {
        return courseUnitId;
    }

    public void setCourseUnitId(Integer courseUnitId) {
        this.courseUnitId = courseUnitId;
    }

    public String getCourseKPName() {
        return courseKPName;
    }

    public void setCourseKPName(String courseKPName) {
        this.courseKPName = courseKPName == null ? null : courseKPName.trim();
    }

    public String getCourseKPLocation() {
        return courseKPLocation;
    }

    public void setCourseKPLocation(String courseKPLocation) {
        this.courseKPLocation = courseKPLocation;
    }
}