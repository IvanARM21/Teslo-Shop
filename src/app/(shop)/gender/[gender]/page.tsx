export const revalidate = 60; // 60 Seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
import { Pagination } from "@/components";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string
  },
  searchParams: {
    page?: string;
  }
}

const labels : Record<string, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex'
}

export default async function GenderByPage({ params, searchParams } : Props) {

  const { gender } = params;

  const page = +searchParams.page!
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page, gender: gender as Gender});

  if(products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle={`Ropa de ${labels[gender]}`}
        className="mb-2"
      />

      <ProductGrid 
        products={products}
      />
      
      <Pagination 
        totalPages={totalPages}
      />
    </>
  );
}