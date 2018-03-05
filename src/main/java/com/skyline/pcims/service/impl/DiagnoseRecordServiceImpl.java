package com.skyline.pcims.service.impl;

import com.ghit.common.mvc.dao.BaseDao;
import com.ghit.common.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.DiagnoseRecordDao;
import com.skyline.pcims.po.DiagnoseRecordPo;
import com.skyline.pcims.service.DiagnoseRecordService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
@Service
public class DiagnoseRecordServiceImpl extends BaseServiceImpl<DiagnoseRecordPo> implements DiagnoseRecordService {
    @Resource
    private DiagnoseRecordDao diagnoseRecodeDao;

    @Override
    protected Class<?> getVoClass() {
        return DiagnoseRecordPo.class;
    }

    @Override
    public BaseDao<DiagnoseRecordPo, Serializable> getBaseDao() {
        return diagnoseRecodeDao;
    }
}
