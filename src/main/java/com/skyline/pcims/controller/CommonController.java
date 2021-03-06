package com.skyline.pcims.controller;

import com.haojiankang.lion.origin.SSTO;
import com.haojiankang.lion.origin.security.RSATools;
import com.haojiankang.lion.origin.util.BeanUtils;
import com.haojiankang.lion.sysmgr.util.DataDictionaryUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/common")
public class CommonController {

	protected static Log LOG = LogFactory.getLog(CommonController.class);
	private static Long TOKEN = System.currentTimeMillis();

	@RequestMapping("obtain/{type}/{token}")
	@ResponseBody
	public SSTO<?> obtain(@PathVariable Long token, @PathVariable String type) {
		switch (type) {
		case "dataDic":
			Map<String, Object> dataDic = DataDictionaryUtils.initialization().getCache();
			if (dataDic.hashCode() == token) {
				break;
			}
			return SSTO.structureSucess(dataDic.hashCode() + "", dataDic);
		default:
			return SSTO.structureFail(TOKEN.toString(), "no resource type");
		}

		return SSTO.structureSucess(token.toString(), null);
	}

	@RequestMapping(value = "setting")
	@ResponseBody
	public Object load() {
		Map<String, String> map = BeanUtils.map("state", "true");
		map.put("modulus", RSATools.getPublicKeyModulus());
		map.put("exponent", RSATools.getPublicKeyExponent());
		map.put("publickey", RSATools.getPublicKey());

		return map;
	}

}
