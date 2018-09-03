package com.team6.dto.login;

import com.team6.entity.User;

public class UserInfo {
    //用户的token
    private String token;

    //用户的一些基本信息
    private User user;

    public UserInfo(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserInfo{" + "token='" + token + '\'' + ", user=" + user + '}';
    }
}
