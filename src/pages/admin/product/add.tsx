import { color } from "@assets/color";
import AdminLayout from "@layouts/admin-layout";
import { Form, Input, Space, Tooltip, Button, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SyncOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import { green } from '@ant-design/colors';

export default function ProductAdd() {
    const [form] = Form.useForm();



    const onChangeForm = (values: any) => {
        console.log(values);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <AdminLayout>
            <Row>
                <Col flex="auto">
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ width: "100%", backgroundColor: color.sectionDark, padding: 25 }}
                        // initialValues={{ requiredMarkValue: requiredMark }}
                        // onValuesChange={onChangeForm}
                        onFinish={onFinish}
                    // requiredMark={requiredMark}
                    >

                        <Form.Item name="name" label={(<span style={{ color: "#fff" }}>Name</span>)}>
                            <Input placeholder="Enter name product" />
                        </Form.Item>
                        <Form.Item name="description" label={(<span style={{ color: "#fff" }}>Description</span>)}>
                            <Input.TextArea placeholder="Enter description product" />
                        </Form.Item>
                        <Form.Item name="price" label={(<span style={{ color: "#fff" }}>Price</span>)}>
                            <Input placeholder="Enter price product" type="number" />
                        </Form.Item>
                        <Form.Item label={(<span style={{ color: "#fff" }}>Name</span>)}>
                            <Input placeholder="Enter name product" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={2}/>
                <Col span={10}>
                    <Form
                        layout="vertical"
                        style={{ width: "100%", backgroundColor: color.sectionDark, padding: 25 }}
                    >
                        <h1 style={{ color: "#fff", textAlign: "center" }}>Details</h1>

                        <Form.Item name="name" label={(<span style={{ color: "#fff" }}>Name</span>)}>
                            <Input placeholder="Enter name product" />
                        </Form.Item>

                    </Form>
                </Col>
            </Row>


        </AdminLayout>
    )
}

const ButtonDelete = () => {

    const [_loading, set_loading] = useState(false)

    const onDelete = () => {
        set_loading(true)
        setTimeout(() => {
            set_loading(false)
        }, 1000);
    }

    return (
        <Button danger type="primary" onClick={onDelete} loading={_loading} icon={<DeleteOutlined />} >
            Delete
        </Button>
    )
}