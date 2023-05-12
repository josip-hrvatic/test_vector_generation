import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import InputConditions from './InputConditions';
import TestPointCollections from './TestPointCollections.tsx';
import TestVectorGenerator from './TestVectorGenerator';
import data from './data/Demo.json';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Test Vector Generator</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item>Test Vector Generator</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="site-layout-content">
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="site-layout-content">
                            <TestPointCollections data={data} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="site-layout-content">
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default App;
