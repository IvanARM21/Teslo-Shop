import { initialData } from './seed';
import prisma from '../lib/prisma'

async function main() {

    // await Promise.all([
        // prisma.productImage.deleteMany();
        // prisma.product.deleteMany();
        // prisma.category.deleteMany();
    // ]);

    // 1. Delete Previous Records
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany(); // Verify that User has no relationship with other tables, in this case we should delete the others tables before 
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users, countries } = initialData;

    // Users
    await prisma.user.createMany({
        data: users
    });

    // Countries
    await prisma.country.createMany({
        data: countries
    });

    // Categories
    const categoriesData = categories.map(category => ({
        name: category
    }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // Product
    // const { images, type, ...product1 } = products[0];

    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap['shirts']
    //     }
    // });

    // Products
    products.forEach(async product => {
        const { type, images, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        // Images
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data:imagesData
        });
    });

    console.log('Seed Ejecutado Correctamente');
}

(() => {
    if( process.env.NODE_ENV === 'production') return;
    main();
})();