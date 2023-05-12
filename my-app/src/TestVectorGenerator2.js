import React, { useState } from 'react';
import { Table, Select, Button, Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { saveAs } from 'file-saver';

const { Option } = Select;

interface Vector {
    Index: number;
    Temperature: number;
    Humidity: number;
    'Input voltage': number;
    Frequency: number;
    IsUsed: boolean;
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

const columns = [
    {
        title: 'Index',
        dataIndex: 'Index',
    },
    {
        title: 'IsUsed',
        dataIndex: 'IsUsed',
        render: (value) => (value ? 'TRUE' : 'FALSE'),
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

const TestVectorGenerator2: React.FC = () => {
    const [currentSample, setCurrentSample] = useState(sampleData[0].Id);
    const [selectedColumns, setSelectedColumns] = useState(['Temperature', 'Humidity']);
    const [displayTable, setDisplayTable] = useState(false);
    const [generatedColumns, setGeneratedColumns] = useState(columns);
    const [selectedRows, setSelectedRows] = useState([]);
    const [testVectors, setTestVectors] = useState({
        1: [
            { Index: 1, IsUsed: false, Temperature: -40, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
            // More vectors...
        ],
        2: [
            { Index: 2, IsUsed: false, Temperature: -20, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
            // More vectors...
        ],
        3: [
            { Index: 3, IsUsed: false, Temperature: 0, Humidity: 10, 'Input voltage': 3.3, Frequency: 5 },
            // More vectors...
        ],
    });

    const handleChange = (value: number) => {
        setCurrentSample(value);
    };

    const handleColumnChange = (checkedValues: CheckboxValueType[]) => {
        setSelectedColumns(checkedValues);
    };

    const generateTableData = () => {
        setGeneratedColumns(columns.filter((col) => selectedColumns.includes(col.dataIndex)));
        setDisplayTable(true);
    };

    // Function to handle the "Generate CSV" button click event
    // Function to handle the "Generate CSV" button click event
    const handleGenerateCSV = () => {
        // Filter the testVectors based on the "IsUsed" property
        const selectedTestVectors = testVectors[currentSample].filter((vector) => vector.IsUsed);

        // Prepare the CSV content
        const csvContent = [
            selectedColumns.join(','), // CSV header row
            ...selectedTestVectors.map((vector) =>
                selectedColumns.map((column => column)).join(',')
            ), // CSV data rows
        ].join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Trigger the file download
        saveAs(blob, 'test_vectors.csv');
    };



    const handleRowClick = (record: Vector) => {
        const key = record.Index;
        const updatedTestVectors = {
            ...testVectors,
            [currentSample]: testVectors[currentSample].map((vector) =>
                vector.Index === key ? { ...vector, IsUsed: !vector.IsUsed } : vector
            ),
        };

        setTestVectors(updatedTestVectors);

        const selectedIndex = selectedRows.indexOf(key.toString());
        const updatedSelectedRows = selectedIndex > -1
            ? selectedRows.filter((rowKey) => rowKey !== key.toString())
            : [...selectedRows, key.toString()];

        setSelectedRows(updatedSelectedRows);
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

            <br></br>
            <Checkbox.Group
                options={columns
                    .filter((col) => col.dataIndex !== 'Index' && col.dataIndex !== 'IsUsed')
                    .map((col) => col.title)}
                defaultValue={selectedColumns}
                onChange={handleColumnChange}
                style={{ marginTop: '10px', marginBottom: '10px', display: 'block' }}
            />

            <br></br>
            <br></br>
            <Button type="primary" onClick={generateTableData} style={{ marginBottom: '10px' }}>
                Generate
            </Button>

            <br></br>
            {displayTable && (
                <>
                    <Table
                        dataSource={testVectors[currentSample]}
                        columns={[...columns.filter((col) => col.dataIndex === 'IsUsed' || col.dataIndex === 'Index'), ...generatedColumns]}
                        rowKey="Index"
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                        style={{ marginTop: '20px' }}
                    />
                    <br></br>
                    <Button type="primary" onClick={handleGenerateCSV} style={{ marginBottom: '10px' }}>
                        Generate CSV
                    </Button>
                </>
            )}
        </>
    );

};

export default TestVectorGenerator2;