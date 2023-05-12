import { Table, Checkbox, Modal, InputNumber, Button, Input } from 'antd';
import { useEffect, useState } from 'react';

interface InputCondition {
    Parameter: string;
    Min: number;
    Typical: number;
    Max: number;
    TimeBetweenPoints: number;
    Id: number;
}
interface InputConditionsProps {
    data: {
        InputConditions: InputCondition[];
    };
}

const InputConditions: React.FC<InputConditionsProps> = ({ data }) => {
    data = data.Project

    console.log(data);
    
    const [checked, setChecked] = useState<number[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [newValue, setNewValue] = useState<any>(null);
    const [currentColumn, setCurrentColumn] = useState<string>('');
    const [fetchedData, setFetchedData] = useState<any>(null); // State for storing the fetched data

    /*
    useEffect(() => {
        const fetchInitialData = async () => {
          try {
            const _data = await fetchInputConditions(); // Fetch data using the fetchData function
            setFetchedData(_data);
          } catch (error) {
            console.error('Error fetching initial data:', error);
          }
        };
    
        fetchInitialData();
      }, []);
      */
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
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
            render: (value: number) => <>{value}</>
        },
        {
            title: 'Parameter',
            dataIndex: 'Parameter',
            key: 'ParameterId',
            render: (value: string) => <Button type="link" onClick={() => handleValueClick(value, 'InputConditionId')}>{value}</Button>
        },
        {
            title: 'Minimum',
            dataIndex: 'Min',
            key: 'MinId',
            render: (value: number) => <Button type="link" onClick={() => handleValueClick(value, 'SampleIds')}>{value}</Button>
        },
        {
            title: 'Maximum',
            dataIndex: 'Max',
            key: 'MaximumId',
            render: (value: number) => <Button type="link" onClick={() => handleValueClick(value, 'SampleIds')}>{value}</Button>
        },
        {
            title: 'Time Between Points',
            dataIndex: 'TimeBetweenPoints',
            key: 'TimeBetweenPointsId',
            render: (value: number) => <Button type="link" onClick={() => handleValueClick(value, 'SampleIds')}>{value}</Button>
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
            <Table columns={columns} dataSource={data.InputConditions} rowKey="Id" />

            <Modal title={`Change ${currentColumn} value`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Current value: {currentValue}</p>
                <p>New value: 
                    {<InputNumber min={0} value={newValue} onChange={setNewValue} />}
                </p>
            </Modal>
        </>
    );
};

export default InputConditions;
