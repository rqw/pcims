package com.skyline.pcims.po;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.*;

@Entity
@Table(name="pcims_drug_supply")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DrugSupplyPo extends UuidEntity {
    private static final long serialVersionUID = -7200467516844336420L;
    //药房名称
    private String drugstore;
    @OneToOne
    @JoinColumn(name="drug_id",referencedColumnName="id")
    private DrugInfoPo drugInfo;
    //零售价
    @Column(name="retail_price")
    private Float retailPrice;
    //成本价
    @Column(name="cost_price")
    private Float costPrice;
    //药品位置编号
    private String position;
    //单位容量零售价
    @Column(name="unit_price")
    private Float unitPrice;

    public String getDrugstore() {
        return drugstore;
    }

    public void setDrugstore(String drugstore) {
        this.drugstore = drugstore;
    }

    public DrugInfoPo getDrugInfo() {
        return drugInfo;
    }

    public void setDrugInfo(DrugInfoPo drugInfo) {
        this.drugInfo = drugInfo;
    }

    public Float getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Float retailPrice) {
        this.retailPrice = retailPrice;
    }

    public Float getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Float costPrice) {
        this.costPrice = costPrice;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    @Override
    public String toString() {
        return "DrugSupplyPo{" +
                "drugstore='" + drugstore + '\'' +
                ", drugInfo=" + drugInfo +
                ", retailPrice=" + retailPrice +
                ", costPrice=" + costPrice +
                ", position='" + position + '\'' +
                ", unitPrice=" + unitPrice +
                '}';
    }
}
