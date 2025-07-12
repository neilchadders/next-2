
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition, useCallback } from 'react';
import { toast } from "sonner"; // <-- Changed this import
import React from "react";



const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  console.log("[AddToCart] Component rendered");
  const router = useRouter();
  console.log("Add to cart clicked outside");
  const [isPending, startTransition] = useTransition();



const handleAddToCart = useCallback(() => {
  startTransition(async () => {
    console.log("clicked (inside)");
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart"),
      },
    });
  });
  console.log("Component rendered with productId", item.productId);

}, [item, router]);
 // ← Close handleAddToCart
  

// Handle remove from cart
const handleRemoveFromCart = async () => {
  startTransition(async () => {
    const res = await removeItemFromCart(item.productId);

    toast(res.message);

    return;
  });
};

// Check if item is in cart
const existItem =
  cart && cart.items.find((x) => x.productId === item.productId);

return existItem ? (
  <div>
    <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
    </Button>
    <span className='px-2'>{existItem.qty}</span>
    <Button type='button' variant='outline' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}
    </Button>
  </div>
) : (
  <Button className='w-full' type='button' onClick={handleAddToCart}>
    {isPending ? (
      <Loader className='w-4 h-4 animate-spin' />
    ) : (
      <Plus className='w-4 h-4' />
    )}{' '}
    Add To Cart
  </Button>
);
};

export default React.memo(AddToCart);


