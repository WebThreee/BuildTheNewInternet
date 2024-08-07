import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('freelance_forge')
    const user = await db.collection('users').findOne({ walletAddress: address })
    return NextResponse.json({ exists: !!user })
  } catch (error) {
    console.error('Error checking user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}