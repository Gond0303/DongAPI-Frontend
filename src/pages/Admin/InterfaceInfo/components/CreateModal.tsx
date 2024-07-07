import { ProTable, type ProColumns } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  createModalOpen: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  //定义属性
  const { columns, onCancel, onSubmit, createModalOpen } = props;
  return (
    <Modal
      visible={createModalOpen}
      onCancel={() => {
        onCancel?.();
      }}
      footer={null}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
