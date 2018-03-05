package com.skyline.pcims.po;

import com.ghit.common.mvc.entity.UuidEntity;

import javax.persistence.*;

/**
 * 库存发票信息实体对象
 */
/**
 * @author ren7wei
 *
 */
@Entity
@Table(name="pcims_storage_invoice")
public class StorageInvoicePo extends UuidEntity {
    /**
	 * 
	 */
	private static final long serialVersionUID = -2753056416936819070L;
	//发票对应的库存
	@Column(name = "storage_id")
    private String storageId;
    //发票图片路径
    @Column(name="image_path")
    private String imagePath;
    //备注
    private String remark;

   

    public String getStorageId() {
		return storageId;
	}

	public void setStorageId(String storageId) {
		this.storageId = storageId;
	}

	public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String getRemark() {
        return remark;
    }

    @Override
    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
	public String toString() {
		return "StorageInvoicePo [storageId=" + storageId + ", imagePath=" + imagePath + ", remark=" + remark + "]";
	}
}
