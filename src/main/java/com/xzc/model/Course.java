package com.xzc.model;

import cn.afterturn.easypoi.excel.annotation.Excel;

import java.util.List;

public class Course {
    @Excel(name="课程ID",orderNum = "0")
    private Integer courseId;
    @Excel(name="课程名",orderNum = "1")
    private String courseName;
    @Excel(name="二级分类",orderNum = "2")
    private Integer courseSortTwoId;
    @Excel(name="图片地址",orderNum = "4")
    private String imageUrl;
    @Excel(name="描述",orderNum = "5")
    private String description;
    @Excel(name="是否开课",orderNum = "6")
    private String flag;
    private Integer userId;
    public Course(){}
    public Course(Integer courseId, String courseName, Integer courseSortTwoId, Integer userId, String imageUrl, String description, String flag, List<CourseUnit> courseUnitList) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseSortTwoId = courseSortTwoId;
        this.imageUrl = imageUrl;
        this.description = description;
        this.flag = flag;
        this.courseUnitList = courseUnitList;
    }

    private List<CourseUnit> courseUnitList;

    public List<CourseUnit> getCourseUnitList() {
        return courseUnitList;
    }

    public void setCourseUnitList(List<CourseUnit> courseUnitList) {
        this.courseUnitList = courseUnitList;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName == null ? null : courseName.trim();
    }

    public Integer getCourseSortTwoId() {
        return courseSortTwoId;
    }

    public void setCourseSortTwoId(Integer courseSortTwoId) {
        this.courseSortTwoId = courseSortTwoId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? null : imageUrl.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", courseSortTwoId=" + courseSortTwoId +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                ", flag='" + flag + '\'' +
                ", courseUnitList=" + courseUnitList +
                '}';
    }
}