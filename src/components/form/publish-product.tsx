import { Form, Input, Space, Tooltip, Button, Steps, Select, Row, Col, DatePicker , Tag} from 'antd';
const { Option } = Select;

import moment from 'moment'
import { color } from '@assets/color'
import { useState } from 'react'



export default function FormPublishProduct() {

    const [_formPrice, set_formPrice] = useState<{ origin: number, saleOff: number, unit: string }>({
        origin: 0,
        saleOff: 0,
        unit: "VND",
    })


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


    return (
        <Form
            layout="vertical"
            style={{
                width: "100%", backgroundColor: color.sectionDark,
                padding: '45px 100px', marginTop: 20, borderRadius: 10,
                transition: 'all .4s',
                minHeight: 500
            }}
        >

            <div style={{ marginBottom: 20 }}>
                <h3 style={{ color: "#fff", fontSize: '1.2rem' }}>Infomation</h3>
                <div style={{ paddingLeft: 0 }}>
                    <table className="table-info" style={{}}>
                        <tr>
                            <td>Name</td>
                            <td>Apple Pencil (2nd Generation)</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>Apple Pencil (2nd generation) brings your work to life. With imperceptible lag, pixel-perfect precision, and tilt and pressure sensitivity, it transforms into your favorite creative instrument, your paint brush, your charcoal, or your pencil.</td>
                        </tr>
                        
                        <tr>
                            <td>Categories</td>
                            <td>
                                <Tag color="#282e38">
                                    <span>category 1</span>
                                </Tag>
                                <Tag color="#282e38">
                                    <span>category 2</span>
                                </Tag>
                            </td>
                        </tr>

                        <tr>
                            <td>Price</td>
                            <td>
                                <span style={{color: "#ffffffc4", marginRight: 10, textDecoration: "line-through"}}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: _formPrice.unit,
                                    }).format(15000000 || 0)}
                                </span>
                                <span style={{fontSize: "1.1rem"}}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: _formPrice.unit,
                                    }).format(10000000 || 0)}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <Form.Item name="timePublish" label={(<h3 style={{ color: "#fff", marginBottom: 0 }}>Time Publish</h3>)}>
                <DatePicker defaultValue={moment()} onChange={(e) => { console.log(e.valueOf()) }} style={{ width: '100%' }} />
            </Form.Item>


            <style jsx global>{`
                table.table-info, table.table-info th, table.table-info td {
                    border: 1px solid #5b6474;
                    border-collapse: collapse;
                    color: #fff;
                    padding: 12px;
                  }
            `}</style>

        </Form>
    )
}