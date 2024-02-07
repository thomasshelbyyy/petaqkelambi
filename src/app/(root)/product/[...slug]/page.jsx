import ProductsComponent from "@/components/Products";
import ProductsPageComponent from "@/components/client/ProductsPageComponent";

export function generateMetadata({ params }) {
  return {
    title: `${params.slug[0]} ${params.slug[1] || "Top"} products | Petaqkelambi`
  }
}

export default function ProducPage({ params }) {
  return (
    <ProductsPageComponent>
      <ProductsComponent params={params} />
    </ProductsPageComponent >
  )
}