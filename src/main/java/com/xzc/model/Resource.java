package com.xzc.model;

public class Resource {
    private Integer resourceId;

    private Integer courseKPId;

    private String resourceName;

    private String resourceLocation;

    public Integer getResourceId() {
        return resourceId;
    }

    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    public Integer getCourseKPId() {
        return courseKPId;
    }

    public void setCourseKPId(Integer courseKPId) {
        this.courseKPId = courseKPId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName == null ? null : resourceName.trim();
    }

    public String getResourceLocation() {
        return resourceLocation;
    }

    public void setResourceLocation(String resourceLocation) {
        this.resourceLocation = resourceLocation == null ? null : resourceLocation.trim();
    }
}