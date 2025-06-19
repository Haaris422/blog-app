'use server'

import { emailRegex, passwordRegex } from '@/lib/constants/regex'
import { createClient } from '@/lib/supabase/server'


export async function login(_prevState: FormState, formData: FormData):Promise<FormState> {
  const supabase = await createClient()
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

   if (!emailRegex.test(email)) {
    return { data:{
        email, password
      },error: 'Invalid Email Format' };
  }

  if (!passwordRegex.test(password)) {
    return {
      data:{
        email, password
      },
      error:
        'Invalid Password. Must be 8+ characters, one uppercase letter, one digit, and one special character.',
    };
  }
  const data = {
    email: email,
    password: password
  }


  const response = await supabase.auth.signInWithPassword(data)
  console.log('logIn: login function response: ', response);
  if (response.error) {
    return {
            data:{
        email, password
      },

      error:'Invalid Email/Password'
    }
  }

  return {success: true}
}

export async function signup(_prevState: FormState, formData: FormData):Promise<FormState> {
  const supabase = await createClient()
const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const full_name = formData.get('full_name') as string;

   if (!emailRegex.test(email)) {
    return { data:{
        email, password,full_name
      },error: 'Invalid email format' };
  }

  if (!passwordRegex.test(password)) {
    return {
      data:{
        email, password,full_name
      },
      error:
        'Invalid password. Must be 8+ characters, one uppercase letter, one digit, and one special character.',
    };
  }
  const data = {
    email: email,
    password: password,
  }

  const response = await supabase.auth.signUp(data);
  console.log('signup: signup function response: ',data, response);

  if (response.error) {
    return {
      data,
      error:
        'Invalid Email or Password.',
    };
  }

  const profilesResponse = await supabase.from('profiles').insert({
    id: response.data.user?.id,
    full_name: full_name,
  })
  
  if(profilesResponse.error) {
    return{
      data:{
        email, password, full_name
      },
      error: 'An error occurred while adding user. Please try again.'
    }
  }
    return {success: true}

}