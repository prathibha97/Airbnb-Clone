import prisma from '@/lib/prismaDb';
import { AuthValidator } from '@/lib/validators/auth';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, password } = AuthValidator.parse(body);

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 });
    }

    return new Response(`${error}`, {
      status: 500,
    });
  }
}
