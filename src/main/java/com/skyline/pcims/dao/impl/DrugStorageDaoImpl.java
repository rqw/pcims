package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.haojiankang.lion.origin.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.DrugStorageDao;
import com.skyline.pcims.po.DrugStoragePo;
@Repository
public class DrugStorageDaoImpl extends BaseDaoImpl<DrugStoragePo,Serializable> implements DrugStorageDao {
}
