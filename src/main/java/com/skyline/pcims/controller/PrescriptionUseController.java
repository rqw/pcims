package com.skyline.pcims.controller;

import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.PrescriptionUsePo;
import com.skyline.pcims.po.PrescriptionUseSupplyPo;
import com.skyline.pcims.service.PrescriptionUseService;
import com.skyline.pcims.service.PrescriptionUseSupplyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/prescription/use")
public class PrescriptionUseController extends BaseController<PrescriptionUsePo> {
    @Resource
    private PrescriptionUseService prescriptionUseService;
    @Override
    public BaseService<PrescriptionUsePo> getBaseService() {
        return prescriptionUseService;
    }
}
