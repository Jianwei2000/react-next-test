'use client'

import { useState, createContext, useContext, useEffect } from 'react'

const CartContext = createContext(null)


CartContext.displayName = 'TestCartContext'


export function CartProvider({ children }) {
  // 購物車項目狀態
  const [cartItems, setCartItems] = useState([])
  // 記錄首次渲染是否完成的信號值
  const [didMount, setDidMount] = useState(false)

  // 處理商品數量 遞增
  const onIncrease = (cartItemId) => {
    const nextCartItems = cartItems.map((v) => {
    
      if (v.id == cartItemId) {
        // 如果比對出id為cartItemId的成員，展開物件後遞增count屬性(+1)
        return { ...v, count: v.count + 1 }
      } else {
        // 否則直接返回物件
        return v
      }
    })

    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 處理商品數量 遞減
  const onDecrease = (cartItemId) => {
    const nextCartItems = cartItems.map((v) => {
      // 在成員(物件)中比對id為cartItemId的成員
      if (v.id == cartItemId) {
        // 如果比對出id為cartItemId的成員，展開物件後遞減count屬性(-1)
        return { ...v, count: v.count - 1 }
      } else {
        // 否則直接返回物件
        return v
      }
    })

    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 刪除商品
  const onRemove = (cartItemId) => {
    const nextCartItems = cartItems.filter((v) => v.id !== cartItemId)

    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 加入購物車
  const onAdd = (product) => {
    // 先判斷此商品是否已經在購物車裡
    const foundIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    )

    if (foundIndex !== -1) {
      // 已經在購物車裡 ===> 作遞增
      onIncrease(product.id)
    } else {
      // 沒有在購物車裡 ===> 作新增
      // 少了一個count數量屬性(商品物件中沒數量，要購物車項目才有)
      const newItem = { ...product, count: 1 }
      // 加到購物車最前面
      const nextCartItems = [newItem, ...cartItems]
      setCartItems(nextCartItems)
    }
  }

  // 計算總數量&金額 陣列的reduce方法(累加/歸納)
  const totalQty = cartItems.reduce((acc, v) => acc + v.count, 0)
  const totalAmount = cartItems.reduce((acc, v) => acc + v.count * v.price, 0)

  // 一開始進入網頁應用(首次渲染時間點之後)
  useEffect(() => {
    // 從localStorage取出資料，設定到cartItems狀態
    const nextCartItems = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(nextCartItems)
    // 信號值設為true，代表首次渲染已經完成
    setDidMount(true)
  }, [])

  // 之後開始操作應用(監聽狀態cartItems變化時間點之後)
  useEffect(() => {
    // 避開首次渲染
    if (didMount) {
      // 當cartItems有變動時，同步化到localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
    // 下面會有eslint警告提醒，並不需要多加其它的變數在陣列中
    // eslint-disable-next-line
  }, [cartItems])

  return (
    <CartContext.Provider
      // 透過value屬性，將要共享的值加入後，往後代元件們傳遞
      value={{
        onAdd,
        onDecrease,
        onIncrease,
        onRemove,
        cartItems,
        totalAmount,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export const useCart = () => useContext(CartContext)
