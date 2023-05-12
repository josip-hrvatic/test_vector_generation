import React, { useState } from 'react';
import { List, Checkbox } from 'antd';

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
            itemLayout="horizontal"
            dataSource={data.TestPointCollections}
            renderItem={(collection) => (
                <List.Item>
                    <List.Item.Meta
                        title={`Test Point Collection ID: ${collection.Id}`}
                    />
                    <Checkbox
                        onChange={() => handleToggle(collection.Id)}
                        checked={checked.includes(collection.Id)}
                    />
                </List.Item>
            )}
        />
    );
};

export default TestPointCollections;
