package com.skyline.pcims.po;

import com.ghit.common.mvc.entity.UuidEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="pcims_drug_stock")
public class DrugStockPo extends UuidEntity {

    /**
	 * 
	 */
	private static final long serialVersionUID = -3840152322499495204L;
	@Column(name = "storage_id")
    private String storageId;
    @OneToOne
    @JoinColumn(name="durg_id",referencedColumnName="id")
    private DrugInfoPo durgInfo;
    //批次号
    @Column(name="batch_no")
    private String batchNo;
    //进货日期
    private Date endDate;
    //进货数量(包装数量)
    @Column(name="stock_count")
    private Float stockCount;
    //包装单价
    @Column(name="unit_price")
    private Float unitPrice;
    //总价
    private Float total;

    public String getStorageId() {
		return storageId;
	}

	public void setStorageId(String storageId) {
		this.storageId = storageId;
	}

	public DrugInfoPo getDurgInfo() {
        return durgInfo;
    }

    public void setDurgInfo(DrugInfoPo durgInfo) {
        this.durgInfo = durgInfo;
    }

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Float getStockCount() {
        return stockCount;
    }

    public void setStockCount(Float stockCount) {
        this.stockCount = stockCount;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

	@Override
	public String toString() {
		return "DrugStockPo [storageId=" + storageId + ", durgInfo=" + durgInfo + ", batchNo=" + batchNo + ", endDate="
				+ endDate + ", stockCount=" + stockCount + ", unitPrice=" + unitPrice + ", total=" + total + "]";
	}

   
}
