import { Footer } from '@/components';
import {
  AlipayCircleOutlined,
  LinkOutlined,
  LockOutlined, MailOutlined,
  MobileOutlined,
  RedditOutlined,
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
import { message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {
  getCaptchaUsingGet,
  userEmailLoginUsingPost, userEmailRegisterUsingPost,
  userLoginUsingPost, userRegisterUsingPost,
} from '@/services/dongapi-backend/userController';
import { Link } from '@@/exports';

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

const Register: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState,setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  //注册验证公共方法
  const doRegister = (res: any) => {
    if (res.data && res.code === 0){
      message.success("注册成功");
      //1.因为组件销毁了还在设置状态（setState方法是异步更新的），所以不延迟跳转的话会直接跳转.还可以用flushSync 但不推荐
      setTimeout(() => {
        history.push('/user/login');
      },100)
    }
  }

  //账号密码注册
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      const res = await userRegisterUsingPost({
        ...values,
      });
      //使用公共注册验证
     doRegister(res);
    } catch (error: any) {
      // const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log("注册失败:",error.message);
      message.error(error.message);
    }
  };

  //邮箱注册
  const handleEmailSubmit = async (values: API.UserEmailRegister) => {
    try {
      // 注册
      const res = await userEmailRegisterUsingPost({
        ...values,
      });
     //使用公共注册验证
      doRegister(res);

    } catch (error: any) {
      // const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log("超市菜市场:",error.message);
      message.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册页'}- {Settings.title}
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
          submitter={
            {
              searchConfig: {
                submitText: "注册"
              }
            }}
          logo={<img alt="logo" src="/logo.gif" />}
          title="Dong-API 接口开放平台"
          subTitle={'Dong-API 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            autoLogin: true,
          }}
          actions={['其他注册方式', <ActionIcons key="icons" />]}

          onFinish={async (values) => {
            if (type === "account"){
              console.log("账号密码注册:",values);
              await handleSubmit(values as API.UserRegisterRequest);
            } else {
              console.log("邮箱注册:",values);
              await handleEmailSubmit(values as API.UserEmailRegister);
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
                label: '平台账号注册',
              },
              {
                key: 'email',
                label: '邮箱注册',
              },
            ]}
          />



          {/*账号密码注册type === 'account'*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <RedditOutlined/>,
                }}
                placeholder={'请输入昵称'}
                rules={[
                  {
                    required: true,
                    message: '昵称不能为空!',
                  },
                ]}
              />

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

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码不能为空！',
                  },
                ]}
              />

              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LinkOutlined />,
                }}
                placeholder={'请输入邀请码: 没有可不填'}
              />
            </>
          )}


          {/*验证码注册type === 'email'*/}
          {type === 'email' && (
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <RedditOutlined/>,
                }}
                placeholder={'请输入昵称'}
                rules={[
                  {
                    required: true,
                    message: '昵称不能为空!',
                  },
                ]}
              />

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

              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LinkOutlined />,
                }}
                placeholder={'请输入邀请码: 没有可不填'}
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
              自动注册
            </ProFormCheckbox>
            <Link
              to={'/user/login'}
              style={{
                float: 'right',
              }}
            >
              已经有账号？前往去登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
