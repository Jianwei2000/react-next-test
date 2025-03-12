"use client";

import { useCart } from "@/hooks/use-cart";

// 商品列表
const allProducts = [
  {
    id: 0,
    name: "小熊餅乾",
    price: 50,
  },
  {
    id: 1,
    name: "巧克力豆餅乾",
    price: 100,
  },
  {
    id: 2,
    name: "小老板海苔",
    price: 150,
  },
];

export default function StoreTestPage() {
  const { onDecrease, onIncrease, cartItems, totalAmount, totalQty, onAdd } =
    useCart();

  return (
    <>
      <h1>測試的商品</h1>
      <ul>
        {allProducts.map((v) => {
          return (
            <li key={v.id}>
              {v.name} / {v.price}
              <button
                onClick={() => {
                  onAdd(v);
                }}
              >
                加入購物車
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <hr />
      <br />
      <h2>購物車</h2>
      <ul>
        {cartItems.map((v) => {
          return (
            <li key={v.id}>
              {v.name}(單價:NT${v.price})(數量:{v.count}) / 小計: NT$
              {(v.count * v.price).toLocaleString()}
              <button
                onClick={() => {
                  onIncrease(v.id);
                }}
              >
                遞增+
              </button>
              <button
                onClick={() => {
                  onDecrease(v.id);
                }}
              >
                遞減-
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      <p>
        總數量:{totalQty} / 總金額:NT${totalAmount}
      </p>
    </>
  );
}
