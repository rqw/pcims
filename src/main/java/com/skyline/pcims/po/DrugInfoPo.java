package com.skyline.pcims.po;

import com.ghit.common.mvc.entity.UuidEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="pcims_drug_info")
public class DrugInfoPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = -7200467516844336420L;
	//药品名称
    private String name;
    //药品描述
    private String summary;
    //生产厂家
    private String produce;
    //单位名称
    private String unti;
    //标准包装的单位容量
    private String volume;
    //标准包装名称
    private String packing;
    //药品拼音码
    private String pym;
    //药品分类
    @Column(name="drug_type")
    private String drugType;
    @Column(name="alias_name")
    private String aliasName;
    //规格
    private String specifications;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getProduce() {
        return produce;
    }

    public void setProduce(String produce) {
        this.produce = produce;
    }

    public String getUnti() {
        return unti;
    }

    public void setUnti(String unti) {
        this.unti = unti;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getPacking() {
        return packing;
    }

    public void setPacking(String packing) {
        this.packing = packing;
    }

    public String getPym() {
        return pym;
    }

    public void setPym(String pym) {
        this.pym = pym;
    }

    public String getDrugType() {
        return drugType;
    }

    public void setDrugType(String drugType) {
        this.drugType = drugType;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getAliasName() {
        return aliasName;
    }

    public void setAliasName(String aliasName) {
        this.aliasName = aliasName;
    }

    @Override
    public String toString() {
        return "DrugInfoPo{" +
                "name='" + name + '\'' +
                ", summary='" + summary + '\'' +
                ", produce='" + produce + '\'' +
                ", unti='" + unti + '\'' +
                ", volume='" + volume + '\'' +
                ", packing='" + packing + '\'' +
                ", pym='" + pym + '\'' +
                ", drugType='" + drugType + '\'' +
                ", aliasName='" + aliasName + '\'' +
                ", specifications='" + specifications + '\'' +
                '}';
    }
}
