package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DrugStockDao;
import com.skyline.pcims.po.DrugStockPo;
@Repository
public class DrugStockDaoImpl extends BaseDaoImpl<DrugStockPo,Serializable> implements DrugStockDao {
}
