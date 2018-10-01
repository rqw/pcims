package com.skyline.pcims.service.impl;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.haojiankang.lion.origin.mvc.dao.BaseDao;
import com.haojiankang.lion.origin.mvc.service.BaseServiceImpl;
import com.skyline.pcims.dao.PersonDao;
import com.skyline.pcims.po.PersonPo;
import com.skyline.pcims.service.PersonService;
@Service
public class PersonServiceImpl extends BaseServiceImpl<PersonPo> implements PersonService {
    @Resource
    private PersonDao personDao;
    @Override
    public BaseDao<PersonPo, Serializable> getBaseDao() {
        return personDao;
    }
}
