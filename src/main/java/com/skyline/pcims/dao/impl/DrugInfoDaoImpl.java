package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DrugInfoDao;
import com.skyline.pcims.po.DrugInfoPo;
@Repository
public class DrugInfoDaoImpl extends BaseDaoImpl<DrugInfoPo,Serializable> implements DrugInfoDao {
}
