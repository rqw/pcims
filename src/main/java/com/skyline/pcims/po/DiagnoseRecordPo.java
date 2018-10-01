package com.skyline.pcims.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="pcims_diagnose_recode")
public class DiagnoseRecordPo extends UuidEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = -737191437806144172L;
    @OneToOne
    @JoinColumn(name="person_id",referencedColumnName="id")
    private PersonPo person;
    //收缩压-左手
    @Column(name="sp_left")
    private Integer spLeft;
    //舒张压-左手
    @Column(name="dp_left")
    private Integer dpLeft;
    //收缩压-右手
    @Column(name="sp_right")
    private Integer spRight;
    //舒张压-右手
    @Column(name="dp_right")
    private Integer dpRight;
    //心率-左手
    @Column(name="hr_left")
    private Integer hrLeft;
    //心率-右手
    @Column(name="hr_right")
    private Integer hrRight;

    //收缩压-左手
    @Column(name="sp_left2")
    private Integer spLeft2;
    //舒张压-左手
    @Column(name="dp_left2")
    private Integer dpLeft2;
    //收缩压-右手
    @Column(name="sp_right2")
    private Integer spRight2;
    //舒张压-右手
    @Column(name="dp_right2")
    private Integer dpRight2;
    //心率-左手
    @Column(name="hr_left2")
    private Integer hrLeft2;
    //心率-右手
    @Column(name="hr_right2")
    private Integer hrRight2;

    //收缩压-左手
    @Column(name="sp_left3")
    private Integer spLeft3;
    //舒张压-左手
    @Column(name="dp_left3")
    private Integer dpLeft3;
    //收缩压-右手
    @Column(name="sp_right3")
    private Integer spRight3;
    //舒张压-右手
    @Column(name="dp_right3")
    private Integer dpRight3;
    //心率-左手
    @Column(name="hr_left3")
    private Integer hrLeft3;
    //心率-右手
    @Column(name="hr_right3")
    private Integer hrRight3;
    //诊断结论
    private String symptom;
    //费用
    private Float cost;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="diagnose_time")
    private Date diagnoseTime;
    //疾病信息
    @OneToOne
    @JoinColumn(name="disease_id",referencedColumnName="id")
    private DiseaseInfoPo disease;
    //药品列表
    @OneToMany(targetEntity = PrescriptionUsePo.class,fetch = FetchType.LAZY,mappedBy="diagnoseId")
    private List<PrescriptionUsePo> prescriptionUse=new ArrayList<>();;

    public PersonPo getPerson() {
        return person;
    }

    public void setPerson(PersonPo person) {
        this.person = person;
    }

    public Integer getSpLeft() {
        return spLeft;
    }

    public void setSpLeft(Integer spLeft) {
        this.spLeft = spLeft;
    }

    public Integer getDpLeft() {
        return dpLeft;
    }

    public void setDpLeft(Integer dpLeft) {
        this.dpLeft = dpLeft;
    }

    public Integer getSpRight() {
        return spRight;
    }

    public void setSpRight(Integer spRight) {
        this.spRight = spRight;
    }

    public Integer getDpRight() {
        return dpRight;
    }

    public void setDpRight(Integer dpRight) {
        this.dpRight = dpRight;
    }

    public Integer getHrLeft() {
        return hrLeft;
    }

    public void setHrLeft(Integer hrLeft) {
        this.hrLeft = hrLeft;
    }

    public Integer getHrRight() {
        return hrRight;
    }

    public void setHrRight(Integer hrRight) {
        this.hrRight = hrRight;
    }

    public String getSymptom() {
        return symptom;
    }

    public void setSymptom(String symptom) {
        this.symptom = symptom;
    }

    public Date getDiagnoseTime() {
        return diagnoseTime;
    }

    public void setDiagnoseTime(Date diagnoseTime) {
        this.diagnoseTime = diagnoseTime;
    }

    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    public DiseaseInfoPo getDisease() {
        return disease;
    }

    public void setDisease(DiseaseInfoPo disease) {
        this.disease = disease;
    }

    public List<PrescriptionUsePo> getPrescriptionUse() {
        return prescriptionUse;
    }

    public void setPrescriptionUse(List<PrescriptionUsePo> prescriptionUse) {
        this.prescriptionUse = prescriptionUse;
    }

    public Integer getSpLeft2() {
        return spLeft2;
    }

    public void setSpLeft2(Integer spLeft2) {
        this.spLeft2 = spLeft2;
    }

    public Integer getDpLeft2() {
        return dpLeft2;
    }

    public void setDpLeft2(Integer dpLeft2) {
        this.dpLeft2 = dpLeft2;
    }

    public Integer getSpRight2() {
        return spRight2;
    }

    public void setSpRight2(Integer spRight2) {
        this.spRight2 = spRight2;
    }

    public Integer getDpRight2() {
        return dpRight2;
    }

    public void setDpRight2(Integer dpRight2) {
        this.dpRight2 = dpRight2;
    }

    public Integer getHrLeft2() {
        return hrLeft2;
    }

    public void setHrLeft2(Integer hrLeft2) {
        this.hrLeft2 = hrLeft2;
    }

    public Integer getHrRight2() {
        return hrRight2;
    }

    public void setHrRight2(Integer hrRight2) {
        this.hrRight2 = hrRight2;
    }

    public Integer getSpLeft3() {
        return spLeft3;
    }

    public void setSpLeft3(Integer spLeft3) {
        this.spLeft3 = spLeft3;
    }

    public Integer getDpLeft3() {
        return dpLeft3;
    }

    public void setDpLeft3(Integer dpLeft3) {
        this.dpLeft3 = dpLeft3;
    }

    public Integer getSpRight3() {
        return spRight3;
    }

    public void setSpRight3(Integer spRight3) {
        this.spRight3 = spRight3;
    }

    public Integer getDpRight3() {
        return dpRight3;
    }

    public void setDpRight3(Integer dpRight3) {
        this.dpRight3 = dpRight3;
    }

    public Integer getHrLeft3() {
        return hrLeft3;
    }

    public void setHrLeft3(Integer hrLeft3) {
        this.hrLeft3 = hrLeft3;
    }

    public Integer getHrRight3() {
        return hrRight3;
    }

    public void setHrRight3(Integer hrRight3) {
        this.hrRight3 = hrRight3;
    }

    @Override
    public String toString() {
        return "DiagnoseRecordPo{" +
                "person=" + person +
                ", spLeft=" + spLeft +
                ", dpLeft=" + dpLeft +
                ", spRight=" + spRight +
                ", dpRight=" + dpRight +
                ", hrLeft=" + hrLeft +
                ", hrRight=" + hrRight +
                ", spLeft2=" + spLeft2 +
                ", dpLeft2=" + dpLeft2 +
                ", spRight2=" + spRight2 +
                ", dpRight2=" + dpRight2 +
                ", hrLeft2=" + hrLeft2 +
                ", hrRight2=" + hrRight2 +
                ", spLeft3=" + spLeft3 +
                ", dpLeft3=" + dpLeft3 +
                ", spRight3=" + spRight3 +
                ", dpRight3=" + dpRight3 +
                ", hrLeft3=" + hrLeft3 +
                ", hrRight3=" + hrRight3 +
                ", symptom='" + symptom + '\'' +
                ", cost=" + cost +
                ", diagnoseTime=" + diagnoseTime +
                ", disease=" + disease +
                ", prescriptionUse=" + prescriptionUse +
                '}';
    }
}
