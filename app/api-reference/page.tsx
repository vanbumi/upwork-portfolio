'use client'

import { useState } from 'react'
import axios from 'axios'
import { Header } from '@/components/layouts/Header'
import { Container } from '@/components/ui/Container'

export default function APIReferencePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 👇 AXIOS: Fungsi fetch dengan Axios
  const fetchDataWithAxios = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
        timeout: 5000
      })

      // 👈 AXIOS: response.data langsung berisi JSON (tidak perlu .json())
      setData(response.data)
    } catch (err) {
        // 👈 AXIOS: error handling lebih detail
        if (axios.isAxiosError(err)) {
            if (err.code === 'ECONNABORTED') {
                setError('Request timeout - server terlalu lambat')
            } else if (err.response) {
                setError(`Server error! status: ${err.response.status} - ${err.response.statusText}`)
            } else if (err.request) {
                setError(`Tidak bisa terhubung ke server, cek koneksi - ${err.request}`)
            } else {
                setError(err.message)
            }
        } else {
            setError('Terjadi error yang tidak diketahui')
        }
    } finally {
        setLoading(false)
    }
}

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      // 👈 PERBAIKAN DI SINI
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi error yang tidak diketahui')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Header />
      <Container className="py-24">
        <h1 className="text-3xl font-bold mb-6">API Reference & Testing</h1>
        <p className="mb-4 text-gray-600">Belajar mengambil data dari API eksternal</p>
        
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700 transition"
        >
          {loading ? 'Loading...' : 'Ambil Data dari API'}
        </button>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            Error: {error}
          </div>
        )}

        {data && (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </Container>
    </main>
  )
}