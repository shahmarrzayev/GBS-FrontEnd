import React from 'react'
import DetailBanner from './detailBanner/DetailBanner'
import { useParams } from 'react-router-dom';
import DetailDescription from './detailDescription/DetailDescription';
import DetailOtherProduct from './detailOtherProduct/DetailOtherProduct';
import { getProductBySlug, getProducts } from '../../api';
import { useApi } from '../../hooks/useApi';
import DataState from '../../components/dataState/DataState';

const ProductDetail = () => {
  const { slug } = useParams();

  const { data: product, loading, error } = useApi(
    (options) => getProductBySlug(slug, options),
    [slug]
  );
  const { data: otherProducts } = useApi(
    (options) => getProducts({ excludeSlug: slug }, options),
    [slug]
  );

  return (
    <main>
      <DataState loading={loading} error={error}>
        <DetailBanner data={product}/>
        <DetailDescription data={product}/>
        <DetailOtherProduct data={otherProducts}/>
      </DataState>
    </main>
  )
}

export default ProductDetail
