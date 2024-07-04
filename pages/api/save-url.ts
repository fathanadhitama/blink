import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { ResponseUrlType } from '../../types/url'

 
export default async function saveUrl(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUrlType>
) {
    const { longUrl, shortUrl, clicks, email } = req.body

    let existing_url = await prisma.url.findFirst({
        where: {
            shortUrl: shortUrl
        }
    })
    if(!!existing_url){
        res.status(500).json({ message: 'This short url is used. Find another one.', ok: false })
        return
    }
    await prisma.url.create({
        data: {
            longUrl,
            shortUrl,
            clicks,
            authorEmail: email,
        }
    })
    res.status(200).json({ message: 'Successfully posted', ok: true })
}