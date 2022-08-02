import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'

/**Function fetch GET  */
export function useFetch(url) {
   const [data, setData] = useState({})
   const [error, setError] = useState(false)
   const [isDataLoading, setDataLoading] = useState(true)
   const [auth, setAuth] = useContext(AuthContext)

   useEffect(() => {
      if (!url) {
         return
      }
      if (!auth) {
         return
      }
      setDataLoading(true)
      if (auth) {
         async function fetchData() {
            try {
               const response = await fetch(url, {
                  headers: {
                     Authorization: `bearer ${auth?.token}`,
                  },
                  method: 'GET',
               })
               const data = await response.json()
               setData(data)
            } catch (error) {
               console.log(error)
               setError(true)
            } finally {
               setDataLoading(false)
            }
         }
         fetchData()
      }
   }, [url, auth])
   return { isDataLoading, data, error }
}

/**Function fetch POST  */
export function usePostFetch({ body }) {
   const [data, setData] = useState({})
   const [error, setError] = useState(false)
   const [isDataLoading, setDataLoading] = useState(true)

   useEffect(() => {
      if (!body) {
         return
      }

      setDataLoading(true)
      async function fetchData() {
         try {
            const response = await fetch('http://localhost:3000/api/posts', {
               method: 'POST',
               headers: {
                  Accept: 'application/json, text/plain',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ ...body }),
            })
            const data = await response.json()
            setData(data)
         } catch (error) {
            console.log(error)
            setError(true)
         } finally {
            setDataLoading(false)
         }
      }
      fetchData()
   }, [body])
   return { isDataLoading, data, error }
}
