/** 
 * Project Name:EHealthData 
 * File Name:SystemTypeLogin.java 
 * Package Name:com.ghit.ecg.sysmgr.service.impl 
 * Date:2016年8月16日下午1:10:31  
*/

package com.skyline.pcims.utils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.ghit.basic.sysmgr.pojo.po.User;
import com.ghit.basic.sysmgr.service.UserMgr;
import com.ghit.basic.sysmgr.service.UserService;
import com.ghit.basic.sysmgr.utils.SharpSysmgr;
import com.ghit.common.Sharp;
import com.ghit.common.security.SecurityCoreManager;
import com.ghit.common.security.Session;
import com.ghit.common.security.model.SecurityUser;
import com.ghit.common.util.StringUtil;
import com.ghit.usis.usms.client.UsmsClientService;

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
public class Md5UserMgrImpl implements UserMgr, UsmsClientService {
	@Resource
	protected UserService service;

	@Override
	public com.ghit.common.security.model.IUser login(User user) {
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
			Sharp.error("原密码不正确，请检查你的输入，修改密码不成功!");
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
			Sharp.error("输入的邮箱信息和注册的邮箱信息不符，不能重置密码。\r\n如有疑问请联系系统管理员。");
		}
		return status;
	}

	private String randPassword() {
		return Long.toString(System.currentTimeMillis() / 8 * 9, 16);
	}

	@Override
	public boolean loginByName(String loginName, String token, HttpServletRequest request,
			HttpServletResponse response) {
		User findUser = service.findUsersByName(loginName);
		if (findUser != null) {
			SecurityUser currentUser = SharpSysmgr.convertUser(findUser);
			Session currentSession = Sharp.getCurrentSession(request, response);
			currentSession.currentUser(currentUser);
			currentSession.token(token);
			return true;
		}
		return true;
	}

	@Override
	public boolean loginOutByToken(String token) {
		SecurityCoreManager.manager().getSessionManager().getSessionByToken(token).currentUser(null);
		return true;
	}

}
