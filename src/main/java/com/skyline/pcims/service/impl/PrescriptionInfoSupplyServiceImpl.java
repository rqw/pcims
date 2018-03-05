package com.skyline.pcims.service.impl;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.PrescriptionInfoSupplyDao;
import com.skyline.pcims.po.PrescriptionInfoSupplyPo;
import com.skyline.pcims.service.PrescriptionInfoSupplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class PrescriptionInfoSupplyServiceImpl extends BaseServiceImpl<PrescriptionInfoSupplyPo> implements PrescriptionInfoSupplyService {
    @Resource
    private PrescriptionInfoSupplyDao prescriptionInfoSupplyDao;
    @Override
    public BaseDao<PrescriptionInfoSupplyPo, Serializable> getBaseDao() {
        return prescriptionInfoSupplyDao;
    }
}
