import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
/**
 * {
 *   "navTheme": "light",
 *   "layout": "top",
 *   "contentWidth": "Fixed",
 *   "fixedHeader": false,
 *   "fixSiderbar": true,
 *   "colorPrimary": "#1677FF",
 *   "splitMenus": false
 * }
 */

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  navTheme?: string
} = {
  navTheme: 'light',
  colorPrimary: "#1677FF",
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: false,
  title: 'Dong-API 接口开放平台',
  pwa: false,
  // logo: 'https://img.qimuu.icu/typory/logo.gif',
  iconfontUrl: "https://dongapi.oss-cn-hangzhou.aliyuncs.com/logo.gif",
};

export default Settings;
