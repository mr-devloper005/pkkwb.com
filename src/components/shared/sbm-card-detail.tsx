"use client"

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, MessageCircle, Heart, Share2, MoreHorizontal, ExternalLink, Tag, Copy, LogIn } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Button } from '@/components/ui/button'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'

type SBMContent = {
  location?: string
  category?: string
  description?: string
  email?: string
  website?: string
  phone?: string
  date?: string
}

export function SBMCardDetail({
  post,
  task,
  taskLabel,
  taskRoute,
  related,
}: {
  post: SitePost
  task: TaskKey
  taskLabel: string
  taskRoute: string
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as SBMContent) : {}
  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const router = useRouter()

  const images = Array.isArray(post.media) ? post.media.map(item => item.url).filter(Boolean) : []
  const mainImage = images[0] || '/placeholder.svg?height=400&width=600'
  const descriptionHtml = formatRichHtml(content.description || post.summary || 'Check out this amazing bookmark and resource collection.')

  const handleLike = () => {
    // Redirect to login page
    router.push('/login')
  }

  const handleComment = () => {
    // Redirect to login page
    router.push('/login')
  }

  const handleShare = async () => {
    // Copy URL to clipboard
    const url = `${window.location.origin}${taskRoute}/${post.slug}`
    try {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back to {taskLabel}
        </Link>

        {/* Social Media Style Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Company Logo */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fundtec Services</h3>
                  <p className="text-sm text-gray-500">@fundtec_services</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <div className="mb-6">
              <RichContent html={descriptionHtml} className="text-gray-800 leading-relaxed text-base" />
              {content.website && (
                <a 
                  href={content.website} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline mt-3 font-medium"
                >
                  {content.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Image */}
            {images.length > 0 && (
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                  <ContentImage src={mainImage} alt={post.title} fill className="object-cover" intrinsicWidth={600} intrinsicHeight={400} />
                </div>
              </div>
            )}

            {/* Tags and Meta */}
            <div className="mb-6">
              {content.category && (
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium mb-2">
                  <Tag className="h-4 w-4" />
                  {content.category}
                </div>
              )}
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {content.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {content.location}
                  </div>
                )}
                {content.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {content.email}
                  </div>
                )}
                {content.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {content.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {content.website && (
              <div className="mb-6">
                <a 
                  href={content.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          {/* Social Interaction Footer */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-colors ${
                    liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  <Heart className={`h-5 w-5 ${liked ? 'fill-red-600' : ''}`} />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button 
                  onClick={handleComment}
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
              </div>
              <button 
                onClick={handleShare}
                className={`flex items-center gap-2 transition-colors ${
                  shared ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <Copy className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {shared ? 'Copied!' : 'Share'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Content */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">More from Fundtec Services</h2>
            <div className="space-y-4">
              {related.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                  <Link href={`${taskRoute}/${item.slug}`} className="block">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.summary || 'Click to explore this content...'}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
