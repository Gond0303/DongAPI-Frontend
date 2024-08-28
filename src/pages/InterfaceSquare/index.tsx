import { PageContainer } from '@ant-design/pro-components';
import React, {useState} from 'react';


/**
 * 接口广场页
 * @constructor
 */
const InterfaceSquare: React.FC = () => {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState<boolean>(false);

 /* const loadData = async ()=>{
    setLoading(true);
    const res = await
  }*/


  return (
    <PageContainer>
    </PageContainer>
  );
};

export default InterfaceSquare;
