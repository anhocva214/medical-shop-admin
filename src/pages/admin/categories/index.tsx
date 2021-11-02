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
import { useEffect, useRef } from 'react'
import { slugify } from "@utils/string";
import { createCategories, getCategories, removeCategory } from "@actions/categories.action";
import { useSelector } from "react-redux";
import { categoriesSelector } from "@store/slices/categories.slice";
import { dispatch } from '@store/index'


export default function CategoriesPage() {

    const { loadingList, categories, loadingComfirm, formErrors, apiStatus, loadingDelete } = useSelector(categoriesSelector)

    const [_visibleModal, set_visibleModal] = useState(false);
    const [_modalDelete, set_modalDelete] = useState(false)
    const [_form, set_form] = useState<Categories>({} as any)
    const btnReset = useRef<HTMLButtonElement>();

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
            render: (text, record: Categories) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: "#0000", color: blue.primary }} icon={<EditOutlined />} >
                        Edit
                    </Button>
                    <ButtonDelete id={record.id} />
                </Space>
            ),
            width: '20%'
        },
    ];

    const deleteItem = () => {

    }

    const [_loadingTable, set_loadingTable] = useState(false)

    const refreshData = () => {
        dispatch(getCategories() as any)
    }

    useEffect(() => {
        dispatch(getCategories() as any)
    }, [])

    // useEffect(() =>{
    //     if (!loadingComfirm) {
    //         set_visibleModal(false);
    //         set_form({} as any)
    //     }
    // }, [loadingComfirm])

    useEffect(() => {
        if (apiStatus == 'success') {
            set_form(new Categories())
            set_visibleModal(false)
        }
        else if (apiStatus == 'failure') {
            // set_visibleModal(false)
        }

    }, [apiStatus])

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
                onOk={() => dispatch(createCategories({ ..._form, slug: slugify(_form.name) }) as any)}
                confirmLoading={loadingComfirm}
                onCancel={() => set_visibleModal(false)}
                afterClose={() => btnReset.current.click()}
            >

                <Form onValuesChange={(a, b) => set_form(b)} layout="vertical" hideRequiredMark >
                    <Row gutter={16} style={{ marginBottom: 20 }}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter category name' }]}
                            >
                                <Input placeholder="Please enter category name" />
                            </Form.Item>
                            {!!formErrors['name'] && (
                                <div style={{ color: 'red', fontSize: 12 }}>{formErrors['name']}</div>
                            )}

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="slug"
                                label="Slug"
                            >
                                <Input disabled placeholder={slugify(_form.name)} value={slugify(_form.name)} />
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
                                    <option value={null}>Choose type</option>
                                    <option value="product">Product</option>
                                    <option value="blog">Blog</option>
                                </select>
                            </Form.Item>
                            {!!formErrors['type'] && (
                                <div style={{ color: 'red', fontSize: 12 }}>{formErrors['type']}</div>
                            )}
                        </Col>
                    </Row>

                    <button ref={btnReset} type="reset" style={{ display: 'none' }}></button>
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

                .ant-form-item{
                    margin-bottom: 0px;
                }
                
            `}</style>
        </AdminLayout>
    )
}


interface IPropsDelete {
    id: string
}

const ButtonDelete = (props: IPropsDelete) => {

    const [_visibleModal, set_visibleModal] = useState(false)
    const { loadingComfirm } = useSelector(categoriesSelector)





    return (
        <>

            <Modal
                title="Comfirm delete"
                visible={_visibleModal}
                onOk={() => dispatch(removeCategory(props.id) as any)}
                confirmLoading={loadingComfirm}
                onCancel={() => set_visibleModal(false)}
            >
                <span style={{}}>Are you sure you want to <b>delete</b> this category?</span>
            </Modal>

            <Button danger onClick={()=> set_visibleModal(true)} icon={<DeleteOutlined />} style={{ backgroundColor: "#0000" }} >
                Delete
            </Button>

        </>
    )
}