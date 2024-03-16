import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
 
export default async function getUrls(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { url } = req.query
    try {
        let urls = await prisma.url.findFirst({
            where: {
                shortUrl: url as string
            }
        })

        if(!urls){
            res.status(404).end()
            return;
        }
        const target = urls.longUrl.startsWith('http')? urls.longUrl : `https://${urls.longUrl}`
        // Redirect ke URL tertentu
        res.redirect(target)
        // res.status(200).json({ longUrl : target }); // 301 adalah status code redirect permanen
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
    }
}