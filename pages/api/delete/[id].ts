import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
 
export default async function deleteUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { id } = req.query
    try {
        let url = await prisma.url.delete({
            where: {
                id: id as string
            }
        })
        res.status(200).json({ ok: true, message: `Url with ID ${id} has been deleted` });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ ok: false, message: 'Terjadi kesalahan server' });
    }
}