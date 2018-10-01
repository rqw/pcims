package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.service.BaseService;
import com.skyline.pcims.po.DiseaseInfoPo;
import com.skyline.pcims.service.DiseaseInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/diagnose/disease")
public class DiseaseInfoController extends BaseController<DiseaseInfoPo> {
    @Resource
    private DiseaseInfoService diseaseInfoService;
    @Override
    public BaseService<DiseaseInfoPo> getBaseService() {
        return diseaseInfoService;
    }
}
