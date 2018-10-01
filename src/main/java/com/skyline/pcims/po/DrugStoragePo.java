package com.skyline.pcims.po;

import com.haojiankang.lion.origin.mvc.entity.UuidEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
//药品库存实体
@Entity
@Table(name="pcims_drug_storage")
public class DrugStoragePo extends UuidEntity{
    /**
	 * 
	 */
	private static final long serialVersionUID = -3048035004846835077L;
	//入库时间
    @Column(name="storage_time")
    private Date storageTime;
    //库存成本
    private Float cost;
    //备注
    private String remark;
    //库存发票列表
    @OneToMany(targetEntity = StorageInvoicePo.class,fetch = FetchType.LAZY,mappedBy="storageId")
    private List<StorageInvoicePo> invoices;
    //药品库存列表
    @OneToMany(targetEntity = StorageInvoicePo.class,fetch = FetchType.LAZY,mappedBy="storageId")
    private List<DrugStockPo> durgStocks;
    public Date getStorageTime() {
        return storageTime;
    }

    public void setStorageTime(Date storageTime) {
        this.storageTime = storageTime;
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

    public List<StorageInvoicePo> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<StorageInvoicePo> invoices) {
        this.invoices = invoices;
    }

    @Override
    public String toString() {
        return "DrugStoragePo{" +
                "storageTime=" + storageTime +
                ", cost=" + cost +
                ", remark='" + remark + '\'' +
                ", invoices=" + invoices +
                '}';
    }
}
