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

interface SampleData {
    FamilyName: string;
    ProductName: string;
    Name: string;
    Id: number;
}

interface TestPointCollection {
    SampleIds: number[];
    InputConditionId: string;
    TestPoints: any[];
}

interface TestVectorGeneratorProps {
    data: {
        TestPointCollections: TestPointCollection[];
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
        title: 'IsUsed',
        dataIndex: 'IsUsed',
        render: (value) => (value ? 'Yes' : 'No'),
        defaultChecked: false, // Add defaultChecked property
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

const TestVectorGenerator: React.FC = (data) => {
    const [currentSample, setCurrentSample] = useState(sampleData[0].Id);
    const [selectedColumns, setSelectedColumns] = useState<CheckboxValueType[]>(['Temperature', 'Humidity']);
    const [displayTable, setDisplayTable] = useState(false);
    const [generatedColumns, setGeneratedColumns] = useState(columns);

    const handleChange = (value: number) => {
        setCurrentSample(value);
    };

    const handleColumnChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedColumns(checkedValues);
    };

    function cartesianProduct(arrays) {
        return arrays.reduce(
            (a, b) =>
                a.flatMap((x) => b.map((y) => [...x, y])),
            [[]]
        );
    }

    const generateTableData = () => {
        setGeneratedColumns(columns.filter((col) => selectedColumns.includes(col.dataIndex)));
        setDisplayTable(true);

        const inputTestPoints = {}
        /*for (let i = 0; i < data.TestPointCollections.length; i++) {
            if (data.TestPointCollections[i].SampleIds.includes(currentSample)) {
                if (data.TestPointCollections[i].InputConditionId in inputTestPoints)
                    inputTestPoints[data.TestPointCollections[i].InputConditionId].push(data.TestPointCollections[i].TestPoints);
                else
                    inputTestPoints[data.TestPointCollections[i].InputConditionId] = data.TestPointCollections[i].TestPoints;
            }
        }
        const keys = Object.keys(inputTestPoints);
        const values = Object.values(inputTestPoints);

        //Calculate the cartesian product of the arrays
        const cartesianValues = cartesianProduct(values);
        console.log(cartesianValues)*/
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
                options={columns
                    .filter((col) => col.dataIndex !== 'Index' && col.dataIndex !== 'IsUsed')
                    .map((col) => col.title)}
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
                    columns={[...columns.filter((col) => col.dataIndex === 'IsUsed' || col.dataIndex === 'Index'), ...generatedColumns]}
                    rowKey="Index"
                    pagination={false}
                    style={{ marginTop: '20px' }}
                />
            )}
        </>
    );

};

export default TestVectorGenerator;