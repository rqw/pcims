package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DrugInfoDao;
import com.skyline.pcims.po.DrugInfoPo;
import com.skyline.pcims.service.DrugInfoService;
@Service
public class DrugInfoServiceImpl extends BaseServiceImpl<DrugInfoPo> implements DrugInfoService {
    @Resource
    private DrugInfoDao drugInfoDao;
    @Override
    public BaseDao<DrugInfoPo, Serializable> getBaseDao() {
        return drugInfoDao;
    }
}
