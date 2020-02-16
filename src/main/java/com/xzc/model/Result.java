package com.xzc.vo;

public class Result {

    private int code;
    private String codeMsg;
    private Object data;

    public static Result success(Object data) {
        return new Result(data);
    }

    public static Result error(int code, String codeMsg) {
        return new Result(code, codeMsg);
    }

    public Result(Object data) {
        this.code = 0;
        this.codeMsg = "成功";
        this.data = data;
    }

    public Result(int code, String codeMsg) {
        this.code = -1;
        this.codeMsg = codeMsg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getCodeMsg() {
        return codeMsg;
    }

    public void setCodeMsg(String codeMsg) {
        this.codeMsg = codeMsg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
