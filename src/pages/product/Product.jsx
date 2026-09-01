import React, { useState } from 'react'
import ProductCard from './productCard/ProductCard'
import ProductFilter from './productFilter/ProductFilter'
import { getCategories, getProducts, getProductsPage } from '../../api'
import { useApi } from '../../hooks/useApi'

const Product = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null)

  const { data: page } = useApi((options) => getProductsPage(options), [])
  const { data: categories } = useApi((options) => getCategories(options), [])

  // Filtering happens server-side, so changing a filter refetches.
  const { data: products, loading, error } = useApi(
    (options) =>
      getProducts(
        {
          categoryId: selectedCategoryId,
          subcategoryId: selectedSubcategoryId,
        },
        options
      ),
    [selectedCategoryId, selectedSubcategoryId]
  )

  return (
  <main>
    <ProductFilter
      content={page}
      categories={categories || []}
      selectedCategoryId={selectedCategoryId}
      selectedSubcategoryId={selectedSubcategoryId}
      onCategoryChange={setSelectedCategoryId}
      onSubcategoryChange={setSelectedSubcategoryId}
    />
    <ProductCard data={products} loading={loading} error={error}/>
  </main>
  )
}

export default Product
