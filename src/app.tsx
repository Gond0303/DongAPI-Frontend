import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { valueLength } from '@/pages/User/UserInfo';
import { getLoginUserUsingGet } from '@/services/dongapi-backend/userController';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import Settings from '../config/defaultSettings';
import logo from '../public/logo.gif';
import { requestConfig } from './requestConfig';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

//当页面首次加载时候，获取要全局缓存的数据，比如用户登录信息
const stats: InitialState = {
  loginUser: undefined,
  settings: Settings,
  open: false,
};

/**
 * @see 获取用户状态：是否登录，登录则存储用户信息到stats.loginUser中，没有登录跳转回登录页面
 * */
export async function getInitialState(): Promise<InitialState> {
  // console.log("aaa", 'color:#e59de3')
  try {
    // console.log("bbb", 'color:#e59de3')
    const res = await getLoginUserUsingGet();
    // console.log("res数据",res)
    if (res.data && res.code === 0) {
      stats.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return stats;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />],
    waterMarkProps: {
      content: initialState?.loginUser?.userName,
    },
    logo: logo,
    avatarProps: {
      src: valueLength(initialState?.loginUser?.userAvatar)
        ? initialState?.loginUser?.userAvatar
        : 'https://dongapi.oss-cn-hangzhou.aliyuncs.com/notLogin.png',
      //<AvatarName />组件会获取到名字
      title: initialState?.loginUser ? <AvatarName /> : '游客',
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },

    //todo 后面看情况要不要加个底部功能按钮
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (
        !initialState?.loginUser &&
        !/^\/\w+\/?$/.test(location.pathname) &&
        location.pathname !== '/' &&
        location.pathname !== '/interface/list' &&
        !location.pathname.includes('/interface_info/')
      ) {
        history.push(loginPath);
      }
    },


    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
