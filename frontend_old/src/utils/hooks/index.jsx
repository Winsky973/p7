import { useEffect, useState } from 'react'

/**Function fetch GET  */
export function useFetch(url) {
   const [data, setData] = useState({})
   const [error, setError] = useState(false)
   const [isDataLoading, setDataLoading] = useState(true)

   useEffect(() => {
      if (!url) {
         return
      }

      setDataLoading(true)
      async function fetchData() {
         try {
            const response = await fetch(url)

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
   }, [url])
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

// export function usePostFetch(options) {
//    console.log('options : ', options)
//    const [data, setData] = useState({})
//    const [error, setError] = useState(false)
//    const [isDataLoading, setDataLoading] = useState(true)

//    setDataLoading(true)

//    useEffect(() => {
//       async function fetchData() {
//          try {
//             const response = await fetch('http://localhost:3000/api/posts', {
//                method: 'POST',
//                headers: {
//                   Accept: 'application/json, text/plain',
//                   'Content-Type': 'application/json',
//                },
//                body: JSON.stringify({ ...options }),
//             })
//             const data = await response.json()
//             setData(data)
//          } catch (error) {
//             console.log(error)
//             setError(true)
//          } finally {
//             setDataLoading(false)
//          }
//       }
//       fetchData()
//    }, [options])

//    return { isDataLoading, data, error }
// }

// Object.entries(body).length === 0
// async function fetchAuth() {
//     setDataLoading(true)
//     try {
//        const response = await fetch('http://localhost:3000/api/auth/login', {
//           method: 'POST',
//           headers: {
//              Accept: 'application/json, text/plain',
//              'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email: userInfo.email , password: userInfo.password }),
//        })
//        const data = await response.json()
//        console.log(data)
//     } catch (error) {console.log(error)}
//     finally { setDataLoading(false) }
//  }
//  fetchAuth()

// }
