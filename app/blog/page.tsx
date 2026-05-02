'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layouts/Header'
import { Container } from '@/components/ui/Container'
import { getAllArticles, Article } from '@/lib/blog'

// Fungsi fetch di server (untuk initial data)
async function getInitialArticles(): Promise<Article[]> {
  return await getAllArticles(50)
}

export default function BlogPage() {
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  
  const articlesPerPage = 6
  
  // Ambil data awal
  useEffect(() => {
    getInitialArticles().then(articles => {
      setAllArticles(articles)
      setFilteredArticles(articles)
      setLoading(false)
    })
  }, [])
  
  // Filter articles ketika search atau tag berubah
  useEffect(() => {
    let filtered = [...allArticles]
    
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedTag) {
      filtered = filtered.filter(article =>
        article.tag_list.includes(selectedTag)
      )
    }
    
    setFilteredArticles(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedTag, allArticles])
  
  // Ambil semua tag unik untuk filter
  const allTags = Array.from(new Set(allArticles.flatMap(a => a.tag_list))).slice(0, 20)
  
  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  if (loading) {
    return (
      <main>
        <Header />
        <Container className="py-24">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </Container>
      </main>
    )
  }
  
  return (
    <main>
      <Header />
      <Container className="py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sharing my journey and knowledge about Next.js, Tailwind CSS, and web development.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedTag === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
        
        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {article.cover_image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={article.cover_image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    article.source === 'devto' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {article.source === 'devto' ? 'Dev.to' : 'Medium'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tag_list.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full cursor-pointer hover:bg-blue-200"
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img 
                      src={article.user.profile_image} 
                      alt={article.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{article.user.name}</span>
                  </div>
                  <time dateTime={article.published_at}>
                    {formatDate(article.published_at)}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              ← Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Next →
            </button>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href="https://dev.to/thepracticaldev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Read more on Dev.to
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </Container>
    </main>
  )
}