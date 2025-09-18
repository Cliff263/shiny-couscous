import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { Product, ProductCategory } from '@/sanity.types'

// Regular Sanity client for non-React contexts like sitemap
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const getAllProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...24] {
    _id,
    title,
    price,
    image,
    description,
    category->{title, slug}
  }`
  const products = await client.fetch(query)
  return products as Product[];    
}

export const getAllProductCategories = async () => {
  const query = `*[_type == "productCategory"]`
  const productCategories = await client.fetch(query)
  return productCategories as ProductCategory[];
}

export const getCategoryBySlug = async (slug: string) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await client.fetch(query, { slug });
  return category as ProductCategory;
}

export const getProductsByCategorySlug = async (slug: string) => {
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]`
  const products = await client.fetch(query, { slug });
  return products as Product[];
}

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    category->title match "*" + $searchQuery + "*" ||
    category->slug.current match "*" + $searchQuery + "*"
  )]`;

  const products = await client.fetch(query, { searchQuery });
  return products as Product[];
}

export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await client.fetch(query, { id });
  return product as Product;
}
