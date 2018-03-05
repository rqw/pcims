package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.PrescriptionUseSupplyDao;
import com.skyline.pcims.po.PrescriptionUseSupplyPo;
import com.skyline.pcims.service.PrescriptionUseSupplyService;

@Service
public class PrescriptionUseSupplyServiceImpl extends BaseServiceImpl<PrescriptionUseSupplyPo> implements PrescriptionUseSupplyService {
    @Resource
    private PrescriptionUseSupplyDao prescriptionUseSupplyDao;
    @Override
    public BaseDao<PrescriptionUseSupplyPo, Serializable> getBaseDao() {
        return prescriptionUseSupplyDao;
    }
}
