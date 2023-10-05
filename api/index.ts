import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import 'dotenv/config';

const { API_ENDPOINT: url, API_TOKEN: token } = process.env

export default async (req: VercelRequest, res: VercelResponse) => {
    const { style = '国风 宫崎骏', desc = '繁华 星空 夜景 梦幻 都市 街道' } = req.query

    const { data: { data: { pictures } } } =
        await axios.post(`${url}`, { style, desc }, { headers: { 'token': token } })

    const picUrls = Object.values(pictures) as string[];

    return res.status(200).json({
        picUrls
    })
}