package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DiseaseInfoDao;
import com.skyline.pcims.po.DiseaseInfoPo;
import com.skyline.pcims.service.DiseaseInfoService;
@Service
public class DiseaseInfoServiceImpl extends BaseServiceImpl<DiseaseInfoPo> implements DiseaseInfoService {
    @Resource
    private DiseaseInfoDao diseaseInfoDao;

    @Override
    protected Class<?> getVoClass() {
        return DiseaseInfoPo.class;
    }

    @Override
    public BaseDao<DiseaseInfoPo, Serializable> getBaseDao() {
        return diseaseInfoDao;
    }
}
