package com.skyline.pcims.po;

import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="pcims_prescription_use")
public class PrescriptionUsePo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 5565383426222083094L;
	//病症id
    @Column(name="diagnose_id")
    private String diagnoseId;
    private String name;
    private String cnt;
    private String cost;
    private String remark;
    @OneToMany(targetEntity = PrescriptionUseSupplyPo.class,fetch = FetchType.LAZY,mappedBy="useId")
    private List<PrescriptionUseSupplyPo> supply=new ArrayList<>();;

    public String getDiagnoseId() {
        return diagnoseId;
    }

    public void setDiagnoseId(String diagnoseId) {
        this.diagnoseId = diagnoseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCnt() {
        return cnt;
    }

    public void setCnt(String cnt) {
        this.cnt = cnt;
    }

    public String getCost() {
        return cost;
    }

    public void setCost(String cost) {
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

    public List<PrescriptionUseSupplyPo> getSupply() {
        return supply;
    }

    public void setSupply(List<PrescriptionUseSupplyPo> supply) {
        this.supply = supply;
    }

    @Override
    public String toString() {
        return "PrescriptionUsePo{" +
                "diagnoseId='" + diagnoseId + '\'' +
                ", name='" + name + '\'' +
                ", cnt='" + cnt + '\'' +
                ", cost='" + cost + '\'' +
                ", remark='" + remark + '\'' +
                ", supply=" + supply +
                '}';
    }
}
