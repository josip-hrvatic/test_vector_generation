import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Carousel, Typography } from 'antd';
import InputConditions from './InputConditions';
import TestPointCollections from './TestPointCollections.tsx';
import TestVectorGenerator from './TestVectorGenerator';
import data from './data/Demo.json';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/input-conditions">Input Conditions</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/test-point-collections">Test Point Collections</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/test-vector-generator">Test Vector Generator</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 134px)' }}>
                    <Routes>
                        <Route path="/" element={
                            <div autoplay>
                                <div>
                                    <Title>Welcome to the Test Vector Generator!</Title>
                                </div>
                                <div>
                                    <Title>Select an option from the menu to get started</Title>
                                </div>
                                <div>
                                    <Title>Optimize your testing process</Title>
                                </div>
                            </div>
                        } />
                        <Route path="input-conditions" element={<InputConditions data={data} />} />
                        <Route path="test-point-collections" element={<TestPointCollections data={data} />} />
                        <Route path="test-vector-generator" element={<TestVectorGenerator data={data} />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Router>
    );
};

export default App;
