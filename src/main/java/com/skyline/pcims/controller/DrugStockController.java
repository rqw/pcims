package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.service.BaseService;
import com.skyline.pcims.po.DrugStockPo;
import com.skyline.pcims.service.DrugStockService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/durgs/storage/stock")
public class DrugStockController extends BaseController<DrugStockPo> {
    @Resource
    private DrugStockService drugStockService;
    @Override
    public BaseService<DrugStockPo> getBaseService() {
        return drugStockService;
    }
}
