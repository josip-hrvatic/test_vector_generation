import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Space } from 'antd';
import InputConditions from './InputConditions';
import TestPointCollections from './TestPointCollections.tsx';
import TestVectorGenerator from './TestVectorGenerator';
import Samples from './Samples'; // import the new Samples component
import data from './data/L1.json';
import logo2 from './pictures/logo-infineon.svg';
import logo from './pictures/FER_logo_3.png';
import logo3 from './pictures/stemgameslogo2.png';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                        <Menu.Item key="0">
                            <Link to="/">Home Page</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/samples">Samples</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/input-conditions">Input Conditions</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/test-point-collections">Test Point Collections</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/test-vector-generator">Test Vector Generator</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 134px)', background: '#f0f2f5' }}>
                    <Routes>
                        <Route path="/" element={
                            <div style={{ textAlign: 'center' }}>
                                <Space size='large'>
                                    <img src={logo} alt="Logo" style={{ width: '300px', marginBottom: '20px' }} />
                                    <img src={logo2} alt="Logo2" style={{ width: '300px', marginBottom: '20px' }} />
                                    <img src={logo3} alt="Logo3" style={{ width: '300px', marginBottom: '20px' }} />
                                </Space>
                                <Title level={1} style={{ color: '#1890ff' }}>Welcome to the Test Vector Generator!</Title>
                                {/*<Space size='large'>
                                    <Link to="/input-conditions">
                                        <Button type="primary" size='large'><Link to="/input-conditions">Input Conditions</Link></Button>
                                    </Link>
                                    <Link to="/test-point-collections">
                                        <Button type="primary" size='large'>Test Point Collections</Button>
                                    </Link>
                                    <Link to="/test-vector-generator">
                                        <Button type="primary" size='large'>Test Vector Generator</Button>
                                    </Link>
                                </Space>*/}
                            </div>
                        } />
                        <Route path="samples" element={<Samples data={data} />} />
                        <Route path="input-conditions" element={<InputConditions data={data} />} />
                        <Route path="test-point-collections" element={<TestPointCollections data={data} />} />
                        <Route path="test-vector-generator" element={<TestVectorGenerator data={data} />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff', lineHeight: '2.5rem' }}>Odabrani Team ©2023 All Rights Reserved</Footer>
            </Layout>
        </Router>
    );
};

export default App;
