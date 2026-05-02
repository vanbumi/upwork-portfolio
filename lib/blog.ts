export type Article = {
  id: string
  title: string
  description: string
  slug: string
  url: string
  cover_image: string | null
  published_at: string
  tag_list: string[]
  user: {
    name: string
    username: string
    profile_image: string
  }
  body_html?: string // untuk detail artikel
  source: 'devto' | 'medium'
}

// Ambil artikel dari Dev.to
async function fetchFromDevTo(limit: number = 20): Promise<Article[]> {
  const res = await fetch(`https://dev.to/api/articles?username=thepracticaldev&per_page=${limit}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) return []
  
  const data = await res.json()
  
  return data.map((item: any) => ({
    id: `devto-${item.id}`,
    title: item.title,
    description: item.description,
    slug: item.slug,
    url: item.url,
    cover_image: item.cover_image,
    published_at: item.published_at,
    tag_list: item.tag_list,
    user: {
      name: item.user.name,
      username: item.user.username,
      profile_image: item.user.profile_image
    },
    source: 'devto'
  }))
}

// Ambil artikel dari RSS Medium (konversi ke JSON)
async function fetchFromMedium(username: string = '@thepracticaldev'): Promise<Article[]> {
  try {
    // Medium RSS to JSON API (free, no CORS)
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) return []
    
    const data = await res.json()
    
    if (!data.items) return []
    
    return data.items.slice(0, 10).map((item: any, index: number) => ({
      id: `medium-${index}`,
      title: item.title,
      description: item.description.replace(/<[^>]*>/g, '').substring(0, 200),
      slug: item.link.split('/').pop() || `medium-${index}`,
      url: item.link,
      cover_image: item.thumbnail || null,
      published_at: item.pubDate,
      tag_list: item.categories || [],
      user: {
        name: item.author || 'Medium Author',
        username: username.replace('@', ''),
        profile_image: 'https://cdn-icons-png.flaticon.com/512/5968/5968906.png'
      },
      source: 'medium'
    }))
  } catch (error) {
    console.error('Medium fetch error:', error)
    return []
  }
}

// Fungsi utama: ambil dari semua sumber
export async function getAllArticles(limit: number = 20): Promise<Article[]> {
  const [devtoArticles, mediumArticles] = await Promise.all([
    fetchFromDevTo(limit),
    fetchFromMedium('@thepracticaldev') // Ganti dengan username Medium Anda nanti
  ])
  
  const allArticles = [...devtoArticles, ...mediumArticles]
  
  // Urutkan berdasarkan tanggal terbaru
  allArticles.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )
  
  return allArticles.slice(0, limit)
}

// Ambil 1 artikel berdasarkan slug (untuk halaman detail)
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Coba dari Dev.to dulu
  const devtoRes = await fetch(`https://dev.to/api/articles?username=thepracticaldev&per_page=100`, {
    next: { revalidate: 3600 }
  })
  
  if (devtoRes.ok) {
    const devtoArticles = await devtoRes.json()
    const devtoArticle = devtoArticles.find((a: any) => a.slug === slug)
    
    if (devtoArticle) {
      // Ambil konten HTML untuk detail
      const detailRes = await fetch(`https://dev.to/api/articles/${devtoArticle.id}`, {
        next: { revalidate: 3600 }
      })
      const detail = await detailRes.json()
      
      return {
        id: `devto-${devtoArticle.id}`,
        title: devtoArticle.title,
        description: devtoArticle.description,
        slug: devtoArticle.slug,
        url: devtoArticle.url,
        cover_image: devtoArticle.cover_image,
        published_at: devtoArticle.published_at,
        tag_list: devtoArticle.tag_list,
        user: {
          name: devtoArticle.user.name,
          username: devtoArticle.user.username,
          profile_image: devtoArticle.user.profile_image
        },
        source: 'devto',
        body_html: detail.body_html
      }
    }
  }
  
  // Jika tidak ditemukan di Dev.to, coba dari Medium (simplifikasi)
  // Untuk Medium, arahkan ke URL asli karena API terbatas
  return null
}

// Generate static paths untuk semua artikel (opsional, untuk SSG)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  const articles = await getAllArticles(50)
  return articles.map(article => ({ slug: article.slug }))
}