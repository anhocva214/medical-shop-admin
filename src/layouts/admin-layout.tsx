import { Layout, Menu, Dropdown, Button, Avatar, Spin } from 'antd';
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
    LoadingOutlined,
} from '@ant-design/icons';
import { useState, ReactNode, createElement, useEffect } from 'react'
import { color } from '@assets/color';
import { routesSidebar } from '@utils/routes';
import { capitalizeString } from '@utils/string';
import Router, {useRouter} from 'next/router';
const { Header, Sider, Content } = Layout;
import { navigatorSelector } from '@slices/navigator.slice'
import { useSelector } from 'react-redux'
import { navigatorActions } from '@actions/navigator.action';





interface IProps {
    children: ReactNode,
}

export default function AdminLayout(props: IProps) {

    const { tabDefault, openTabDefault, loadingPage } = useSelector(navigatorSelector)

    const [_collapsed, set_collapsed] = useState(false)
    const [_defaultTab, set_defaultTab] = useState("key_0")
    const [_defaultOpenTab, set_defaultOpenTab] = useState("")
    // const [_loadingPage, set_loadingPage] = useState(true)
    const [_minHeigth, set_minHeigth] = useState(0)

    const router = useRouter()

    const toggle = () => {

    }

    // const navigateScreens = (path: string) => {
    //     set_loadingPage(true)
    //     Router.push(path)
    // }

    useEffect(()=>{
        // navigatorActions.loadingPage(false)
        setTimeout(() => {
            navigatorActions.loadingPage(false)
        }, 500);
    },[])

    useEffect(()=>{
        const pathname = router.pathname;
        routesSidebar.forEach((route, index) => {
            if (route.subMenu){
                route.children.forEach((child, indexChild) => {
                    if (child.path == pathname) navigatorActions.navigateScreen({
                        tabDefault: "child_"+index+"_"+indexChild,
                        openTabDefault: "key_"+index
                    })
                })
            }
            else if (route.path == pathname){
                navigatorActions.navigateScreen({
                    tabDefault: "key_"+index,
                    openTabDefault: ""
                })
            }
        })

       
    }, [])

    useEffect(() => {
        set_minHeigth(window.innerHeight)
    },[])


    const menu = (
        <Menu theme={"dark"} style={{ width: 150, backgroundColor: color.bgDark, color: "#fff", boxShadow: '0 0 35px 0 #42485026', border: '1px solid #3a4250' }}>
            <Menu.ItemGroup title={(<div style={{ color: "#f7f7f7", fontSize: 12 }}>Wellcome !</div>)}>
                <Menu.Item className="item-account-box" style={{ color: "#adb5bd" }} icon={<UserOutlined />} key="setting:1">My Account</Menu.Item>
                <Menu.Item style={{ color: "#adb5bd" }} icon={<LockOutlined />} key="setting:2">Lock Screen</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup>
                <Menu.Item onClick={() => Router.push('/')} style={{ color: "#adb5bd" }} icon={<LogoutOutlined />} key="setting:3">Logout</Menu.Item>
            </Menu.ItemGroup>
        </Menu>

    );

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: 'absolute', 
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: loadingPage?99999:-1,
                backgroundColor: color.bgDark,
                transition: 'all .7s',
                opacity: loadingPage?1:0
            }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 34 }} spin />} />
            </div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={_collapsed} style={{ backgroundColor: "#13171c" }} >
                    <div className="logo" style={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 style={{ color: "#fff", margin: 0 }}>anho</h2>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[tabDefault]}
                        openKeys={[openTabDefault]}
                        style={{
                            backgroundColor: "#13171c"
                        }}
                    >

                        {
                            routesSidebar.map((r, index) => {
                                if (!r.subMenu) {
                                    let key = "key_" + index;
                                    return (
                                        <Menu.Item
                                            key={key}
                                            icon={r.icon}
                                            onClick={() => navigatorActions.routerPush(r.path)}
                                        >
                                            {capitalizeString(r.title)}
                                        </Menu.Item>)
                                }
                                else {
                                    return (
                                        <SubMenu key={"key_" + index} icon={r.icon} title={capitalizeString(r.title)}>
                                            {r.children.map((child, iChild) => {
                                                let key = "child_" + index + "_" + iChild;
                                                return(
                                                    <Menu.Item
                                                        key={key}
                                                        onClick={() => navigatorActions.routerPush(child.path)}
                                                    >
                                                        {capitalizeString(child.title)}
                                                    </Menu.Item>
                                                )
                                            })}

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
                            padding: "20px 40px",
                            minHeight: _minHeigth - 60,

                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

