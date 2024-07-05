export const revalidate = 0;

import Link from 'next/link';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ProductsPage({ searchParams } : Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <div className="flex justify-between items-center">
        <Title title="Mantenimiento de Productos" />

        <div className="flex justify-end mb-5">
          <Link
            className="btn-primary"
            href="/admin/product/new"
          >Nuevo Producto</Link>
        </div>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
                <tr 
                  key={product.id} 
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                    <Link 
                      href={`/admin/product/${product.slug}`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <ProductImage 
                        src={product.productImage[0]?.url}
                        width={80}
                        height={80}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className="hover:text-blue-600 text-gray-900 transition-colors duration-300"
                    >{product.title}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-gray-900">
                    {currencyFormat(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.inStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <p className="w-14 text-sm border-2 rounded-xl text-center" key={size}>
                        {size}
                      </p>
                    ))}
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}