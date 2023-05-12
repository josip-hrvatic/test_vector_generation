import React from 'react';
import InputConditions from './InputConditions';
import TestPointCollections from './TestPointCollections.tsx';
import TestVectorGenerator from './TestVectorGenerator';
import data from './data/Demo.json'; // Import data from JSON file

class App extends React.Component {
  state = {
    data,  // Set initial state from imported data
  };

  render() {
    return (
        <div>
          <InputConditions data={this.state.data} />
          <TestPointCollections data={this.state.data} />
          <TestVectorGenerator data={this.state.data} />
        </div>
    );
  }
}

export default App;
