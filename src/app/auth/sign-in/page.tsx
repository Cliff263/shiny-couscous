import { getCurrentSession } from '@/actions/auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function SignUpPage() {
  const user = await getCurrentSession();
  if (user) {
    redirect("/");
    return null;
  };

  return (
    <div>SignIn</div>
  )
}

