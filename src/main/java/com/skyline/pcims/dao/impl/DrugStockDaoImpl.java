package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.haojiankang.lion.origin.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DrugStockDao;
import com.skyline.pcims.po.DrugStockPo;
@Repository
public class DrugStockDaoImpl extends BaseDaoImpl<DrugStockPo,Serializable> implements DrugStockDao {
}
