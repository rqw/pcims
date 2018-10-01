package com.skyline.pcims.po;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.*;

@Entity
@Table(name="pcims_prescription_info_supply")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PrescriptionInfoSupplyPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 5565383426222083094L;
	//病症id
    @Column(name="info_id")
    private String infoId;
    //用量
    @Column(name="cnt")
    private Float usage;
    @OneToOne
    @JoinColumn(name="drug_id",referencedColumnName="id")
    private DrugInfoPo drugInfo;

    public String getInfoId() {
        return infoId;
    }

    public void setInfoId(String infoId) {
        this.infoId = infoId;
    }

    public DrugInfoPo getDrugInfo() {
        return drugInfo;
    }

    public void setDrugInfo(DrugInfoPo drugInfo) {
        this.drugInfo = drugInfo;
    }

    public Float getUsage() {
        return usage;
    }

    public void setUsage(Float usage) {
        this.usage = usage;
    }

    @Override
    public String toString() {
        return "PrescriptionPo{" +
                "infoId='" + infoId + '\'' +
                ", usage=" + usage +
                ", drugInfo=" + drugInfo +
                '}';
    }
}
