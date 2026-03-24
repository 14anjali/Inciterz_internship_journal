import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [products, error, loading] = useCustomReactQuery('/api/products')

    if (error) {
        return <h1>Something went wrong</h1>
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>API Integration in React</h1>
            <h2>Number of Products are : {products.length}</h2>
        </>
    )
}

export default App


const useCustomReactQuery = (urlPath) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(false)

                const response = await axios.get(urlPath)
                setProducts(response.data)

            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [urlPath])

    return [products, error, loading]
}