import ProductDescription from '../../../components/Products/ProductDescription';
import ProductCheckout from '../../../components/Products/ProductCheckout';
import ProductGallery from '../../../components/Products/ProductGallery';

export async function generateStaticParams() {
  try {
    const res = await fetch('https://api.joshuayi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();

    // console.log(data);
    return data.map((curr) => ({
      productId: curr.productId.toString(),
    }));
  } catch (error) {
    console.log('Error generating static parameters', error);
    return [];
  }
}
async function getProduct(productId) {
  console.log('Starting fetch');
  try {
    const res = await fetch(`https://api.joshuayi.com/products/${productId}`, {
      cache: 'no-cache',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID: ${productId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error fetching product', error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  if (!params || !params.productId) {
    return <div>Invalid Product ID</div>;
  }

  const product = await getProduct(params.productId);
  console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className='flex flex-col lg:flex-row py-20 justify-evenly lg:items-start items-center'>
      <ProductGallery product={product}></ProductGallery>
      <div>
        <ProductDescription product={product}></ProductDescription>
      </div>
      <div>
        <ProductCheckout product={product}></ProductCheckout>
      </div>
    </div>
  );
}
