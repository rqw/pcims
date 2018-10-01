package com.skyline.pcims.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="pcims_person")
public class PersonPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 7889588075872506037L;
	//病人姓名
    private String name;
    //性别 1-男，2-女，9-未说明
    private Integer sex;
    //生日
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    //电话
    private String phone;
    //最近一次就诊时间
    @Column(name="last_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastTime;
    //创建时间
    @Column(name="create_time")
    private Date createTime;
    //备注
    private String remark;
    //拼音码
    private String pym;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    @Override
    public Date getCreateTime() {
        return createTime;
    }

    @Override
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String getRemark() {
        return remark;
    }

    @Override
    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getPym() {
        return pym;
    }

    public void setPym(String pym) {
        this.pym = pym;
    }

    @Override
    public String toString() {
        return "PersonPo{" +
                "name='" + name + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", phone='" + phone + '\'' +
                ", lastTime=" + lastTime +
                ", createTime=" + createTime +
                ", remark='" + remark + '\'' +
                ", pym='" + pym + '\'' +
                '}';
    }
}
