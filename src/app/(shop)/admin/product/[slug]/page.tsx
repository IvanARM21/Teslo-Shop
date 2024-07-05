import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/categories/get-categories";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductPage({params} : Props) {

    const { slug } = params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);

    // TODO : New
    if(!product && slug !== 'new') {
        redirect('/admin/products');
    }

    const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar Producto'

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-20 sm:px-10">
        <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left p-4 sm:p-10 mt-10 rounded-md shadow">
            <Title title={title} />

            <ProductForm product={product ?? {}} categories={categories}/>
        </div>
    </div>
  );
}