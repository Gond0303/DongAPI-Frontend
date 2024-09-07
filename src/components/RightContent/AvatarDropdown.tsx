import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';

import Settings from '../../../config/defaultSettings';
import { valueLength } from '@/pages/User/UserInfo';

import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { userLogoutUsingPost } from '@/services/dongapi-backend/userController';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

/**
 * 展示用户名
 * @constructor
 */
export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  return (
    <span className="anticon">
      {valueLength(loginUser?.userName) ? loginUser?.userName : '去取个名字吧'}
    </span>
  );
};

/**
 *  头像功能
 * @param children
 * @constructor
 */
export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({  children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    //后端移除用户的登录态
    await userLogoutUsingPost();
    // 从当前URL中解构出查询字符串(search)和路径名(pathname)
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    console.log('退出的redirect路径：', redirect);
    console.log('退出的search字符串：', search);
    console.log('退出的pathname路径名：', pathname);
    console.log('退出的urlParams：', urlParams);
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      if (initialState?.settings.navTheme === 'light') {
        setInitialState({ loginUser: {}, settings: { ...Settings, navTheme: 'light' } });
      } else {
        setInitialState({ loginUser: {}, settings: { ...Settings, navTheme: 'realDark' } });
      }

      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  /**
   * menu点击后
   */
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, loginUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'login'){
        history.push(`/user/login`);
        return;
      }
      //todo 做用户中心
      if (key === 'center'){
        history.push(`/account/${key}`);
        return;
      }
    },
    [setInitialState],
  );


  /*加载中，不需要了
  const loading = (
    <span>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  if (!loginUser) {
    return loading;
  }*/

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    // 分隔符
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  //有登录的话拿上面的menu：个人中心和退出。没有的话展示一个登录
  return (
    loginUser ?
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown> :
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: [{
            key: 'login',
            icon: <LoginOutlined />,
            label: '登录账号',
          }],
        }}
      >
        {children}
      </HeaderDropdown>
  );
};
