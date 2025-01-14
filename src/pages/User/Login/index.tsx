import { Footer } from '@/components';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined, MailOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {
  getCaptchaUsingGet,
  userEmailLoginUsingPost,
  userLoginUsingPost
} from "@/services/dongapi-backend/userController";
import {Link} from "@@/exports";
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState,setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  //登录验证公共方法
  const doLogin = (res: any) => {
    if (res.data && res.code === 0){
      message.success("登录成功");
      //1.因为组件销毁了还在设置状态（setState方法是异步更新的），所以不延迟跳转的话会直接跳转.还可以用flushSync 但不推荐
      setTimeout(() => {
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      },100)
      //2.设置登录状态
      setInitialState({
        //用户数据
        loginUser: res.data,
        //页面样式
        settings: Settings
      });

    }
  }

  //账号密码登录
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      //使用公共登录验证
     doLogin(res);
    } catch (error: any) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log("超市菜市场:",error);
      console.log("超市菜市场:",error.message);
      message.error(error.message);
    }
  };

  //邮箱登录
  const handleEmailSubmit = async (values: API.UserEmailLoginRequest) => {
    try {
      // 登录
      const res = await userEmailLoginUsingPost({
        ...values,
      });
     //使用公共登录验证
      doLogin(res);

    } catch (error: any) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log("超市菜市场:",error.message);
      message.error(error.message);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录页'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.gif" />}
          title="Dong-API 接口开放平台"
          subTitle={'Dong-API 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            autoLogin: true,
          }}
          actions={['其他登录方式', <ActionIcons key="icons" />]}

          onFinish={async (values) => {
            if (type === "account"){
              console.log("账号密码登录:",values);
              await handleSubmit(values as API.UserLoginRequest);
            } else {
              console.log("qq邮箱登录:",values);
              await handleEmailSubmit(values as API.UserEmailLoginRequest);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'email',
                label: '邮箱登录',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'账户或密码错误(admin/ant.design)'} />
          )}


          {/*账号密码登录type === 'account'*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号不能为空!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码不能为空！',
                  },
                ]}
              />
            </>
          )}



          {status === 'error' && loginType === 'email' && <LoginMessage content="验证码错误" />}

          {/*验证码登录type === 'email'*/}
          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="emailAccount"
                placeholder={'邮箱号码'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱！',
                  },
                  {
                    pattern: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
                    message: '邮箱格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                //todo
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                phoneName={"emailAccount"}
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (emailAccount) => {
                  console.log("测试测试测试:",emailAccount);
                  const result = await getCaptchaUsingGet({
                    emailAccount,
                  });
                  if (result.data && result.code === 0) {
                    message.success("验证码发送成功");
                    return
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link
              to={'/user/register'}
              style={{
                float: 'right',
              }}
            >
              还没有密码？前往去注册
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
