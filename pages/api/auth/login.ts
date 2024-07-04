import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/../lib/prisma'
import { ResponseLoginType } from '@/../types/auth'
import jwt from 'jsonwebtoken'

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse<ResponseLoginType>
) {
    if (req.method == 'POST') {
        const { email, password } = req.body
        let existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!existingUser){
            res.status(404).json({ 
                message: 'Email tidak ditemukan',
                ok: false,
                token: ''
            })
            return
        }
        if (existingUser.password != password){
            res.status(300).json({ 
                message: 'Password yang anda masukkan salah.',
                ok: false,
                token: '' 
            })
            return
        }
    
        const token = generateJWT(existingUser.email)
        
        res.status(200).json({
            message: 'Login berhasil!',
            ok: true,
            token: token
        })
    }
}

const generateJWT = (userEmail: string) => {

    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    const payload = {
        userEmail: userEmail,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const jwtToken = jwt.sign(payload, SECRET_KEY!);
    return jwtToken;
}