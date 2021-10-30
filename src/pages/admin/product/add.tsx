import { color } from "@assets/color";
import AdminLayout from "@layouts/admin-layout";
import { Form, Input, Space, Tooltip, Button, Steps, Select, Row, Col} from 'antd';
const { Step } = Steps;
const { Option } = Select;
import { EditOutlined, DeleteOutlined, PlusOutlined, SyncOutlined, LeftOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react'
import { green, gold } from '@ant-design/colors';
import Router from "next/router";
import FormInfoProduct from "@components/form/info-product";
import FormImageProduct from "@components/form/image-product";

export default function ProductAdd() {
    const [form] = Form.useForm();

    const [_formStep, set_formStep] = useState(1)

    const getStatusStep = (index: number) => {
        if (index < _formStep) return "finish"
        else if (index == _formStep) return "process"
        else if (index > _formStep) return "wait"
    }



    const inputRef = useRef<HTMLInputElement>();

    return (
        <AdminLayout>
            <Button
                onClick={() => Router.back()}
                type="text"
                style={{
                    backgroundColor: "#0000", color: gold.primary, borderColor: gold.primary,
                    marginBottom: 20
                }}
                icon={<LeftOutlined />}>
                Back
            </Button>

            <Steps
                // type="navigation"
                // percent={60}
                current={_formStep}
                onChange={set_formStep}
                className="site-navigation-steps"
            >
                <Step status={getStatusStep(0)} title={(<span style={{ color: "#fff" }}>Information</span>)} />
                <Step status={getStatusStep(1)} title={(<span style={{ color: "#fff" }}>Upload images</span>)} />
                <Step status={getStatusStep(2)} title={(<span style={{ color: "#fff" }}>Publish</span>)} />
            </Steps>


            {
                _formStep == 0?(
                    <FormInfoProduct/>
                ):(
                    <FormImageProduct/>
                )
            }
           
            


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