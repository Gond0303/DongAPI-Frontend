import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/dongapi-backend/analysisController";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {

  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  const [loading,setLoading] = useState(true);

  // 页面请求只有一次页面加载的时候发送请求用useEffect这个钩子,下面的deps依赖项发生改变的时候就会触发我们这边只要一次就放个空数组不会改变就好了
  useEffect( () => {
    //发出远程调用
    try {
      listTopInvokeInterfaceInfoUsingGet().then(result => {
        if (result.data){
          setData(result.data);
        }
      })
    }catch (e: any){

    }
  },[])

  //映射  { value: 1048, name: 'Search Engine' },
  const chartData = data.map(item => {
    return{
      value : item.totalNum,
      name : item.name,
    }
  })

  //初始数据
  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      // subtext: 'TOP3',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '接口调用次数',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PageContainer>
      <ReactECharts loadingOption={{
        showLoading : loading
      }} option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
