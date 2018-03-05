package com.skyline.pcims.controller;

import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.DrugStoragePo;
import com.skyline.pcims.service.DrugStorageService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/durgs/storage")
public class DrugStorageController extends BaseController<DrugStoragePo>{
    @Resource
    private DrugStorageService drugStorageService;
    @Override
    public BaseService<DrugStoragePo> getBaseService() {
        return drugStorageService;
    }
}
