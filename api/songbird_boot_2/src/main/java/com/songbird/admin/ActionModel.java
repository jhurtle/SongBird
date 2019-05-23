package com.songbird.admin;

public class ActionModel {

    String message;

    int user_to_modify;

    boolean success;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getUser_to_modify() {
        return user_to_modify;
    }

    public void setUser_to_modify(int user_to_modify) {
        this.user_to_modify = user_to_modify;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
