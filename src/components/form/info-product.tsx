import { color } from "@assets/color";
import AdminLayout from "@layouts/admin-layout";
import { Form, Input, Space, Tooltip, Button, Steps, Select, Row, Col } from 'antd';
const { Step } = Steps;
const { Option } = Select;
import { } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react'
import { green, gold } from '@ant-design/colors';
import Router from "next/router";

export default function FormInfoProduct() {
    const [form] = Form.useForm();

    const [_formStep, set_formStep] = useState(0)
    const [_formPrice, set_formPrice] = useState<{ origin: number, saleOff: number, unit: string }>({
        origin: 0,
        saleOff: 0,
        unit: "VND",
    })


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };



    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option value={i.toString(36) + i} key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const selectAfter = (
        <Select
            defaultValue="VND"
            value={_formPrice.unit}
            onChange={(e) => { set_formPrice({ ..._formPrice, unit: e }) }}
            className="select-after"
            style={{ width: 150 }}
        >
            <Option value="VND">VND</Option>
            <Option value="DOLA">Đô la</Option>

        </Select>
    );

    const resultPrice = () => {
        if (!_formPrice.origin)
            return 0

        if (!_formPrice.saleOff)
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: _formPrice.unit,
            }).format(_formPrice.origin)
        else return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: _formPrice.unit,
        }).format(_formPrice.origin - _formPrice.saleOff)
    }



    return (
        <Form
            form={form}
            layout="vertical"
            style={{
                width: "100%", backgroundColor: color.sectionDark,
                padding: '45px 100px', marginTop: 20, borderRadius: 10,
                transition: 'all .4s'
            }}
            // initialValues={{ requiredMarkValue: requiredMark }}
            onValuesChange={onFinish}
        // onFinish={onFinish}
        // requiredMark={requiredMark}
        >

            <Form.Item name="name" label={(<h3 style={{ color: "#fff" }}>Name</h3>)}>
                <Input size="large" placeholder="Enter name product" />
            </Form.Item>
            <Form.Item name="description" label={(<h3 style={{ color: "#fff" }}>Description</h3>)}>
                <Input.TextArea size="large" placeholder="Enter description product" />
            </Form.Item>
            <Form.Item name="categories" label={(<h3 style={{ color: "#fff" }}>Categories</h3>)}>
                <Select size="large" mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                    {children}
                </Select>
            </Form.Item>
            <Row>
                <Col span="11">
                    <Form.Item name="price" label={(<h3 style={{ color: "#fff" }}>Cost</h3>)}>
                        <Input
                            type="number"
                            size="large"
                            placeholder="Enter price product"
                            addonAfter={selectAfter}
                            onChange={(e) => { set_formPrice({ ..._formPrice, origin: parseInt(e.target.value) }) }}
                            min={0} />
                    </Form.Item>
                </Col>
                <Col span="2"></Col>
                <Col span="11">
                    <Form.Item name="saleOff" label={(<h3 style={{ color: "#fff" }}>Price</h3>)}>
                        <Input
                            type="number"
                            size="large"
                            pattern="[0-9]"
                            placeholder="Enter saleOff "
                            addonAfter={selectAfter}
                            onChange={(e) => { set_formPrice({ ..._formPrice, saleOff: parseInt(e.target.value) }) }}
                            min={0} />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Button size="large" style={{ width: 250, marginTop: 20 }} htmlType="submit" type="primary" >Next <i style={{ marginLeft: 5 }} className="fa-solid fa-angle-right"></i></Button>
                </Form.Item>
            </div>
        </Form>

    )
}
