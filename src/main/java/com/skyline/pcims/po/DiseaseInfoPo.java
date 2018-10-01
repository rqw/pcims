package com.skyline.pcims.po;

import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="pcims_disease_info")
public class DiseaseInfoPo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = -266241811058190862L;
	//疾病名称
    private String name;
    //拼音码
    private String pym;
    //疾病描述
    private String remark;
    //药品列表
    @OneToMany(targetEntity = PrescriptionInfoPo.class,fetch = FetchType.LAZY,mappedBy="diseaseId")
    private List<PrescriptionInfoPo> prescriptionInfo=new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<PrescriptionInfoPo> getPrescriptionInfo() {
        return prescriptionInfo;
    }

    public void setPrescriptionInfo(List<PrescriptionInfoPo> prescriptionInfo) {
        this.prescriptionInfo = prescriptionInfo;
    }

    @Override
    public String toString() {
        return "DiseaseDataPo{" +
                "name='" + name + '\'' +
                ", pym='" + pym + '\'' +
                ", remark='" + remark + '\'' +
                ", prescriptionInfo=" + prescriptionInfo +
                '}';
    }
}
