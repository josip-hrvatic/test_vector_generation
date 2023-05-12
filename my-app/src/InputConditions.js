import { Table } from 'antd';
import React, { useState } from 'react';

const InputConditions = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    debugger;

    const handleRowSelection = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const columns = [
        { title: 'Input Condition ID', dataIndex: 'Id', key: 'Id' },
        { title: 'Parameter', dataIndex: 'Parameter', key: 'Parameter' },
        { title: 'Minimum', dataIndex: 'Min', key: 'Min' },
        { title: 'Maximum', dataIndex: 'Max', key: 'Max' },
        { title: 'Time Between Points', dataIndex: 'TimeBetweenPoints', key: 'TimeBetweenPoints' },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data.InputConditions}
                rowKey="Id"
                rowSelection={{
                    selectedRowKeys,
                    onChange: handleRowSelection,
                }}
            />
        </>
    );
};

export default InputConditions;