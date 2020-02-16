package com.xzc.model;

public class Admin extends User{
    private Integer adminId;

    private Integer userId;

    private String adminRealName;

    private String imageUrl;

    private String skinColor;

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getAdminRealName() {
        return adminRealName;
    }

    public void setAdminRealName(String adminRealName) {
        this.adminRealName = adminRealName == null ? null : adminRealName.trim();
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? null : imageUrl.trim();
    }

    /**
     * 新加
     * @return
     */
    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", userId=" + userId +
                ", adminRealName='" + adminRealName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", skinColor='" + skinColor + '\'' +
                '}';
    }

    public String getSkinColor() {
        return skinColor;
    }

    public void setSkinColor(String skinColor) {
        this.skinColor = skinColor == null ? null : skinColor.trim();
    }

}