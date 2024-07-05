"use client";

import Image from "next/image";
import { CategoryBd, Product, ProductImage as ProductImageType } from "@/interfaces";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";

interface Props {
  product: Partial<Product> & { productImage?: ProductImageType[] };
  categories: CategoryBd[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' |  'kid' | 'unisex';
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const { 
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      
      images: undefined,
    }
  });
  // React-hook can detect changes with the function "watch"
  watch('sizes');
  const onSizeChanged = (size : string) => {
    const sizes = new Set(getValues('sizes'));
    
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  }

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data; 

    if(product.id) formData.append('id', product.id ?? '');
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.price.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if(images) {
      for(let i = 0; i < images.length; i++ ) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product : updatedProduct } = await createUpdateProduct(formData);

    if(!ok) {
      alert('Producto no se pudo actualizar');
      return;
    }
    router.replace(`/admin/products`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 grid-cols-1 sm:px-0 sm:grid-cols-2  gap-10">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-4">
          <span>Nombre</span>
          <input type="text" placeholder="Nombre Producto" className="p-2 shadow-md rounded-md bg-slate-50" {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col mb-4">
          <span>Slug</span>
          <input type="text" placeholder="Slug Producto" className="p-2 shadow-md rounded-md bg-slate-50" {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col mb-4">
          <span>Descripción</span>
          <textarea
            rows={5}
            placeholder="Descripción Producto"
            className="p-2 shadow-md rounded-md bg-slate-50"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-4">
          <span>Precio</span>
          <input type="number" placeholder="Precio Producto" className="p-2 shadow-md rounded-md bg-slate-50" {...register('price', { required: true, min: 0 })} />
        </div>

        

        <button className="btn-primary w-full mt-10">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
         <div className="flex flex-col mb-4">
            <span>Tags</span>
            <input type="text" placeholder="Categoría Producto" className="p-2 shadow-md rounded-md bg-slate-50" {...register('tags', { required: true })} />
        </div>

        <div className="flex flex-col mb-4">
            <span>Género</span>
            <select className="p-2 shadow-md rounded-md bg-slate-50" {...register('gender', { required: true })}>
                <option value="">-- Seleccione --</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
                <option value="unisex">Unisex</option>
            </select>
        </div>

        <div className="flex flex-col mb-4">
            <span>Categoria</span>
            <select className="p-2 shadow-md rounded-md bg-slate-50" {...register('categoryId', { required: true })}>
                <option value="">[Seleccione]</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div> 

        <div className="flex flex-col mb-4">
          <span>Inventario</span>
          <input type="number" placeholder="Precio Producto" className="p-2 shadow-md rounded-md bg-slate-50" {...register('inStock', { required: true, min: 0 })} />
        </div>


        {/* As checkboxes */}
        <div className="flex flex-col mb-4">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- if is selected
                <div 
                  key={size} 
                  onClick={() => onSizeChanged(size)}
                  className={
                    clsx(
                      "py-1 px-2 border rounded-xl mr-2 mb-2 w-14 transition-all duration-300 text-center font-medium cursor-pointer",
                      {
                        "bg-blue-500 text-white" : getValues('sizes').includes(size)
                      }
                    )
                  }>
                  <span>{ size }</span>
                </div>
              ))
            }
          </div>
          <div className="flex flex-col mb-4">
            <span>Imagenes</span>
            <input 
              type="file"
              {...register('images')}
              multiple 
              className="p-2 shadow-md rounded-md bg-slate-50" 
              accept="image/png, image/jpeg, image/avif, image/webp"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.productImage?.map(image => (
                <div key={image.id}>
                  <ProductImage
                    alt={product.title ?? ''}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md w-full"
                  />
                  <button 
                    type="button"
                    onClick={() => deleteProductImage(image.id, image.url)}
                    className="btn-danger w-full rounded-b-xl text-center"
                  >Eliminar</button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};