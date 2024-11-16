'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Share2, Plus } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    setIsLoading(true)
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      
      const subscriptionData = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: Buffer.from(sub.getKey('p256dh')!).toString('base64'),
          auth: Buffer.from(sub.getKey('auth')!).toString('base64')
        }
      }
      
      setSubscription(sub)
      await subscribeUser(subscriptionData)
    } catch (error) {
      console.error('Failed to subscribe:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function unsubscribeFromPush() {
    setIsLoading(true)
    try {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
    } catch (error) {
      console.error('Failed to unsubscribe:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function sendTestNotification() {
    if (subscription) {
      setIsLoading(true)
      try {
        await sendNotification(message)
        setMessage('')
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!isSupported) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-destructive">Not Supported</CardTitle>
          <CardDescription>
            Push notifications are not supported in this browser.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {subscription ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          Push Notifications
        </CardTitle>
        <CardDescription>
          {subscription 
            ? "You're currently receiving push notifications" 
            : "Enable push notifications to stay updated"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Notification Status</span>
          <Switch 
            checked={!!subscription}
            onCheckedChange={(checked) => checked ? subscribeToPush() : unsubscribeFromPush()}
            disabled={isLoading}
          />
        </div>
        
        {subscription && (
          <div className="space-y-2">
            <Input
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              onClick={sendTestNotification}
              disabled={!message || isLoading}
              className="w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Send Test Notification'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && 'MSStream' in window === false
    )
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null
  }

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Install App
        </CardTitle>
        <CardDescription>
          Add this app to your home screen for quick access
        </CardDescription>
      </CardHeader>
      {isIOS ? (
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Tap the share button and select &quot;Add to Home Screen&quot;
          </p>
        </CardContent>
      ) : (
        <CardFooter>
          <Button className="w-full">
            Add to Home Screen
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default function Page() {
  return (
    <div className="p-4 space-y-4">
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}