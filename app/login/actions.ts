'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const response = await supabase.auth.signInWithPassword(data)
  console.log('logIn: login function response: ', response);
  if (response.error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const response = await supabase.auth.signUp(data)
  console.log('signup: signup function response: ',data, response);

  if (response.error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}