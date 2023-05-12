import { List, Checkbox, Card } from 'antd';
import {useState} from 'react';
// Define your data types based on your data structure
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

    return (
        <List
            itemLayout="vertical"
            dataSource={data.TestPointCollections}
            renderItem={(collection) => (
                <List.Item>
                    <Card title={`Test Point Collection ID: ${collection.Id}`}>
                        <p>Input Condition ID: {collection.InputConditionId}</p>
                        <p>Sample IDs: {collection.SampleIds.join(', ')}</p>
                        <p>Test Points:</p>
                        <ul>
                            {collection.TestPoints.map((point, index) => (
                                <li key={index}>{`Value: ${point.Value}, Unit: ${point.Unit}`}</li>
                            ))}
                        </ul>
                        <Checkbox
                            onChange={() => handleToggle(collection.Id)}
                            checked={checked.includes(collection.Id)}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default TestPointCollections;
