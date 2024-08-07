'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

export default function Register() {
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({})
  const router = useRouter()
  const { address } = useAccount()

  const handleUserTypeSelect = (type: string) => {
    setUserType(type)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userType, walletAddress: address }),
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {!userType ? (
        <div>
          <button onClick={() => handleUserTypeSelect('freelancer')}>Freelancer</button>
          <button onClick={() => handleUserTypeSelect('client')}>Client</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {userType === 'freelancer' && (
            <>
              <input name="skills" placeholder="Skills" onChange={handleInputChange} />
              <input name="experience" placeholder="Experience" onChange={handleInputChange} />
            </>
          )}
          {userType === 'client' && (
            <>
              <input name="company" placeholder="Company" onChange={handleInputChange} />
              <input name="projectType" placeholder="Project Type" onChange={handleInputChange} />
            </>
          )}
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  )
}