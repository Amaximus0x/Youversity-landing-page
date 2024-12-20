import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!process.env.KLAVIYO_PRIVATE_API_KEY || !process.env.KLAVIYO_LIST_ID) {
      throw new Error('Klaviyo configuration is missing')
    }

    let profileId;

    try {
      // Try to create new profile
      const klaviyoResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
          'revision': '2023-02-22'
        },
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: {
              email: email,
              properties: {
                source: "Beta Signup Form",
                signed_up_at: new Date().toISOString()
              }
            }
          }
        })
      })

      const responseText = await klaviyoResponse.text()
      const responseData = JSON.parse(responseText)

      if (klaviyoResponse.status === 409) {
        // Profile exists, get the ID from error response
        profileId = responseData.errors[0].meta.duplicate_profile_id
      } else if (!klaviyoResponse.ok) {
        throw new Error(responseData.errors?.[0]?.detail || 'Failed to create profile in Klaviyo')
      } else {
        // New profile created
        profileId = responseData.data.id
      }
    } catch (error) {
      console.error('Profile creation error:', error)
      throw error
    }

    // Add to list using profile ID
    const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${process.env.KLAVIYO_LIST_ID}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
        'revision': '2023-02-22'
      },
      body: JSON.stringify({
        data: [{
          type: "profile",
          id: profileId
        }]
      })
    })

    if (!listResponse.ok) {
      throw new Error('Failed to add email to list')
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Full subscription error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit email' },
      { status: 500 }
    )
  }
} 