import React, { useEffect, useState } from 'react';
import {Badge, Card, Image, List, message, Spin} from 'antd';
import {
  listInterfaceInfoByPageUsingGet,
  listInterfaceInfoBySearchTextPageUsingPost
} from '@/services/dongapi-backend/interfaceInfoController';
import ProCard from '@ant-design/pro-card';
import Search from 'antd/es/input/Search';
import {history} from "@umijs/max";

/**
 * 主页
 * @constructor
 */
const InterfaceSquare: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageSize] = useState<number>(10);


  /**
   * 获取初始数据
   * @param current  当前页码  -> 1
   *  pageSize 一页显示几条数据 -> 10
   */
  const loadData = async (current = 1)=> {
    setLoading(true);
    try {
      /**
       * 排序顺序：降序
       * 排序字段：根据调用次数降序，从大到小
       * 描述：输入框数据，
       * 名字：输入框数据
       */
      const res = await listInterfaceInfoByPageUsingGet({
        current: current,
        pageSize: pageSize,
        name: searchText,
        sortOrder: 'descend',
        sortField: 'totalInvokes',
        description: searchText
      });
      if (res.code === 0 && res.data){
        setList(res?.data?.records ?? []);
        setTotal(res?.data?.total ?? 0);
        setLoading(false);
      }else {
        message.error(res.message);
        setLoading(false);
      }
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

  /**
   * 搜索框
   */
  const onSearch = async () => {
    const res = await listInterfaceInfoBySearchTextPageUsingPost({
      current: 1,
      pageSize: pageSize,
      searchText: searchText,
      sortOrder: 'descend',
      sortField: 'totalInvokes',
    });
    if (res.data) {
      setList(res?.data?.records || []);
      setTotal(res?.data?.total || 0)
    }else{
      message.error(res.message);
    }
  };


  return (
    <>
      <Card hoverable>
        <ProCard layout="center">
          <Search
            showCount
            value={searchText}
            onChange={(e) => {
              // console.log("e:",e);
              // console.log("e.target:",e.target);
              // console.log("e.target.value:",e.target.value);
              setSearchText(e.target.value);
            }}
            allowClear
            size={"large"}
            maxLength={50}
            enterButton="搜索"
            placeholder={"没有找到心仪的接口？快搜索一下吧"}
            onSearch={onSearch}
            style={{maxWidth: 600, height: 60}}/>
        </ProCard>
      </Card>
      <br/>
      <Spin spinning={loading}>
        <List
          pagination={{
            showTotal(total) {
              return `总数:${total}`;
            },
            //与上面一致
            pageSize: pageSize,
            total,
            onChange(page){
              loadData(page)
            },
          }}

          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 5,
            xxl: 6
          }}

          dataSource={list}
         /* renderItem={(item,index) => {
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
          }}*/
          renderItem={(item,index) => {
            // console.log("item:",item)
            return (
              <List.Item>
                <ProCard key={index} bordered hoverable direction="column" style={{height: 270}}>
                  <ProCard layout="center" onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }}>
                    <Badge count={item.totalInvokes} overflowCount={999999999} color='#eb4d4b'>
                      <Image style={{width: 80, borderRadius: 8, marginLeft: 10}}
                             src={item?.avatarUrl ?? "https://img.qimuu.icu/typory/logo.gif"}
                             fallback={"https://img.qimuu.icu/typory/logo.gif"}
                             alt={item.name}
                             preview={false}
                      />
                    </Badge>
                  </ProCard>
                  <ProCard onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }} layout="center" style={{marginTop: -10, fontSize: 16}}>
                    {item.name}
                  </ProCard>

                  <ProCard onClick={() => {
                    history.push(`/interface_info/${item.id}`)
                  }} layout="center" style={{marginTop: -18, fontSize: 14}}>
                    {!item.description ? "暂无接口描述" : item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description}
                  </ProCard>
                </ProCard>
              </List.Item>
            )
          }}


        />
      </Spin>
    </>
  );
};

export default InterfaceSquare;
