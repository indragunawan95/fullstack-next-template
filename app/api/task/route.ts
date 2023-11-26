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
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        } else {
            // Handle cases where 'error' is not an Error object
            return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
        }
    }
};
