import { useState, useEffect } from 'react'

// 此勾子的用途就是在元件初次渲染時，向某伺服器獲取(GET)資料，放入狀態中
export function useFetch(url, option) {
  // fetch後得到的資料
  const [data, setData] = useState(null)
  // 載入指示開關，預設是true(一開始就先作載入)
  const [loading, setLoading] = useState(true)
  // 記錄錯誤用狀態
  const [error, setError] = useState(null)

  // 樣式2 只在初次渲染"之後"執行一次，之後不再執行
  useEffect(() => {
    // 作fetch資料的函式
    async function fetchData() {
      try {
        const res = await fetch(url, option)
        const json = await res.json()
        setData(json)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    // 呼叫的函式
    fetchData()
  }, [url, option])

  return { data, loading, error }
}
