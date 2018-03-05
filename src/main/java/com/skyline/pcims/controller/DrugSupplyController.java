package com.skyline.pcims.controller;

import com.ghit.common.bean.Page;
import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.DrugInfoPo;
import com.skyline.pcims.po.DrugSupplyPo;
import com.skyline.pcims.service.DrugInfoService;
import com.skyline.pcims.service.DrugSupplyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.Map;

@Controller
@RequestMapping("/drugs/supply")
public class DrugSupplyController extends BaseController<DrugSupplyPo> {
    @Resource
    private DrugSupplyService drugSupplyService;
    @Override
    public BaseService<DrugSupplyPo> getBaseService() {
        return drugSupplyService;
    }

    @Override
    protected boolean listBefore(Map<String, Object> maps, Page page) {
        Object did = page.getConditions().get("drugInfo.id");
        if(did!=null){
            page.getConditions().put("drugInfo.id",did.toString().split(","));
        }
        return super.listBefore(maps, page);
    }
}
