import { Table, Checkbox, Modal, InputNumber, Button, Input } from 'antd';
import { useState } from 'react';

interface TestPoint {
    Value: number;
    Unit: string;
}

interface TestPointCollection {
    InputConditionId: number;
    SampleIds: number[];
    TestPoints: TestPoint[];
    Id: number;
}

interface TestPointCollectionsProps {
    data: {
        TestPointCollections: TestPointCollection[];
    };
}

const TestPointCollections: React.FC<TestPointCollectionsProps> = ({ data }) => {
    const [checked, setChecked] = useState<number[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [newValue, setNewValue] = useState<any>(null);
    const [currentColumn, setCurrentColumn] = useState<string>('');

    const handleToggle = (value: number) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleValueClick = (value: any, column: string) => {
        setCurrentValue(value);
        setCurrentColumn(column);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('New value:', newValue);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Input Condition ID',
            dataIndex: 'InputConditionId',
            key: 'InputConditionId',
            render: (value: number) => <Button type="link" onClick={() => handleValueClick(value, 'InputConditionId')}>{value}</Button>
        },
        {
            title: 'Sample IDs',
            dataIndex: 'SampleIds',
            key: 'SampleIds',
            render: (sampleIds: number[]) => <Button type="link" onClick={() => handleValueClick(sampleIds, 'SampleIds')}>{sampleIds.join(', ')}</Button>
        },
        {
            title: 'Test Points',
            dataIndex: 'TestPoints',
            key: 'TestPoints',
            render: (testPoints: TestPoint[]) => 
                testPoints.map((point, index) => (
                    <Button type="link" key={index} onClick={() => handleValueClick(point.Value, 'TestPoints')}>
                        {`${point.Value}${point.Unit}`}
                    </Button>
                ))
        },
        {
            title: 'Toggle',
            dataIndex: 'Id',
            key: 'Toggle',
            render: (id: number) => (
                <Checkbox
                    onChange={() => handleToggle(id)}
                    checked={checked.includes(id)}
                />
            )
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={data.TestPointCollections} rowKey="Id" />

            <Modal title={`Change ${currentColumn} value`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Current value: {currentValue}</p>
                <p>New value: 
                    {currentColumn === 'SampleIds' || currentColumn === 'TestPoints'
                        ? <Input onChange={e => setNewValue(e.target.value)} />
                        : <InputNumber min={0} value={newValue} onChange={setNewValue} />
                    }
                </p>
            </Modal>
        </>
    );
};
export default TestPointCollections;