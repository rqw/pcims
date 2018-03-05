package com.skyline.pcims.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.ghit.common.mvc.dao.BaseDaoImpl;
import com.skyline.pcims.dao.PersonDao;
import com.skyline.pcims.po.PersonPo;
@Repository
public class PersonDaoImpl extends BaseDaoImpl<PersonPo,Serializable> implements PersonDao {
}
