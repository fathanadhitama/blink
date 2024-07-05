import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getUrlResponseType } from '../../types/url'

 
export default async function getUserUrls(
  req: NextApiRequest,
  res: NextApiResponse<getUrlResponseType>
) {
    const email = req.query.email as string;

    if (!email) {
        return res.status(400).json({
            message: 'Email query parameter is required',
            ok: false,
            urls: null,
        });
    }

    let urls = await prisma.url.findMany({
        where: {
            authorEmail: email,
        }
    })
    
    res.status(200).json({
        urls: urls,
        message: 'Links succesfully fetched.',
        ok: true
    })
}