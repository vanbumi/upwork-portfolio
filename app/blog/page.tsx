// Tipe data untuk artikel dari Dev.to API
type Article = {
  id: number
  title: string
  description: string
  url: string
  cover_image: string | null
  published_at: string
  tag_list: string[]
  user: {
    name: string
    username: string
    profile_image: string
  }
}

// Fungsi untuk mengambil artikel dari Dev.to API
async function getArticles(): Promise<Article[]> {
  // Dev.to API endpoint untuk artikel user (ganti 'ersya' dengan username Dev.to Anda)
  // Untuk testing, kita pakai artikel dari user 'thepracticaldev' (punya Dev.to)
  const res = await fetch('https://dev.to/api/articles?username=thepracticaldev&per_page=6', {
    next: { revalidate: 3600 } // ISR: revalidate setiap 1 jam (3600 detik)
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch articles')
  }
  
  return res.json()
}

import Link from 'next/link'
import { Header } from '@/components/layouts/Header'
import { Container } from '@/components/ui/Container'

export default async function BlogPage() {
  // Ambil data artikel di server (SSR - Server Side Rendering)
  const articles = await getArticles()

  // Format tanggal ke format yang lebih mudah dibaca
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <main>
      <Header />
      <Container className="py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sharing my journey and knowledge about Next.js, Tailwind CSS, and web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Cover Image */}
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
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tag_list.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </a>
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                {/* Author & Date */}
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

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href="https://dev.to/ersya" 
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