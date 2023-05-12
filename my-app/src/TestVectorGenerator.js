import React from 'react';

class TestVectorGenerator extends React.Component {
    generateCSV = () => {
        const { data } = this.props;

        // Add code here to generate the .csv file from the data
    }

    render() {
        return (
            <div>
                <button onClick={this.generateCSV}>Generate .csv file</button>
            </div>
        );
    }
}

export default TestVectorGenerator;
