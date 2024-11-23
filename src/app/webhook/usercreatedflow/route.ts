import { NextRequest } from 'next/server'
import { createUser } from '@/db/queries/insert'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract only needed fields and format according to schema
    const userData = {
      clerkId: body.data.id,
      email: body.data.email_addresses[0]?.email_address,
      username: body.data.username || body.data.email_addresses[0]?.email_address.split('@')[0],
      fullName: `${body.data.first_name} ${body.data.last_name}`.trim(),
      avatarUrl: body.data.image_url || body.data.profile_image_url,
      lastSignInAt: new Date(body.data.last_sign_in_at),
      createdAt: new Date(body.data.created_at),
      updatedAt: new Date()
    }

    // Insert into database
    await createUser(userData)
    
    console.log('User created successfully:', userData)
    return new Response('User created', { status: 201 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error processing webhook', { status: 500 })
  }
}