import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { PostUrlType } from '../../types/url'

 
export default async function getUrls(
  req: NextApiRequest,
  res: NextApiResponse<PostUrlType>
) {
    const { body } = req
    const { longUrl, shortUrl, clicks } = body
    let url = await prisma.url.create({
        data: {
            longUrl,
            shortUrl,
            clicks,
            author: {create:{
                name: 'leibniz' // hardcode dulu sebelum auth
            }}
        }
    })
    res.status(200).json({ message: 'Successfully posted' })
}