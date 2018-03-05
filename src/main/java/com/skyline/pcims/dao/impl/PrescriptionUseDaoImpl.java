package com.skyline.pcims.dao.impl;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.PrescriptionUseDao;
import com.skyline.pcims.dao.PrescriptionUseSupplyDao;
import com.skyline.pcims.po.PrescriptionUsePo;
import com.skyline.pcims.po.PrescriptionUseSupplyPo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public class PrescriptionUseDaoImpl extends BaseDaoImpl<PrescriptionUsePo,Serializable> implements PrescriptionUseDao {

}
