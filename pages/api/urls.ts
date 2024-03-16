import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { UrlsType } from '../../types/url'

 
export default async function getUrls(
  req: NextApiRequest,
  res: NextApiResponse<UrlsType>
) {
  let urls = await prisma.url.findMany({})
  res.status(200).json({ urls: urls })
}