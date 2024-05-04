import axios from 'axios';

const url = ""

export async function claim(publicKey: string): Promise<boolean> {
	const data = { publicKey: publicKey };
    const response = await axios.post(`${url}/saveUser`, data, {
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.data?.publicKey === data.publicKey) {
         return true;
    } else {
        throw new Error('Data returned does not match user public key');
    }
}

export async function checkUser(publicKey: string): Promise<boolean> {
    const response = await axios.get(`${url}/user`, {
        params: { publicKey: publicKey },
    });

    if (response.status == 200) {
        return response.data as boolean;
    } else {
        throw new Error('User not found');
    }
}

export async function checkMax(): Promise<boolean> {
    const response = await axios.get(`${url}/max`);

    if (response.status == 200) {
        return response.data as boolean;
    } else {
        throw new Error('User not found');
    }
}