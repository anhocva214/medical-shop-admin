import { alertActions } from '@actions/alert.action'
import { userActions } from '@actions/user.action'
import { userSelector } from '@store/slices/user.slice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Layout, Form, Input, Button, Checkbox, Space } from 'antd'
const { Content } = Layout
import Image from 'next/image'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Router from 'next/router'


import { Img } from '@assets/images'


export default function Home() {

  const { users } = useSelector(userSelector)

  const [_username, set_username] = useState("");
  const [_password, set_password] = useState("");
  const [_loading, set_loading] = useState(false);
  const [_loginActive, set_loginActive] = useState(false)

  useEffect(() => {
    console.log(users)
  }, [users])

  useEffect(() => {
    if (_username.length > 0 && _password.length > 0) {
      set_loginActive(true)
    }
    else set_loginActive(false)
  }, [_username, _password])

  const onLogin = (e: any) => {
    e.preventDefault();

    if (_loginActive){
      set_loading(true)

      Router.push("/admin/dashboard")
  
      set_loading(false)
    }
   

  }

  return (
    <>
      <Layout>
        <Content style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <div style={{
            position: 'fixed', top: 0, left: 0,
            width: '100%',
            backgroundImage: `url(${Img.bgAuth.src})`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            zIndex: 0,
          }} />

          <form onSubmit={onLogin} action="#" style={{ width: 300, transform: 'translateY(-50px)' }}>
            <div style={{ padding: 30, backgroundColor: "#071f2138" }}>
              <Space size={10} direction="vertical" style={{ width: '100%' }} >
                <Input
                  onChange={(e) => set_username(e.target.value)}
                  placeholder="Username"
                  prefix={<UserOutlined />} />
                <Input
                  onChange={(e) => set_password(e.target.value)}
                  placeholder="Password"
                  type="password"
                  prefix={<LockOutlined />} />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={_loading} block disabled={!_loginActive}
                  style={{ opacity: _loginActive ? 1 : 0.7 }}>Login</Button>
              </Space>
            </div>
          </form>

        </Content>
      </Layout>
    </>
  )
}
