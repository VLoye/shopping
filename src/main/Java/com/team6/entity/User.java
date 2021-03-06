package com.team6.entity;

import org.apache.ibatis.annotations.Param;

public class User {
  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.id
   *
   * @mbggenerated
   */
  private Integer id;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.name
   *
   * @mbggenerated
   */
  private String name;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.password
   *
   * @mbggenerated
   */
  private String password;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.salt
   *
   * @mbggenerated
   */
  private String salt;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.role
   *
   * @mbggenerated
   */
  private Integer role;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.tel
   *
   * @mbggenerated
   */
  private String tel;

  /**
   * This field was generated by MyBatis Generator.
   * This field corresponds to the database column user.email
   *
   * @mbggenerated
   */
  private String email;

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.id
   *
   * @return the value of user.id
   *
   * @mbggenerated
   */
  public Integer getId() {
    return id;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.id
   *
   * @param id the value for user.id
   *
   * @mbggenerated
   */
  public void setId(Integer id) {
    this.id = id;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.name
   *
   * @return the value of user.name
   *
   * @mbggenerated
   */
  public String getName() {
    return name;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.name
   *
   * @param name the value for user.name
   *
   * @mbggenerated
   */
  public void setName(String name) {
    this.name = name == null ? null : name.trim();
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.password
   *
   * @return the value of user.password
   *
   * @mbggenerated
   */
  public String getPassword() {
    return password;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.password
   *
   * @param password the value for user.password
   *
   * @mbggenerated
   */
  public void setPassword(String password) {
    this.password = password == null ? null : password.trim();
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.salt
   *
   * @return the value of user.salt
   *
   * @mbggenerated
   */
  public String getSalt() {
    return salt;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.salt
   *
   * @param salt the value for user.salt
   *
   * @mbggenerated
   */
  public void setSalt(String salt) {
    this.salt = salt == null ? null : salt.trim();
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.role
   *
   * @return the value of user.role
   *
   * @mbggenerated
   */
  public Integer getRole() {
    return role;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.role
   *
   * @param role the value for user.role
   *
   * @mbggenerated
   */
  public void setRole(Integer role) {
    this.role = role;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.tel
   *
   * @return the value of user.tel
   *
   * @mbggenerated
   */
  public String getTel() {
    return tel;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.tel
   *
   * @param tel the value for user.tel
   *
   * @mbggenerated
   */
  public void setTel(String tel) {
    this.tel = tel == null ? null : tel.trim();
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method returns the value of the database column user.email
   *
   * @return the value of user.email
   *
   * @mbggenerated
   */
  public String getEmail() {
    return email;
  }

  /**
   * This method was generated by MyBatis Generator.
   * This method sets the value of the database column user.email
   *
   * @param email the value for user.email
   *
   * @mbggenerated
   */
  public void setEmail(String email) {
    this.email = email == null ? null : email.trim();
  }
  @Override
  public String toString() {
    return "User{" + "id=" + id + ", name='" + name + '\'' + ", password='" + password + '\'' + ", salt='" + salt + '\'' + ", role=" + role + '}';
  }
}
