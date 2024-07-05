import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/../lib/prisma'
import { ResponseUrlType } from '@/../types/url'
import bcrypt from 'bcrypt'

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

export default async function signup(
    req: NextApiRequest & { body: SignupRequestBody },
    res: NextApiResponse<ResponseUrlType>
) {
    if (req.method == 'POST') {
        const { name, email, password } = req.body
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if (existingUser) {
            res.status(300).json({
                message: 'Email telah terdaftar.',
                ok: false
            })
            return
        }
    
        if ( password.length < 8 ) {
            res.status(400).json({
                message: 'Password harus memiliki panjang minimal 8 karakter.',
                ok: false
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })
        
        res.status(200).json({
            message: 'Akun berhasil didaftarkan!',
            ok: true
        })
    }
}