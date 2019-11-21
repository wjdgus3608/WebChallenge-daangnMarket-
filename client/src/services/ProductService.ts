import axios from 'axios';
import { ApiResponse } from '~services/types';
import AuthStore from '~stores/auth/AuthStore';

export type ProductRegistrationDto = {
  userId?: string;
  image: File;
  category: number;
  title: string;
  description: string;
  price: number;
  filterData?: any;
}

export type ProductDto = {
  id: number;
  userId: string;
  title: string;
  image: string;
  category: number;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  filterdata: any;
}

const API_HOST = process.env.API_HOST || 'http://localhost:5000/api';

class ProductService {

  constructor(private authStore: AuthStore) {
  }

  async registration(body: ProductRegistrationDto): Promise<ApiResponse<ProductDto>> {
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
    console.log('res body :',body.filterData)
    const formData = new FormData();
    formData.append('image', body.image);
    formData.append('userId', String(this.authStore.auth.id));
    formData.append('category', String(body.category));
    formData.append('title', body.title);
    formData.append('description', body.description);
    formData.append('price', String(body.price));
    if(body.filterData!=undefined)
    formData.append('filterdata', String(body.filterData.carYear)+'/'+String(body.filterData.carMile)+'/'+String(body.filterData.isSmoke));
    else formData.append('filterdata', '');

    return axios.post<ProductRegistrationDto, ApiResponse<ProductDto>>(`${API_HOST}/products`, formData, {
      headers: {'Content-Type': 'multipart/form-data' }
    });
  }

  async getAll(): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products`);
  }

  async getById(id: string): Promise<ApiResponse<ProductDto>> {
    return axios.get(`${API_HOST}/products/${id}`);
  }

  async getByCategory(category: string): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products/category/${category}`);
  }

  async getByCategoryWithFilter(category: string, filterData:any): Promise<ApiResponse<ProductDto[]>> {
    return axios.post(`${API_HOST}/products/category/${category}/filtered`,{
        carYear:filterData.carYear,
        carMile:filterData.carMile,
        radioChecked:filterData.radioChecked
      });
  }

}

export default ProductService;
