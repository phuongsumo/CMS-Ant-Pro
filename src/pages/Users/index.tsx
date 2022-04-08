import { fetchUsers, deleteUser } from '@/services/ant-design-pro/users';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Modal, Space, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import DetailUser from './DetailUser';

interface UserRootObject {
    username: string;
    password: string;
    email: string;
    phone: string;
    fullName: string;
    age: string;
    avatar: string;
    address: string;
    cart: any[];
    orders: any[];
    id: string;
}

const initialValues = {
    username: '',
    password: '',
    email: '',
    phone: '',
    fullName: '',
    age: '',
    avatar: '',
    address: '',
    cart: [],
    orders: [],
    id: '',
}

const Users = () => {
    const [users, setUsers] = useState<UserRootObject[]>([]);
    const [user, setUser] = useState<UserRootObject>(initialValues);
    const [show, setShow] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers()
            .then(result => {
                setUsers(result);
                setSpin(false);
            });
    }, []);

    const handleDelete = async (user: UserRootObject) => {
        if (user.username === 'admin') {
            message.error('Không thể xóa tài khoản này!')
            return
        }
        try {
            await deleteUser(user.id)
            await fetchUsers()
                .then(result => {
                    message.success(`Đã xóa tài khoản ${user.username}`)
                    setUsers(result);
                });
        } catch (error) {
            console.log(error);
        }
    }

    function confirm(record: UserRootObject) {
        Modal.confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn chắc chắn muốn xóa tài khoản này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: () => handleDelete(record)
        });
    }

    const columns: ProColumns<any>[] = [
        {
            dataIndex: 'index',
            title: 'No.',
            valueType: 'index',
            search: false
        },
        {
            dataIndex: 'username',
            title: 'Tài khoản',
            valueType: 'text'
        },
        {
            dataIndex: 'fullName',
            title: 'Tên',
            valueType: 'text'
        },
        {
            dataIndex: 'email',
            title: 'Email',
            valueType: 'text'
        },
        {
            dataIndex: 'phone',
            title: 'Số điện thoại',
            valueType: 'text'
        },
        {
            title: 'Action',
            width: 150,
            search: false,
            render: (text, record: UserRootObject) => (
                <Space>
                    <Button type={'primary'} onClick={() => {
                        setShow(true)
                        setUser(record)
                    }}>Xem</Button>
                    <Button type={'primary'} danger onClick={() => confirm(record)}>Xóa</Button>
                </Space>
            )
        }
    ];

    const handleQuery = (values: any, type: any) => {
        if (type === 'set') {
            fetchUsers()
                .then(res => {
                    const searchItem = res.filter((user: any) => (
                        user.username.toLowerCase().includes(values.username ? values.username.toLowerCase() : '') &&
                        user.fullName.toLowerCase().includes(values.fullName ? values.fullName.toLowerCase() : '') &&
                        user.email.toLowerCase().includes(values.email ? values.email.toLowerCase() : '') &&
                        user.phone.includes(values.phone ? values.phone : '')
                    ))
                    setUsers(searchItem);
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
                        search={{
                            labelWidth: 'auto',
                        }}
                        columns={columns}
                        dataSource={users}
                        form={{
                            syncToUrl: handleQuery
                        }}
                    />
                    <DetailUser show={show} setShow={setShow} user={user} />
                </>
            }
        </>
    )
}

export default Users;