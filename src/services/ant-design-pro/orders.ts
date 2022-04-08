import { request } from "@/.umi/plugin-request/request"

export async function fetchOrders() {
    return request(`${API_URL2}/orders`, {
        method: 'GET',
    })
}
export async function putOrders(data: any, id: any) {
    return request(`${API_URL2}/orders/${id}`, {
        method: 'PUT',
        data: data
    })
}