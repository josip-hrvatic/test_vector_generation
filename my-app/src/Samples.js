import { Table } from 'antd';
import React from 'react';

const Samples = ({ data }) => {
    const columns = [
        { title: 'Sample ID', dataIndex: 'Id', key: 'Id' },
        { title: 'Family Name', dataIndex: 'FamilyName', key: 'FamilyName' },
        { title: 'Product Name', dataIndex: 'ProductName', key: 'ProductName' },
        { title: 'Name', dataIndex: 'Name', key: 'Name' },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data.Project.Samples}
            rowKey="Id"
        />
    );
};

export default Samples;
