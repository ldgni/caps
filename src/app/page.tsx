"use client";

import { useEffect, useState } from "react";

import { FAQ } from "@/components/faq";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { Spinner } from "@/components/ui/spinner";
import { Product, productService } from "@/lib/services/product-service";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Spinner size="large" className="mx-auto" />
      </div>
    );
  }

  return (
    <main>
      <div className="container mx-auto border-[#2e160e] sm:border-x-2">
        {/* Products Section */}
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            reversed={index % 2 !== 0}
          />
        ))}

        {/* Newsletter Section */}
        <Newsletter />

        {/* FAQ Section */}
        <section>
          <FAQ />
        </section>
      </div>
    </main>
  );
}
