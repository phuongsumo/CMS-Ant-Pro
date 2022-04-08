import { Modal, Button, Table, Space } from 'antd'
import React from 'react'

const { Column } = Table;

const ModalOrder: React.FC<{ show: boolean, setShow: Function, order: any }> = ({ show, setShow, order }) => {
    if (order.orders) {
        order.orders.map((e: any, i: number) => {
            e.key = i
            order.orders[i] = e;
        })
    }


    return (
        <Modal
            visible={show}
            title={`Đơn hàng (${order.time})`}
            width={1300}
            onCancel={() => setShow(false)}
            style={{ top: 50 }}
            footer={
                [
                    <Button key="back" type="primary" onClick={() => setShow(false)}>
                        Đóng
                    </Button>
                ]}
        >
            <Table

                dataSource={order.orders}
                bordered
                scroll={{ y: 250 }}
                rowKey={(record) => {
                    return record.key
                }}
                footer={(record: any) => {
                    let totalPrice: number = record.reduce((a: any, b: any) => a + Number(b.total), 0);
                    return `Tổng thanh toán: ${totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
                }}
            >
                <Column width={150} title="Tên" dataIndex="name" key="name" />
                <Column width={95} title="Số lượng" dataIndex="amount" key="amount" />
                <Column
                    width={60}
                    title="Size"
                    key="size"
                    render={(text, record: any) => (
                        <Space size="middle">
                            {record.size ? <span>L</span> : <span>M</span>}
                        </Space>
                    )}
                />
                <Column
                    width={100}
                    title="Đá"
                    key="ice"
                    render={(text, record: any) => (
                        <Space size="middle">
                            {record.ice ? <span>Có đá</span> : <span>Không đá</span>}
                        </Space>
                    )}
                />
                <Column
                    width={100}
                    title="Đường"
                    key="sugar"
                    render={(text, record: any) => (
                        <Space size="middle">
                            {record.sugar ? <span>100%</span> : <span>50%</span>}
                        </Space>
                    )}
                />
                <Column
                    width={350}
                    title="Topping"
                    key="topping"
                    render={(text, record: any) => (
                        <Space size="middle">
                            {record.topping.map((tp: any, index: any) => (
                                tp === '1' ? <span key={index}>Trân châu sương mai</span> :
                                    tp === '2' ? <span key={index}>Hạt dẻ</span> :
                                        tp === '3' ? <span key={index}>Trân châu Baby</span> : ''
                            ))}
                        </Space>
                    )}
                />
                <Column
                    width={120}
                    title="Đơn giá"
                    key="price"
                    render={(text, record: any) => {
                        const price = Number(record.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

                        return (
                            <Space size="middle">
                                {price}
                            </Space>
                        )
                    }}
                />
                <Column
                    width={120}
                    title="Thành tiền"
                    key="total"
                    render={(text, record: any) => {
                        const total = Number(record.total).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

                        return (
                            <Space size="middle">
                                {total}
                            </Space>
                        )
                    }}
                />
            </Table>
        </Modal>
    )
}

export default ModalOrder