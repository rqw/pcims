package com.skyline.pcims.controller;

import com.ghit.common.mvc.controller.BaseController;
import com.ghit.common.mvc.service.BaseService;
import com.skyline.pcims.po.StorageInvoicePo;
import com.skyline.pcims.service.StorageInvoiceService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/durgs/storage/invoice")
public class StorageInvoiceController extends BaseController<StorageInvoicePo> {
    @Resource
    private StorageInvoiceService storageInvoiceService;
    @Override
    public BaseService<StorageInvoicePo> getBaseService() {
        return storageInvoiceService;
    }
}
