import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit email')
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit email' },
      { status: 500 }
    )
  }
} 