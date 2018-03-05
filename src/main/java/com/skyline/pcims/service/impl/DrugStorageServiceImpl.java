package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DrugStorageDao;
import com.skyline.pcims.po.DrugStoragePo;
import com.skyline.pcims.service.DrugStorageService;

@Service
public class  DrugStorageServiceImpl extends BaseServiceImpl<DrugStoragePo> implements DrugStorageService {
    @Resource
    private DrugStorageDao drugStorageDao;

    @Override
    public BaseDao<DrugStoragePo, Serializable> getBaseDao() {
        return drugStorageDao;
    }
}
