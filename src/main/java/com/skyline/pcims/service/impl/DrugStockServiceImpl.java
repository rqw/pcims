package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DrugStockDao;
import com.skyline.pcims.po.DrugStockPo;
import com.skyline.pcims.service.DrugStockService;
@Service
public class DrugStockServiceImpl extends BaseServiceImpl<DrugStockPo>  implements DrugStockService{
    @Resource
    private DrugStockDao drugStockDao;
    @Override
    public BaseDao<DrugStockPo, Serializable> getBaseDao() {
        return drugStockDao;
    }
}
