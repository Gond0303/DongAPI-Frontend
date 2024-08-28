export default [
  { path: '/', name: '主页', icon: 'smile', component: './Index' },

  // 动态路由，携带id
  {
    path: '/interface_info/:id',
    name: '查看接口',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },

  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      {
        name: '注册账号',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },

  //接口广场
  {
    path: '/interface/list',
    name: '接口广场',
    icon: 'RobotOutlined',
    component: './InterfaceSquare',
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/interface_info',
        icon: 'table',
        component: './Admin/InterfaceInfo',
        name: '接口管理',
      },
      {
        path: '/admin/interface_analysis',
        icon: 'analysis',
        component: './Admin/InterfaceAnalysis',
        name: '接口分析',
      },
    ],
  },

  // {path: '/', redirect: '/intserfaceInfo'},
  { path: '*', layout: false, component: './404' },
];
