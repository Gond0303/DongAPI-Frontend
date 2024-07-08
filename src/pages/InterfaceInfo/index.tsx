import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/dongapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, Descriptions, Divider, Form, Input, message, Spin} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();

  const [invokeData,setInvokeData] = useState<any>();
  const [invokeLoading,setInvokeLoading] = useState(false);

  const params = useParams();

  /**
   * 获取初始数据
   */
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    //等待
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (e: any) {
      message.error('请求失败,' + e.message);
    }
    setLoading(false);
  };

  /**
   * 监听
   */
  useEffect(() => {
    loadData();
  }, []);


  /**
   * 提交
   * @param values
   */
  const onFinish =  async (values: any) => {
    if (!params.id){
      message.error("接口不存在");
      return;
    }

    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      message.success("调用成功");
      setInvokeData(res.data);
    }catch (e : any){
      message.error("调用失败:" + e.message);
    }
    setInvokeLoading(false);

  };

  return (
    <PageContainer title="查看接口信息">
      <Card>
        {data ? (
          <Descriptions title={data?.name} column={1}>
            <Descriptions.Item label="接口状态">
              {data.status ? '正常' : '关闭中'}
            </Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>

      <Divider/>

      <Card title={"在线测试"}>
        <Form name="invoke" onFinish={onFinish} layout="vertical">
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Divider/>

      <Card title={"返回结果"} loading={invokeLoading}>
        {/*
        等待
        <Spin spinning={!invokeLoading}/>
        */}

        {invokeData}
      </Card>
    </PageContainer>
  );
};

export default Index;
