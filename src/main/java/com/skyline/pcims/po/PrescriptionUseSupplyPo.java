package com.skyline.pcims.po;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ghit.common.mvc.entity.UuidEntity;

import javax.persistence.*;

@Entity
@Table(name="pcims_prescription_use_supply")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PrescriptionUseSupplyPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = 5565383426222083094L;
	//诊断id
    @Column(name="use_id")
    private String useId;
    @OneToOne
    @JoinColumn(name="drug_id",referencedColumnName="id")
    private DrugInfoPo drugInfo;
    //用量
    @Column(name="cnt")
    private Float usage;
    //单价
    private Float price;
    //总价
    private Float total;

    public String getUseId() {
        return useId;
    }

    public void setUseId(String useId) {
        this.useId = useId;
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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "PrescriptionUseSupplyPo{" +
                "useId='" + useId + '\'' +
                ", drugInfo=" + drugInfo +
                ", usage=" + usage +
                ", price=" + price +
                ", total=" + total +
                '}';
    }
}
