import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {List, message} from "antd";
import {listInterfaceInfoByPageUsingGet} from "@/services/dongapi-backend/interfaceInfoController";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);


  /**
   * 获取初始数据
   * @param current  当前页码
   * @param pageSize 一页显示几条数据
   */
  const loadData = async (current = 1, pageSize = 5)=> {
    setLoading(true)
    try {
      const res = await listInterfaceInfoByPageUsingGet({
          current,
          pageSize
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    }catch (e: any){
      message.error("请求失败,"+e.message);
    }
    setLoading(false);
  }

  /**
   * 监听
   */
  useEffect(() => {
    loadData();
  },[])


  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[<a key={item.id} href={apiLink}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
            )
        }}
        pagination={{
          showTotal(total) {
            return `总数:${total}`;
          },
          //与上面一致
          pageSize: 5,
          total,
          onChange(page, pageSize){
            loadData(page,pageSize)
          },


        }}
      />
    </PageContainer>
  );
};

export default Index;
