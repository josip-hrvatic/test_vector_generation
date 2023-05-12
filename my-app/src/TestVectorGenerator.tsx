import { useState } from 'react';
import { Table, Select, Button, Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const { Option } = Select;

interface Vector {
    Temperature: number;
    Humidity: number;
    'Input voltage': number;
    Frequency: number;
}

interface VectorsProps {
    data: {
        VectorsCollection: Vector[];
    };
}

// Sample Data
const sampleData = [
    { FamilyName: 'Aurix', ProductName: 'TC3xx', Name: 'POR1', Id: 1 },
    { FamilyName: 'Aurix', ProductName: 'TC2xx', Name: 'SS1', Id: 2 },
    { FamilyName: 'Aurix', ProductName: 'TC2xx', Name: 'POR1', Id: 3 },
];

// Test Vectors for each sample
const testVectors = {
    1: [
        { Index: 1, Temperature: -40, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
        // More vectors...
    ],
    2: [
        { Index: 2, Temperature: -20, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
        // More vectors...
    ],
    3: [
        { Index: 3, Temperature: 0, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
        // More vectors...
    ],
};


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

const TestVectorGenerator: React.FC = () => {
    const [currentSample, setCurrentSample] = useState(sampleData[0].Id);
    const [selectedColumns, setSelectedColumns] = useState<CheckboxValueType[]>(['Index', 'Temperature', 'Humidity']);
    const [displayTable, setDisplayTable] = useState(false);
    const [generatedColumns, setGeneratedColumns] = useState(columns);

    const handleChange = (value: number) => {
        setCurrentSample(value);
    };

    const handleColumnChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedColumns(checkedValues);
    };

    const generateTableData = () => {
        setGeneratedColumns(columns.filter((col) => selectedColumns.includes(col.dataIndex as string)));
        setDisplayTable(true);
    };

    return (
        <>
            <Select defaultValue={currentSample} style={{ width: 120 }} onChange={handleChange}>
                {sampleData.map((sample) => (
                    <Option value={sample.Id} key={sample.Id}>
                        {sample.Name}
                    </Option>
                ))}
            </Select>

            <Checkbox.Group
                options={columns.map((col) => col.title)}
                defaultValue={selectedColumns}
                onChange={handleColumnChange}
                style={{ marginTop: '10px', marginBottom: '10px', display: 'block' }}
            />

            <Button type="primary" onClick={generateTableData} style={{ marginBottom: '10px' }}>
                Generate
            </Button>

            {displayTable && (
                <Table
                    dataSource={testVectors[currentSample]}
                    columns={generatedColumns.filter((col) => selectedColumns.includes(col.dataIndex as string))}
                    rowKey="Index"
                    pagination={false}
                    style={{ marginTop: '20px' }}
                />
            )}
        </>
    );
};

export default TestVectorGenerator;
