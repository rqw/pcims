package com.skyline.pcims.controller;

import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.DrugInfoPo;
import com.skyline.pcims.service.DrugInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/drugs/info")
public class DrugInfoController extends BaseController<DrugInfoPo> {
    @Resource
    private DrugInfoService drugInfoService;
    @Override
    public BaseService<DrugInfoPo> getBaseService() {
        return drugInfoService;
    }
}
