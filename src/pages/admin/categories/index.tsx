import AdminLayout from "@layouts/admin-layout";
import { color } from "@assets/color";
import {
    Table, Tag, Modal, Button,
    Drawer, Form, Col, Row, Input, Select, DatePicker, Space
} from 'antd';
const { Option } = Select;
import { EditOutlined, DeleteOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { useState } from 'react'
import { green, blue } from '@ant-design/colors';
import Router from "next/router";
import { navigatorActions } from "@actions/navigator.action";
import { pathList } from "@utils/routes";
import { Categories } from "src/models/categories";
import { useEffect } from 'react'
import { slugify } from "@utils/string";
import { categoriesActions } from "@actions/categories.action";
import { useSelector } from "react-redux";
import { categoriesSelector } from "@store/slices/categories.slice";


export default function CategoriesPage() {

    const {loadingList, categories} = useSelector(categoriesSelector)

    const [_visibleModal, set_visibleModal] = useState(false);
    const [_form, set_form] = useState<Categories>({} as any)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: text => <span>{text}</span>,
            filters: [
                {
                    text: 'Product',
                    value: 'product',
                },
                {
                    text: 'Blog',
                    value: 'blog',
                },
            ],
            onFilter: (value, record) => record.type.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            render: text => <span>{text}</span>,
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: "#0000", color: blue.primary }} icon={<EditOutlined />} >
                        Edit
                    </Button>
                    <ButtonDelete />
                </Space>
            ),
            width: '20%'
        },
    ];

    const deleteItem = () => {

    }

    const [_loadingTable, set_loadingTable] = useState(false)

    const refreshData = () => {
        categoriesActions.getCategories()
    }

    useEffect(() => {
        if (!!_form.name) set_form({ ..._form, slug: slugify(_form.name) })
    }, [_form.name])

    useEffect(() =>{
        categoriesActions.getCategories()
    }, [])

    return (
        <AdminLayout>

            <div style={{
                display: 'flex',
                justifyContent: 'end', alignItems: 'center',
                marginBottom: 20
            }}>
                <Space size={20}>
                    <Button onClick={() => set_visibleModal(true)} style={{ backgroundColor: green.primary, borderColor: green.primary }} type="primary" icon={<PlusOutlined />}>
                        Create
                    </Button>
                    <Button onClick={() => refreshData()} type="text" style={{ backgroundColor: "#0000", color: "#fff" }} loading={_loadingTable} icon={<SyncOutlined />}>
                        Refresh
                    </Button>
                </Space>
            </div>

            <Modal
                title="Create a new category"
                visible={_visibleModal}
                // style={{ backgroundColor: color.sectionDark}}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                onCancel={() => set_visibleModal(false)}
            >

                <Form onValuesChange={(a, b) => set_form(b)} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter category name' }]}
                            >
                                <Input placeholder="Please enter category name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="slug"
                                label="Slug"
                            >
                                <Input disabled placeholder={_form.slug} value={_form.slug} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                                <select name="" id="" style={{
                                    width: "100%",
                                    border: "1px solid #434343",
                                    backgroundColor: "#0000",
                                    outline: 'none',
                                    padding: 6
                                }}>
                                    <option value="product">Product</option>
                                    <option value="blog">Blog</option>
                                </select>
                            </Form.Item>
                        </Col>
                    </Row>


                    {/* <Button
                        style={{ backgroundColor: green.primary, borderColor: green.primary }}
                        type="primary"
                        icon={<PlusOutlined />}
                        htmlType="submit"
                    >
                        Create
                    </Button> */}
                </Form>
            </Modal>



            <Table
                loading={loadingList}
                bordered
                columns={columns}
                dataSource={categories}
                rowClassName="table-data-row" />


            <style jsx global>{`
                .ant-table-content, .ant-table-cell, .ant-pagination-item{
                    background-color: ${color.sectionDark} !important;
                    color: #fff !important;
                }

                .ant-table-cell{
                    border-bottom: 1px solid #ffffff1c !important;
                }

                // .table-data-row:last-child .ant-table-cell{
                //     border-bottom: 0px solid #ffffff1c !important;
                // }

                .ant-pagination-item{
                    border: 1px solid ${color.sectionDark};
                }

                .ant-pagination-item a{
                    color: #fff;
                }
                
                .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link{
                    background-color: ${color.sectionDark};
                    color: #ffffff82 !important;
                    border: 1px solid ${color.sectionDark};
                }

                .ant-pagination-item-active {
                    font-weight: 500;
                    background: #fff;
                    border-color: #1890ff;
                }
                .ant-pagination-item-active a {
                    color: #1890ff !important;
                }

                .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table {
                    border-top: 1px solid #ffffff1c;
                }

                .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > th, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > td, .ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > td {
                    border-right: 1px solid #ffffff1c;
                }

                .ant-table.ant-table-bordered >.ant-table-container {
                    border-left: 1px solid #484e59 !important;
                }

                .ant-table-thead > tr > th {
                    background-color: #272e38 !important;
                }

                .ant-select-dropdown{
                    z-index: 9999999;
                }
                
            `}</style>
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
        <Button danger onClick={onDelete} loading={_loading} icon={<DeleteOutlined />} style={{ backgroundColor: "#0000" }} >
            Delete
        </Button>
    )
}