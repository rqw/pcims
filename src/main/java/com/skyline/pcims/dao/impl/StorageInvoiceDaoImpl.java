package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.StorageInvoiceDao;
import com.skyline.pcims.po.StorageInvoicePo;
@Repository
public class StorageInvoiceDaoImpl  extends BaseDaoImpl<StorageInvoicePo,Serializable>   implements StorageInvoiceDao{

}
