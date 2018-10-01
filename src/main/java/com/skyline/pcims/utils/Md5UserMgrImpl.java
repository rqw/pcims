/** 
 * Project Name:EHealthData 
 * File Name:SystemTypeLogin.java 
 * Package Name:com.ghit.ecg.sysmgr.service.impl 
 * Date:2016年8月16日下午1:10:31  
*/

package com.skyline.pcims.utils;

import com.haojiankang.lion.origin.Sharp;
import com.haojiankang.lion.origin.security.model.IUser;
import com.haojiankang.lion.origin.security.model.SecurityUser;
import com.haojiankang.lion.origin.util.StringUtil;
import com.haojiankang.lion.sysmgr.pojo.po.User;
import com.haojiankang.lion.sysmgr.service.UserMgr;
import com.haojiankang.lion.sysmgr.service.UserService;
import com.haojiankang.lion.sysmgr.util.SharpSysmgr;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * ClassName:SystemTypeLogin <br>
 * Function: TODO ADD FUNCTION. <br>
 * Date: 2016年8月16日 下午1:10:31 <br>
 * 
 * @author ren7wei
 * @version
 * @since JDK 1.8
 * @see
 */
@Service("md5UserMgr")
public class Md5UserMgrImpl implements UserMgr {
	@Resource
	protected UserService service;

	@Override
	public IUser login(User user) {
		SecurityUser currentUser = null;
		User findUser = service.findUsersByName(user.getUserName());
		if (findUser == null)
			return null;
		user.setCreateTime(findUser.getCreateTime());
		user.setPassword(Sharp.md5(user.getPassword()));
		if (findUser != null && StringUtil.eq(findUser.getPassword(), user.getPassword())) {
			currentUser = SharpSysmgr.convertUser(findUser);
		}
		return currentUser;
	}

	@Override
	public boolean modifyPassword(String oldPwd, String newPwd) {
		User usrIn = new User();
		usrIn.setId(Sharp.currentUser().getId());
		User user = service.findById(usrIn);
		if (!StringUtil.eq(user.getPassword(),
				Sharp.UrlRSAToHash(oldPwd, String.valueOf(user.getCreateTime().getTime())))) {
			Sharp.message("原密码不正确，请检查你的输入，修改密码不成功!");
			return false;
		}
		user.setPassword(Sharp.UrlRSADecrypt(newPwd));
		SharpSysmgr.userPwdMd5(user);
		return true;
	}

	@Override
	public boolean resetPassword(User user) {
		User findUser = service.findUsersByName(user.getUserName());
		boolean status = false;
		if (StringUtil.eq(user.getMail(), findUser.getMail())) {
			String newPassword = randPassword();
			findUser.setPassword(newPassword);
			user.setPassword(newPassword);
			SharpSysmgr.userPwdMd5(findUser);
			status = true;
		} else {
			Sharp.message("输入的邮箱信息和注册的邮箱信息不符，不能重置密码。\r\n如有疑问请联系系统管理员。");
		}
		return status;
	}

	private String randPassword() {
		return Long.toString(System.currentTimeMillis() / 8 * 9, 16);
	}


}
