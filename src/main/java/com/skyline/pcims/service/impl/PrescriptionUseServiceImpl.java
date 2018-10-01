package com.skyline.pcims.service.impl;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.PrescriptionUseDao;
import com.skyline.pcims.dao.PrescriptionUseSupplyDao;
import com.skyline.pcims.po.PrescriptionUsePo;
import com.skyline.pcims.po.PrescriptionUseSupplyPo;
import com.skyline.pcims.service.PrescriptionUseService;
import com.skyline.pcims.service.PrescriptionUseSupplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class PrescriptionUseServiceImpl extends BaseServiceImpl<PrescriptionUsePo> implements PrescriptionUseService {
    @Resource
    private PrescriptionUseDao prescriptionUseDao;

    @Override
    protected Class<?> getVoClass() {
        return PrescriptionUsePo.class;
    }

    @Override
    public BaseDao<PrescriptionUsePo, Serializable> getBaseDao() {
        return prescriptionUseDao;
    }
}
