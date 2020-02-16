package com.xzc.model;

import java.util.Date;

public class StudyreCord {
    private Integer studyRecordId;

    private Integer selectCourseId;

    private Integer resourceId;

    private Date endTime;

    private Date studyRecordTime;

    public Integer getStudyRecordId() {
        return studyRecordId;
    }

    public void setStudyRecordId(Integer studyRecordId) {
        this.studyRecordId = studyRecordId;
    }

    public Integer getSelectCourseId() {
        return selectCourseId;
    }

    public void setSelectCourseId(Integer selectCourseId) {
        this.selectCourseId = selectCourseId;
    }

    public Integer getResourceId() {
        return resourceId;
    }

    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getStudyRecordTime() {
        return studyRecordTime;
    }

    public void setStudyRecordTime(Date studyRecordTime) {
        this.studyRecordTime = studyRecordTime;
    }
}