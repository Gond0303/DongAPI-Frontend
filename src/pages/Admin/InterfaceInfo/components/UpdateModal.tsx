import {ProTable, type ProColumns, ProFormInstance} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  updateModalOpen: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  //定义属性
  const { values, columns, onCancel, onSubmit, updateModalOpen } = props;


  const formRef = useRef<ProFormInstance>()
  //监听数据发生改变时执行
  useEffect(() => {
    formRef.current?.setFieldsValue(values);
  },[values])

  return (
    <Modal
      visible={updateModalOpen}
      onCancel={() => {
        onCancel?.();
      }}
      footer={null}
    >
      <ProTable
        type="form"
        formRef={formRef}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
