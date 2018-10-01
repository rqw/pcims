package com.skyline.pcims.service.impl;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DrugInfoDao;
import com.skyline.pcims.dao.DrugSupplyDao;
import com.skyline.pcims.po.DrugInfoPo;
import com.skyline.pcims.po.DrugSupplyPo;
import com.skyline.pcims.service.DrugInfoService;
import com.skyline.pcims.service.DrugSupplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class DrugSupplyServiceImpl extends BaseServiceImpl<DrugSupplyPo> implements DrugSupplyService {
    @Resource
    private DrugSupplyDao drugSupplyDao;

    @Override
    protected Class<?> getVoClass() {
        return DrugSupplyPo.class;
    }

    @Override
    public BaseDao<DrugSupplyPo, Serializable> getBaseDao() {
        return drugSupplyDao;
    }
}
