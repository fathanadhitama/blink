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
            res.status(404).redirect('/_error')
            return;
        }
        await prisma.url.update({
            data: {
                clicks: urls.clicks+1
            },
            where: {
                id: urls.id
            }
        })
        // const target = urls.longUrl.startsWith('http')? urls.longUrl : `https://${urls.longUrl}`

        res.redirect(urls.longUrl)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
    }
}