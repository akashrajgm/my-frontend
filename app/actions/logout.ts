'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
    const cookieStore = await cookies()

    // 1. Delete the session token
    cookieStore.delete('session_token')

    // 2. Clear any other auth-related cookies if you have them
    cookieStore.delete('user_role')

    // 3. Send them home
    redirect('/')
}