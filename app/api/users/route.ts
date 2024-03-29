import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import startDb from '@lib/db';
import UserModel from '@models/userModel';
import { NewUserRequest } from '@/app/types';
import { hash } from 'bcrypt';
import EmailVerificationToken from '@models/emailVerificationToken';
import crypto from 'crypto';
import { sendEmail } from '@/app/lib/email';

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;

  const hashedPassword = await hash(body.password, 10);
  await startDb();

  const alreadyExists = await UserModel.findOne({
    email: body.email,
  });

  if (alreadyExists) {
    return NextResponse.json(
      {
        error: 'User with email already exists',
      },
      {
        status: 400,
      }
    );
  }
  const newUser = await UserModel.create({
    ...body,
  });

  const token = crypto.randomBytes(36).toString('hex');

  await EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL}?token=${token}&userId=${newUser._id}`;
  await sendEmail({
    profile: { name: newUser.name, email: newUser.email },
    subject: 'forget-password',
    linkUrl: verificationUrl,
  });

  return NextResponse.json({
    message: 'Please Check Your email!',
  });
};
