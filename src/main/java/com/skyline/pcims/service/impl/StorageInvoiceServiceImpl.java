package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.StorageInvoiceDao;
import com.skyline.pcims.po.StorageInvoicePo;
import com.skyline.pcims.service.StorageInvoiceService;

@Service
public class StorageInvoiceServiceImpl extends BaseServiceImpl<StorageInvoicePo>  implements StorageInvoiceService{
    @Resource
    private StorageInvoiceDao storageInvoiceDao;
    @Override
    public BaseDao<StorageInvoicePo, Serializable> getBaseDao() {
        return storageInvoiceDao;
    }
}
