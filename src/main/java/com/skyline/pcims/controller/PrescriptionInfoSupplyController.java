package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.SSTO;
import com.haojiankang.lion.origin.Sharp;
import com.haojiankang.lion.origin.mvc.EntityType;
import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.service.BaseService;
import com.skyline.pcims.po.PrescriptionInfoSupplyPo;
import com.skyline.pcims.service.PrescriptionInfoSupplyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;

@Controller
@RequestMapping("/prescription/info/supply")
public class PrescriptionInfoSupplyController extends BaseController<PrescriptionInfoSupplyPo> {
    @Resource
    private PrescriptionInfoSupplyService prescriptionInfoSupplyService;

    @Override
    public BaseService<PrescriptionInfoSupplyPo> getBaseService() {
        return prescriptionInfoSupplyService;
    }

    @RequestMapping(value = "imp")
    @ResponseBody
    @EntityType
    public Object imp(@RequestBody List<PrescriptionInfoSupplyPo> t) {

        boolean state = true;
        try {
            if (t != null && t.size() > 0) {
                Iterator<PrescriptionInfoSupplyPo> iterator = t.iterator();
                while (iterator.hasNext()) {
                    PrescriptionInfoSupplyPo supply = iterator.next();
                    if (!StringUtils.isEmpty(supply.getId()) && supply.getUsage() != null && supply.getUsage() < 0) {
                        state = getBaseService().del(supply);
                        iterator.remove();
                    } else {
                        getBaseService().save(supply);
                    }
                }

            }
        } catch (Exception e) {
            state = false;
            log.error(e.getMessage(), e);
            Sharp.message(e.getMessage());
        }
        return SSTO.structure(state, Sharp.message(), t);

    }
}
