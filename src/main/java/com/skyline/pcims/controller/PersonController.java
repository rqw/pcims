package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.mvc.controller.BaseController;
import com.haojiankang.lion.origin.mvc.service.BaseService;
import com.skyline.pcims.po.PersonPo;
import com.skyline.pcims.service.PersonService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/diagnose/person")
public class PersonController extends BaseController<PersonPo> {
    @Resource
    private PersonService personService;
    @Override
    public BaseService<PersonPo> getBaseService() {
        return personService;
    }
}
