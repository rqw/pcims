package com.skyline.pcims.dao.impl;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DiseaseInfoDao;
import com.skyline.pcims.po.DiseaseInfoPo;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
@Repository
public class DiseaseInfoDaoImpl extends BaseDaoImpl<DiseaseInfoPo,Serializable> implements DiseaseInfoDao {
}
