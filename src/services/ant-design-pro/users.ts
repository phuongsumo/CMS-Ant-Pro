import { request } from 'umi';

export async function fetchUsers() {
    return request(`${API_URL}/users`, {
        method: 'GET',
    })
}
export async function deleteUser(id: string) {
    return request(`${API_URL}/users/${id}`, {
        method: 'DELETE',
    })
}