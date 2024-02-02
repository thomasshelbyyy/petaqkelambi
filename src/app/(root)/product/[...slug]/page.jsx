import ProductsComponent from "@/components/Products";
import ProductsPageComponent from "@/components/client/ProductsPageComponent";

export default function ProducPage({ params }) {
  return (
    <ProductsPageComponent>
      <ProductsComponent params={params} />
    </ProductsPageComponent >
  )
}