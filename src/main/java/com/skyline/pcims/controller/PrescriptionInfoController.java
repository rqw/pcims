package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.service.BaseService;
import com.skyline.pcims.po.PrescriptionInfoPo;
import com.skyline.pcims.po.PrescriptionInfoSupplyPo;
import com.skyline.pcims.service.PrescriptionInfoService;
import com.skyline.pcims.service.PrescriptionInfoSupplyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/prescription/info")
public class PrescriptionInfoController extends BaseController<PrescriptionInfoPo> {
    @Resource
    private PrescriptionInfoService prescriptionInfoService;
    @Override
    public BaseService<PrescriptionInfoPo> getBaseService() {
        return prescriptionInfoService;
    }
}
