import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export async function saveUser(request: Request){

    const {name,email,password} = await request.json()

    if (request.method == 'POST'){

        if (!await prisma.user.findUnique({email})){
            await bcrypt.hash(password,10)
            await prisma.user.create({data: {name,email,password}})

        }

    }

    return Response.json({message:"User created successfully"},{status:201})

}
    
