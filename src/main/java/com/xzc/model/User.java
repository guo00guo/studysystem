package com.xzc.model;

import cn.afterturn.easypoi.excel.annotation.Excel;

public class User {
    @Excel(name="用户ID",orderNum = "0")
    private Integer userId;
    @Excel(name="账号",orderNum = "1")
    private String userName;
    @Excel(name="密码",orderNum = "2")
    private String passWord;
    @Excel(name="角色",orderNum = "3")
    private String role;
    @Excel(name="真实名",orderNum = "4")
    private String realName;

    @Excel(name="性别",orderNum = "5")
    private String gender;
    @Excel(name="性别",orderNum = "6")
    private String address;
    @Excel(name="地址",orderNum = "7")
    private String description;

    @Excel(name="图片",orderNum = "8")
    private String imageUrl;
    @Excel(name="皮肤颜色",orderNum = "9")
    private String skinColor;

    public User(){}
    public User(Integer userId, String userName, String passWord, String role, String realName, String gender, String address, String description, String imageUrl, String skinColor) {
        this.userId = userId;
        this.userName = userName;
        this.passWord = passWord;
        this.role = role;
        this.realName = realName;
        this.gender = gender;
        this.address = address;
        this.description = description;
        this.imageUrl = imageUrl;
        this.skinColor = skinColor;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord == null ? null : passWord.trim();
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
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

    public String getSkinColor() {
        return skinColor;
    }

    public void setSkinColor(String skinColor) {
        this.skinColor = skinColor == null ? null : skinColor.trim();
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", role='" + role + '\'' +
                ", realName='" + realName + '\'' +
                ", gender='" + gender + '\'' +
                ", address='" + address + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", skinColor='" + skinColor + '\'' +
                '}';
    }
}