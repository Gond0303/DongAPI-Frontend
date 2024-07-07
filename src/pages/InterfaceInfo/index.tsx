import { getInterfaceInfoByIdUsingGet } from '@/services/dongapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();

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

  return (
    <PageContainer title="查看接口信息">
      {data ? (
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label="接口状态">{data.status ? '正常' : '关闭中'}</Descriptions.Item>
          <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
        </Descriptions>
      ) : (
        <>接口不存在</>
      )}
    </PageContainer>
  );
};

export default Index;
