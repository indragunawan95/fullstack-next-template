import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const todo = await prisma.todo.create({
            data: {
                text: body.text,
            },
        });

        return new Response(JSON.stringify({ data: todo }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
};
