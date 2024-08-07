import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    const client = await clientPromise
    const db = client.db('freelance_forge')
    await db.collection('users').insertOne(userData)
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}