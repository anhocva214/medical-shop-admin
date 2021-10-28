import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { useState, ReactNode, createElement } from 'react'
import { color } from '@assets/color';

const { Header, Sider, Content } = Layout;


interface IProps{
    children: ReactNode,
}

export default function AdminLayout(props: IProps) {

    const [_collapsed, set_collapsed] = useState(false)

    const toggle = () => {

    }

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={_collapsed} style={{backgroundColor: "#fff"}} >
                    <div className="logo" style={{height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h2 style={{color: color.bgDark, margin: 0}}>anho</h2>
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            nav 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            nav 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: color.bgDark}}>
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0, backgroundColor: color.bgDark,
                            height: 60
                        }}>
                        {createElement(_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => set_collapsed(!_collapsed),
                            style: {
                                fontSize: 25,
                                marginLeft: 10,
                                color: '#fff'
                            }
                        })}

                       
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

