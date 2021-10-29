import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
const { SubMenu } = Menu
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LockOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    MailOutlined
} from '@ant-design/icons';
import { useState, ReactNode, createElement } from 'react'
import { color } from '@assets/color';
import { routes } from './routes';
import { capitalizeString } from '@utils/string';
import Router from 'next/router';

const { Header, Sider, Content } = Layout;






interface IProps {
    children: ReactNode,
}

export default function AdminLayout(props: IProps) {

    const [_collapsed, set_collapsed] = useState(false)

    const toggle = () => {

    }

    const menu = (
        <Menu theme={"dark"} style={{ width: 150, backgroundColor: color.bgDark, color: "#fff", boxShadow: '0 0 35px 0 #42485026', border: '1px solid #3a4250' }}>
            <Menu.ItemGroup title={(<div style={{ color: "#f7f7f7", fontSize: 12 }}>Wellcome !</div>)}>
                <Menu.Item className="item-account-box" style={{ color: "#adb5bd" }} icon={<UserOutlined />} key="setting:1">My Account</Menu.Item>
                <Menu.Item style={{ color: "#adb5bd" }} icon={<LockOutlined />} key="setting:2">Lock Screen</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup>
                <Menu.Item onClick={()=>Router.push('/')} style={{ color: "#adb5bd" }} icon={<LogoutOutlined />} key="setting:3">Logout</Menu.Item>
            </Menu.ItemGroup>
        </Menu>

    );

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={_collapsed} style={{ backgroundColor: "#fff" }} >
                    <div className="logo" style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 style={{ color: color.bgDark, margin: 0 }}>anho</h2>
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>

                        {
                            routes.map((r, index) => {
                                if (!r.subMenu) {
                                    return (<Menu.Item key={"key_" + index} icon={r.icon} >{capitalizeString(r.title)}</Menu.Item>)
                                }
                                else {
                                    return (
                                        <SubMenu key={"key_" + index} icon={r.icon} title={capitalizeString(r.title)}>
                                            {r.children.map((child, iChild) => (
                                                <Menu.Item key={"child_" + iChild}>
                                                    {capitalizeString(child.title)}
                                                </Menu.Item>
                                            ))}

                                        </SubMenu>
                                    )
                                }
                            })
                        }

                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ backgroundColor: color.bgDark }}>
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 20, backgroundColor: color.bgDark,
                            height: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                        <div className="right">
                            {createElement(_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => set_collapsed(!_collapsed),
                                style: {
                                    fontSize: 25,
                                    color: '#fff'
                                }
                            })}
                        </div>


                        <div className="left">
                            <Dropdown overlay={menu} placement="bottomLeft" className="dropdown-account">
                                <div style={{ cursor: 'pointer' }}>
                                    <Avatar src="https://coderthemes.com/adminto/layouts/assets/images/users/user-1.jpg" />
                                    <span style={{ color: '#fff', marginLeft: 10, fontWeight: 500 }}>anho <i style={{ fontSize: 10, marginLeft: 2 }} className="fa-solid fa-angle-down"></i></span>
                                </div>
                            </Dropdown>
                        </div>

                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 20,
                            minHeight: '100vh',

                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

