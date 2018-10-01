package com.skyline.pcims.service.impl;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DrugStockDao;
import com.skyline.pcims.po.DrugStockPo;
import com.skyline.pcims.service.DrugStockService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
@Service
public class DrugStockServiceImpl extends BaseServiceImpl<DrugStockPo> implements DrugStockService{
    @Resource
    private DrugStockDao drugStockDao;
    @Override
    public BaseDao<DrugStockPo, Serializable> getBaseDao() {
        return drugStockDao;
    }
}
