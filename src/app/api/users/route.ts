import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('freelance_forge')
    
    // Find all users in the collection
    const users = await db.collection('users').find({}).toArray()
    
    // Remove sensitive information if needed
    const safeUsers = users.map(user => {
      const { _id, walletAddress, userType, ...safeUser } = user
      return { id: _id.toString(), walletAddress, userType, ...safeUser }
    })
    
    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}