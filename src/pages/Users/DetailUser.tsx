import { Modal } from 'antd'
import React from 'react'

const DetailUser: React.FC<{ show: boolean, setShow: Function, user: any }> = ({ show, setShow, user }) => {
    return (
        <Modal
            title="Thông tin tài khoản"
            visible={show}
            cancelButtonProps={{ hidden: true }}
            onOk={() => setShow(false)}
            onCancel={() => setShow(false)}
        >
            <p>{`Tài khoản: ${user.username}`}</p>
            <p>{`Mật khẩu: ${user.password}`}</p>
            <p>{`Tên: ${user.fullName}`}</p>
            <p>{`Số điện thoại: ${user.phone}`}</p>
            <p>{`Email: ${user.email}`}</p>
        </Modal>
    )
}

export default DetailUser