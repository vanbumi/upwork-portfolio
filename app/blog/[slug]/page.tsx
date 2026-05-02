import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layouts/Header'
import { Container } from '@/components/ui/Container'
import { getArticleBySlug } from '@/lib/blog'

// 👉 HAPUS generateStaticParams - tidak lagi prerender semua halaman saat build
// Biarkan Next.js generate halaman saat pertama kali diakses (on-demand)

// Halaman detail artikel dengan ISR (revalidate setiap 1 jam)
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let article = null
  let error = false
  
  try {
    article = await getArticleBySlug(slug)
  } catch (err) {
    console.error(`Failed to fetch article for slug: ${slug}`, err)
    error = true
  }
  
  // Jika error atau artikel tidak ditemukan, tampilkan 404
  if (error || !article) {
    notFound()
  }
  
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
      <Container className="py-24 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          ← Back to all articles
        </Link>
        
        {article.cover_image && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <img 
              src={article.cover_image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img 
              src={article.user.profile_image} 
              alt={article.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-900">{article.user.name}</div>
              <time dateTime={article.published_at}>
                {formatDate(article.published_at)}
              </time>
            </div>
          </div>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {article.source === 'devto' ? 'Dev.to' : 'Medium'}
          </span>
        </div>
        
        {article.body_html ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        ) : (
          <div className="prose prose-lg max-w-none">
            <p>{article.description}</p>
            <p className="text-gray-500 italic">
              Full article available on{' '}
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {article.source === 'devto' ? 'Dev.to' : 'Medium'}
              </a>
            </p>
          </div>
        )}
        
        {article.tag_list.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tag_list.map((tag) => (
                <span 
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}

// ISR: revalidate setiap 1 jam (halaman yang sudah di-cache akan diperbarui)
export const revalidate = 3600