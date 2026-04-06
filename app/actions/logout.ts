'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session_token')

    // Note: LocalStorage must be cleared on the client side. 
    // We handle that by redirecting to a page that clears it or using a client-side button.
    redirect('/login')
}