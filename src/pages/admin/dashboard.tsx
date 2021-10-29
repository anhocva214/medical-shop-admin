import { Layout, Menu, Card } from 'antd';
import AdminLayout from '@layouts/admin-layout';
import React, { useState } from 'react'
import CartNumber from '@components/cart/number';
const { Header, Sider, Content } = Layout;




export default function DashboardAdminPage() {

    return (
        <AdminLayout>
            <CartNumber title="Stactics" value={100} color="#71b5f8" />

        </AdminLayout>
    )
}

