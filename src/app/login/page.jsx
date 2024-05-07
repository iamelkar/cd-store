'use client'
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

// import { logIn } from '../utils/auth';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const supabase = createClient()

    const{data, error}= await supabase.auth.signInWithPassword({
        email: email, password: password
    })

    if(error){
        return console.error(error)
    }
    else{
        router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border mt-4"
      />
      <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-blue-500 text-white">
        Log In
      </button>
    </div>
  );
}
