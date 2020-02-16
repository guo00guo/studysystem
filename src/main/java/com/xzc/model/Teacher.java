package com.xzc.model;

import cn.afterturn.easypoi.excel.annotation.Excel;

public class Teacher extends User{
    @Excel(name="教师ID",orderNum = "0")
    private Integer teacherId;

    @Excel(name="用户ID",orderNum = "1")
    private Integer userId;

    @Excel(name="真实名",orderNum = "2")
    private String teacherRealName;

    @Excel(name="性别",orderNum = "3")
    private String gender;

    @Excel(name="描述",orderNum = "4")
    private String description;

    @Excel(name="图片",orderNum = "5")
    private String imageUrl;

    public Teacher(){}
    public Teacher(Integer teacherId, Integer userId, String teacherRealName, String gender, String description, String imageUrl) {
        this.teacherId = teacherId;
        this.userId = userId;
        this.teacherRealName = teacherRealName;
        this.gender = gender;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTeacherRealName() {
        return teacherRealName;
    }

    public void setTeacherRealName(String teacherRealName) {
        this.teacherRealName = teacherRealName == null ? null : teacherRealName.trim();
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? null : imageUrl.trim();
    }
}