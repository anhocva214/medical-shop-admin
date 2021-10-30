import { color } from "@assets/color";
import AdminLayout from "@layouts/admin-layout";
import { Table, Tag, Space, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined , SyncOutlined} from '@ant-design/icons';
import {useState} from 'react'
import { green, blue } from '@ant-design/colors';
import Router from "next/router";

export default function ProductList() {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: {
                showTitle: false,
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
        },
        {
            title: 'Categories',
            key: 'categories',
            dataIndex: 'categories',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{backgroundColor: "#0000", color: blue.primary}} icon={<EditOutlined />} >
                        Edit
                    </Button>
                    <ButtonDelete  />
                </Space>
            ),
        },
    ];

    const deleteItem = () => {

    }

    const data = [];

    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            description: "loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem",
            price: `10000`,
            categories: ['loser'],
        });
    }

    const [_loadingTable, set_loadingTable] = useState(false)

    const refreshData = ()=>{
        set_loadingTable(true);
        setTimeout(() => {
            set_loadingTable(false);
        }, 2000);
    }

    return (
        <AdminLayout>

            <div style={{
                display: 'flex',
                justifyContent: 'end', alignItems: 'center',
                marginBottom: 20
            }}>
                <Space size={20}>
                    <Button onClick={()=>Router.push("/admin/product/add")} style={{ backgroundColor: green.primary, borderColor: green.primary}} type="primary" icon={<PlusOutlined />}>
                        Create
                    </Button>

                    <Button onClick={()=>refreshData()} type="text" style={{ backgroundColor: "#0000", color: "#fff"}}loading={_loadingTable} icon={<SyncOutlined />}>
                        Refresh
                    </Button>
                </Space>
            </div>

            <Table 
                loading={_loadingTable} 
                bordered 
                columns={columns} 
                dataSource={data} 
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
        <Button danger onClick={onDelete} loading={_loading} icon={<DeleteOutlined />} style={{backgroundColor: "#0000"}} >
            Delete
        </Button>
    )
}