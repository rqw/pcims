package com.skyline.pcims.dao.impl;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.PrescriptionInfoDao;
import com.skyline.pcims.dao.PrescriptionInfoSupplyDao;
import com.skyline.pcims.po.PrescriptionInfoPo;
import com.skyline.pcims.po.PrescriptionInfoSupplyPo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public class PrescriptionInfoDaoImpl extends BaseDaoImpl<PrescriptionInfoPo,Serializable> implements PrescriptionInfoDao {

}
