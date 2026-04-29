'use client'

import { useState } from "react"
import { Header } from "@/components/layouts/Header"
import { Container } from "@/components/ui/Container"

export default function APIReferencePage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const fetchTestAPI = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            const result = await res.json()
            setData(result)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
     
    return (
        <main>
            <Header />
            <Container className="py-24">
                <h1 className="text-3xl font-bold mb-6">API Reference & Testing</h1>
                <p className="mb-4-gray-600">This page for integrasi API</p>

                <button
                    onClick={fetchTestAPI}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-6 hover:bg-blue-700 transition">
                        {loading ? 'Loading...' : 'Test Fetch API'}
                </button>

                {data && (
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
            </Container>
        </main>
    )
}