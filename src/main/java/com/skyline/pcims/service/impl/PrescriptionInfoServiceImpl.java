package com.skyline.pcims.service.impl;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.PrescriptionInfoDao;
import com.skyline.pcims.dao.PrescriptionInfoSupplyDao;
import com.skyline.pcims.po.PrescriptionInfoPo;
import com.skyline.pcims.po.PrescriptionInfoSupplyPo;
import com.skyline.pcims.service.PrescriptionInfoService;
import com.skyline.pcims.service.PrescriptionInfoSupplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class PrescriptionInfoServiceImpl extends BaseServiceImpl<PrescriptionInfoPo> implements PrescriptionInfoService {
    @Resource
    private PrescriptionInfoDao prescriptionInfoDao;

    @Override
    protected Class<?> getVoClass() {
        return PrescriptionInfoPo.class;
    }

    @Override
    public BaseDao<PrescriptionInfoPo, Serializable> getBaseDao() {
        return prescriptionInfoDao;
    }
}
