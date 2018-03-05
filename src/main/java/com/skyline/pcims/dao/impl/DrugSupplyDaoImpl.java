package com.skyline.pcims.dao.impl;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DrugInfoDao;
import com.skyline.pcims.dao.DrugSupplyDao;
import com.skyline.pcims.po.DrugInfoPo;
import com.skyline.pcims.po.DrugSupplyPo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public class DrugSupplyDaoImpl extends BaseDaoImpl<DrugSupplyPo,Serializable> implements DrugSupplyDao {
}
