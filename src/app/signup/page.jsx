'use client'
import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const supabase = createClient()

    const {data, error}= await supabase.auth.signUp({
        email: email, password: password
    }) 
    
    if(error){
        console.error(error);
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
      <button onClick={handleSignup} className="mt-4 px-4 py-2 bg-green-500 text-white">
        Sign Up
      </button>
    </div>
  );
}
