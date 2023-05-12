import { List, Checkbox, Card } from 'antd';
import {useState} from 'react';
// Define your data types based on your data structure

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
    return (
        <List
            itemLayout="vertical"
            dataSource={data.InputConditions}
            renderItem={(collection) => (
                <List.Item>
                    <Card title={`Test Point Collection ID: ${collection.Id}`}>
                        <p>Parameter: {collection.Parameter}</p>
                        <p>Minimum: {collection.Min}</p>
                        <p>Typical Value: {collection.Typical}</p>
                        <p>Maximum: {collection.Max}</p>
                        <p>Time Between Points: {collection.TimeBetweenPoints}</p>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default InputConditions;
