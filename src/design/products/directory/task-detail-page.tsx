"use client"

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Share2, Plus, Presentation, ChevronDown, ChevronRight, Archive, Tag as TagIcon, Flag, User, MessageCircle, Repeat2, Heart, MoreHorizontal } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState } from 'react'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SchemaJsonLd data={schemaPayload} />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <main className="relative z-10 mx-auto max-w-2xl px-4 py-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all hover:translate-x-1">
          ← Back to {taskLabel}
        </Link>

        {/* Main Card with Unique Design */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          {/* Card Container */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            {/* Unique Header with Gradient */}
            <div className="relative p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Animated Logo */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <span className="text-white font-bold text-lg animate-pulse">F</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Fundtec Services</h3>
                    <p className="text-blue-100 text-sm">Verified Company</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBookmarked(!bookmarked)}
                    className="p-2 hover:bg-white/20 rounded-full transition-all hover:scale-110"
                  >
                    <svg className={`h-5 w-5 ${bookmarked ? 'text-yellow-300 fill-yellow-300' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-full transition-all hover:scale-110">
                    <MoreHorizontal className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

          {/* Card Content */}
            <div className="p-6">
              {/* Unique Title with Badge */}
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 flex-1">
                  {post.title}
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                  FEATURED
                </div>
              </div>

              {/* Description with Unique Styling */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <p className="text-gray-700 leading-relaxed">
                  {description}
                </p>
                {website && (
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline mt-3 font-medium"
                  >
                    {post.title}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Enhanced Image Gallery */}
              {images.length > 0 && (
                <div className="mb-6">
                  <div className="relative group">
                    <div className="relative h-80 overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
                      <ContentImage src={images[imageIndex]} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      
                      {/* Image Navigation */}
                      {images.length > 1 && (
                        <>
                          <button 
                            onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                          >
                            <ChevronRight className="h-4 w-4 rotate-180" />
                          </button>
                          <button 
                            onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      {images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-sm font-medium">
                            {imageIndex + 1} / {images.length}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                          <button
                            key={image}
                            onClick={() => setImageIndex(index)}
                            className={`relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                              index === imageIndex ? 'ring-2 ring-blue-500 ring-offset-2' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            <ContentImage src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enhanced Contact Information */}
              {(location || phone || email || website) && (
                <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    Contact Information
                  </h3>
                  <div className="grid gap-3">
                    {location && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{location}</span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{phone}</span>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{email}</span>
                      </div>
                    )}
                    {website && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{website}</span>
                      </div>
                    )}
                  </div>

                  {website && (
                    <div className="mt-4">
                      <a 
                        href={website} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
                      >
                        Visit website <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Highlights */}
              {highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    Key Highlights
                  </h3>
                  <div className="space-y-3">
                    {highlights.slice(0, 3).map((highlight, index) => (
                      <div key={highlight} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <div className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Card Footer - Social Actions */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Repeat2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Retweet</span>
                  </button>
                  <button 
                    onClick={() => setLiked(!liked)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      liked ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 group-hover:scale-110 transition-transform ${liked ? 'fill-red-600' : ''}`} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                </div>
                <button className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Listings</h2>
            <div className="space-y-4">
              {related.slice(0, 3).map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
