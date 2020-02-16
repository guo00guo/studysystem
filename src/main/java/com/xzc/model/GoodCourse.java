package com.xzc.model;

public class GoodCourse extends  Course{
    private Integer goodCourseId;

    private Integer courseId;

    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getGoodCourseId() {
        return goodCourseId;
    }

    public void setGoodCourseId(Integer goodCourseId) {
        this.goodCourseId = goodCourseId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
}