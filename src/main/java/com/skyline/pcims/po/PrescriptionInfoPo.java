package com.skyline.pcims.po;

import com.ghit.common.mvc.entity.UuidEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="pcims_prescription_info")
public class PrescriptionInfoPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 5565383426222083094L;
	//病症id
    @Column(name="disease_id")
    private String diseaseId;
    private String name;
    private Integer cnt;
    private String remark;
    private Float cost;

    @OneToMany(targetEntity = PrescriptionInfoSupplyPo.class,fetch = FetchType.LAZY,mappedBy="infoId")
    private List<PrescriptionInfoSupplyPo> supply=new ArrayList<>();;

    public String getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(String diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCnt() {
        return cnt;
    }

    public void setCnt(Integer cnt) {
        this.cnt = cnt;
    }

    public Float getCost() {
        return cost;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    @Override
    public String getRemark() {
        return remark;
    }

    @Override
    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<PrescriptionInfoSupplyPo> getSupply() {
        return supply;
    }

    public void setSupply(List<PrescriptionInfoSupplyPo> supply) {
        this.supply = supply;
    }

    @Override
    public String toString() {
        return "PrescriptionInfoPo{" +
                "diseaseId='" + diseaseId + '\'' +
                ", name='" + name + '\'' +
                ", cnt=" + cnt +
                ", remark='" + remark + '\'' +
                ", cost=" + cost +
                ", supply=" + supply +
                '}';
    }
}
