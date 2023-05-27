import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'isomorphic-unfetch';

const baseUrl = process.env.baseUrl;

const allContacts = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const getContacts = await fetch(`${baseUrl}/contact?page=1&perPage=10&search=`);
        const data = await getContacts.json();
        const length = data.length
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.end(JSON.stringify({ length, data: data }))
    } catch (error) {
        res.statusCode = 500;
        res.end(
            JSON.stringify({ 
                length: 0, 
                data: [], 
                message: 'Server Error', 
                error
            })
        )
    }
}

export default allContacts;