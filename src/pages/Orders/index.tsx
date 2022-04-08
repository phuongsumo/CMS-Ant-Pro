import React, { useEffect, useState } from 'react'
import { fetchOrders, putOrders } from '@/services/ant-design-pro/orders'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Checkbox, Space, Select, Button, Modal, Spin } from 'antd';
import styles from './index.module.less';
import ModalOrder from './ModalOrder';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [order, setOrder] = useState<any[]>([]);
  const [disabledCheckBox, setDisabledCheckBox] = useState<boolean>(false);
  const [disabledSelect, setDisabledSelect] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);


  const { Option } = Select;

  useEffect(() => {
    fetchOrders()
      .then(res => {
        setOrders(res.reverse())
        setSpin(false)
      })
  }, []);

  const handleDetails = (order: any) => {
    setShowModal(true)
    setOrder(order)
  }


  // Lọc thanh toán
  const handleFilterPaid = (value: any, record: any) => {
    return record.paid === value
  }

  // Đổi trạng thái thanh toán
  const handleChangePaid = (value: any) => {
    setDisabledCheckBox(true)
    const paidStatus = value.paid;
    putOrders({ ...value, paid: !paidStatus }, value.id)
      .then(response => {
        fetchOrders()
          .then(res => {
            setOrders(res.reverse())
            setDisabledCheckBox(false)
          })
      })
  }

  // Lọc trạng thái giao hàng
  const handleFilterStatus = (value: any, record: any) => {
    return record.status === value
  }

  // Đổi trạng thái giao hàng
  const handleChangeStatus = (value: string, record: any) => {
    setDisabledSelect(true)
    putOrders({ ...record, status: value }, record.id)
      .then(response => {
        fetchOrders()
          .then(res => {
            setOrders(res.reverse())
            setDisabledSelect(false)
          })
      })
  }

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      title: 'No.',
      valueType: 'index',
      search: false
    },
    {
      dataIndex: 'fullName',
      title: 'Người đặt',
      valueType: 'text',
      search: {
        transform: (value: string) => {
          return {
            fullName: value
          }
        },
      }
    },
    {
      dataIndex: 'address',
      title: 'Địa chỉ',
      valueType: 'text',
      search: {
        transform: (value: string) => {
          return {
            address: value
          }
        },
      }
    },
    {
      dataIndex: 'phone',
      title: 'Số điện thoại',
      valueType: 'text',
      search: {
        transform: (value: string) => {
          return {
            phone: value
          }
        }
      }
    },
    {
      dataIndex: 'orders',
      title: 'Đơn hàng',
      search: false,
      width: 80,
      render: (text, record: any) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleDetails(record)}>Xem</Button>
        </Space>
      )
    },
    {
      dataIndex: 'paid',
      title: 'Thanh toán',
      search: false,
      filters: [
        {
          text: 'Đã thanh toán',
          value: true
        },
        {
          text: 'Chưa thanh toán',
          value: false
        }
      ],
      onFilter: (value, record) => handleFilterPaid(value, record),
      render: (text, record: any) => (
        <Space size="middle">
          {record.paid ? <p className={styles.success}>Đã thanh toán</p> : <p className={styles.error}>Chưa thanh toán</p>}
          <Checkbox disabled={disabledCheckBox} defaultChecked={record.paid} onChange={() => handleChangePaid(record)}></Checkbox>
        </Space>
      )
    },
    {
      dataIndex: 'status',
      title: 'Trạng thái',
      search: false,
      filters: [
        {
          text: 'Chờ xác nhận',
          value: '1'
        },
        {
          text: 'Đang giao hàng',
          value: '2'
        },
        {
          text: 'Đã giao hàng',
          value: '3'
        }
      ],
      onFilter: (value, record) => handleFilterStatus(value, record),
      render: (text, record: any) => (
        <Space size="middle">
          {record.status === '1' ? <p className={styles.error}>Chờ xác nhận</p> :
            record.status === '2' ? <p className={styles.warning}>Đang giao hàng</p> :
              record.status === '3' ? <p className={styles.success}>Đã giao hàng</p> : ''
          }
          <Select disabled={disabledSelect} defaultValue={record.status} onChange={(e) => handleChangeStatus(e, record)}>
            <Option value="1">Chờ xác nhận</Option>
            <Option value="2">Đang giao hàng</Option>
            <Option value="3">Đã giao hàng</Option>
          </Select>
        </Space>
      )
    },
  ]

  const handleQuery = (values: any, type: any) => {
    if (type === 'set') {
      fetchOrders()
        .then(res => {
          const searchItem = res.filter((order: any) => (
            order.fullName.toLowerCase().includes(values.fullName ? values.fullName.toLowerCase() : '') &&
            order.address.toLowerCase().includes(values.address ? values.address.toLowerCase() : '') &&
            order.phone.includes(values.phone ? values.phone : '')
          ))
          setOrders(searchItem.reverse())
        })
    }
    return values;
  }

  return (
    <>
      {spin ? <Spin tip="Loading..."></Spin> :
        <>
          <ProTable
            rowKey={'id'}
            columns={columns}
            dataSource={orders}
            headerTitle='Danh sách đơn hàng'
            bordered
            search={{
              labelWidth: 'auto',
            }}
            form={{
              syncToUrl: handleQuery
            }}
          />
          <ModalOrder show={showModal} setShow={setShowModal} order={order} />
        </>
      }
    </>
  )
}

export default Orders