package com.xzc.model;

public class RollCourse extends Course{
    private Integer rollCourseId;

    private Integer courseId;

    private String imageUrl;

    public Integer getRollCourseId() {
        return rollCourseId;
    }

    public void setRollCourseId(Integer rollCourseId) {
        this.rollCourseId = rollCourseId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? null : imageUrl.trim();
    }
}