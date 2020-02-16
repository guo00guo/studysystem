package com.xzc.model;

import cn.afterturn.easypoi.excel.annotation.Excel;

public class TopSerach {
    //    @Excel(name = "热搜ID", orderNum = "0")
    @Excel(name="热搜ID",orderNum = "0")
    private Integer topSerachId;
    @Excel(name = "热搜", orderNum = "1")
    private String topSerachName;

    public TopSerach(){}

    public TopSerach(Integer topSerachId, String topSerachName) {
        this.topSerachId = topSerachId;
        this.topSerachName = topSerachName;
    }

    public Integer getTopSerachId() {
        return topSerachId;
    }

    public void setTopSerachId(Integer topSerachId) {
        this.topSerachId = topSerachId;
    }

    public String getTopSerachName() {
        return topSerachName;
    }

    public void setTopSerachName(String topSerachName) {
        this.topSerachName = topSerachName == null ? null : topSerachName.trim();
    }

}