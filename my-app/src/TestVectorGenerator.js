import React, { useState } from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;

// Sample Data
const sampleData = [
    {FamilyName:"Aurix", ProductName:"TC3xx", Name:"POR1", Id:1},
    {FamilyName:"Aurix", ProductName:"TC2xx", Name:"SS1", Id:2},
    {FamilyName:"Aurix", ProductName:"TC2xx", Name:"POR1", Id:3}
];

// Test Vectors for each sample
const testVectors = {
    1: [
        {Index: 1, Temperature: -40, Humidity: 10, "Input voltage": 3.3, Frequency: 5},
        // More vectors...
    ],
    2: [
        {Index: 2, Temperature: -20, Humidity: 10, "Input voltage": 3.3, Frequency: 5},
        // More vectors...
    ],
    3: [
        {Index: 3, Temperature: 0, Humidity: 10, "Input voltage": 3.3, Frequency: 5},
        // More vectors...
    ]
};

const TestVectorGenerator: React.FC = () => {
    const [currentSample, setCurrentSample] = useState(sampleData[0].Id);

    const columns = [
        {
            title: 'Index',
            dataIndex: 'Index',
        },
        {
            title: 'Temperature',
            dataIndex: 'Temperature',
        },
        {
            title: 'Humidity',
            dataIndex: 'Humidity',
        },
        {
            title: 'Input voltage',
            dataIndex: 'Input voltage',
        },
        {
            title: 'Frequency',
            dataIndex: 'Frequency',
        },
    ];

    const handleChange = (value: number) => {
        setCurrentSample(value);
    };

    return (
        <>
            <Select defaultValue={currentSample} style={{ width: 120 }} onChange={handleChange}>
                {sampleData.map(sample =>
                    <Option value={sample.Id} key={sample.Id}>{sample.Name}</Option>
                )}
            </Select>

            <Table
                dataSource={testVectors[currentSample]}
                columns={columns}
                rowKey="Index"
                pagination={false}
                style={{ marginTop: '20px' }}
            />
        </>
    );
};

export default TestVectorGenerator;
