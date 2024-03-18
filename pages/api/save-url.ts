import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { PostUrlType } from '../../types/url'

 
export default async function getUrls(
  req: NextApiRequest,
  res: NextApiResponse<PostUrlType>
) {
    const { body } = req
    const { longUrl, shortUrl, clicks } = body
    let existing_url = await prisma.url.findFirst({
        where: {
            shortUrl: shortUrl
        }
    })
    if(!!existing_url){
        res.status(200).json({ message: 'This short url is used. Find another one.', ok: false })
    }
    await prisma.url.create({
        data: {
            longUrl,
            shortUrl,
            clicks,
            author: {create:{
                name: 'leibniz' // hardcode dulu sebelum auth
            }}
        }
    })
    res.status(200).json({ message: 'Successfully posted', ok: true })
}