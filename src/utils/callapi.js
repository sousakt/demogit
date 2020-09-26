import { API_URL } from "./../config/index.js";

const callapi = (uri, method = "GET", data) => {
  return axios({
    url: API_URL + uri,
    method, //method : method 2 thằng giống nhau bỏ bớt
    data,
  });
};

const getListProductService = () => {
  return axios({
    url: "https://5f5c7a6d5e3a4d0016249469.mockapi.io/api/SANPHAM",
    method: "GET",
  });
};

const deleteProductService = (id) => {
  return axios({
    url: `https://5f5c7a6d5e3a4d0016249469.mockapi.io/api/SANPHAM/${id}`,
    method: "DELETE",
  });
};

const addProductService = (product) => {
  return axios({
    url: "https://5f5c7a6d5e3a4d0016249469.mockapi.io/api/SANPHAM",
    method: "POST",
    data: product,
  });
};
const getProductById = (id) => {
  return axios({
    url: `https://5f5c7a6d5e3a4d0016249469.mockapi.io/api/SANPHAM/${id}`,
    method: "GET",
  });
};

const updateProductService = (product) => {
  return axios({
    url: `https://5f5c7a6d5e3a4d0016249469.mockapi.io/api/SANPHAM/${product.id}`,
    method: "PUT",
    data: product,
  });
};

export {
  getListProductService,
  deleteProductService,
  addProductService,
  getProductById,
  updateProductService,
  callapi,
};
