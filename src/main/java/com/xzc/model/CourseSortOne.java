package com.xzc.model;

import java.util.List;

public class CourseSortOne {
    private Integer courseSortOneId;

    private String courseSortOneName;

    private List<CourseSortTwo> courseSortTwoList;

    public Integer getCourseSortOneId() {
        return courseSortOneId;
    }

    public void setCourseSortOneId(Integer courseSortOneId) {
        this.courseSortOneId = courseSortOneId;
    }

    public String getCourseSortOneName() {
        return courseSortOneName;
    }

    public List<CourseSortTwo> getCourseSortTwoList() {
        return courseSortTwoList;
    }

    public CourseSortOne(){

    }

    public CourseSortOne(Integer courseSortOneId, String courseSortOneName, List<CourseSortTwo> courseSortTwoList) {
        this.courseSortOneId = courseSortOneId;
        this.courseSortOneName = courseSortOneName;
        this.courseSortTwoList = courseSortTwoList;
    }

    @Override
    public String toString() {
        return "CourseSortOne{" +
                "courseSortOneId=" + courseSortOneId +
                ", courseSortOneName='" + courseSortOneName + '\'' +
                ", courseSortTwoList=" + courseSortTwoList +
                '}';
    }

    public void setCourseSortTwoList(List<CourseSortTwo> courseSortTwoList) {
        this.courseSortTwoList = courseSortTwoList;
    }

    public void setCourseSortOneName(String courseSortOneName) {
        this.courseSortOneName = courseSortOneName == null ? null : courseSortOneName.trim();
    }
}