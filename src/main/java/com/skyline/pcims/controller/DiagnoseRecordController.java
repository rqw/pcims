package com.skyline.pcims.controller;

import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.DiagnoseRecordPo;
import com.skyline.pcims.service.DiagnoseRecordService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/diagnose/record")
public class DiagnoseRecordController extends BaseController<DiagnoseRecordPo> {
    @Resource
    private DiagnoseRecordService diagnoseRecordService;
    @Override
    public BaseService<DiagnoseRecordPo> getBaseService() {
        return diagnoseRecordService;
    }
}
