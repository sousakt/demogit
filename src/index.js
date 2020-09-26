import {
  getListProductService,
  deleteProductService,
  addProductService,
  getProductById,
  updateProductService,
  callapi,
} from "./utils/callapi.js";
import Product from "./models/product.js";

const renderTable = (listProduct) => {
  if (listProduct && listProduct.length > 0) {
    let contentHTML = "";
    listProduct.map((product) => {
      contentHTML += `
          <tr>
              <td>${product.id}</td>
              <td>${product.tenSP}</td>
              <td>${product.gia}</td>
              <td>
                  <img src="${product.hinhAnh}" width = "50">
              </td>
              <td>
                <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
              </td>
          </tr>
  
          `;
    });
    return contentHTML;
  }
};

const renderListProduct = () => {
  callapi("SANPHAM", "GET", null)
    .then((result) => {
      const contentTBody = renderTable(result.data);
      document.getElementById("tblDanhSachSanPham").innerHTML = contentTBody;
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderHTML = () => {
  const contentHTML = `
    <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class='container'>
        <div class="row">
          <div class="col-md-3">
            <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input id="hinhAnh" class="form-control" placeholder="Link hình" />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá </th>
          <th>Hình ảnh</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham">

      </tbody>
    </table>
  </div>
    `;
  document.getElementById("root").innerHTML = contentHTML;
};

renderHTML();
renderListProduct();
/**
 * Delete
 */

window.deleteProduct = deleteProduct; //thuộc tính này tự đặt
function deleteProduct(id) {
  callapi(`SANPHAM/${id}`, "DELETE", null)
    .then((result) => {
      alert("Delete Success!");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Edit Product
 */

window.editProduct = editProduct;
function editProduct(id) {
  getProductById(id)
    .then((result) => {
      /**
       * gán dữ liệu trả về 4 ô input
       */
      getEle("maSP").value = result.data.id;
      getEle("tenSP").value = result.data.tenSP;
      getEle("gia").value = result.data.gia;
      getEle("hinhAnh").value = result.data.hinhAnh;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Cập nhật
 */

getEle("btnCapNhat").addEventListener("click", function () {
  //DOM lấy value từ 4 ô input
  const id = getEle("maSP").value;
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product(id, ten, gia, hinhAnh);

  updateProductService(product)
    .then(() => {
      alert("Update Success!");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Thêm sản phẩm
 */
getEle("btnThem").addEventListener("click", function () {
  /**
   * Dom tới 3 ô input tên , giá , hình
   */
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product("", ten, gia, hinhAnh);

  addProductService(product)
    .then((result) => {
      alert("Add Success!");
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
});

function getEle(id) {
  return document.getElementById(id);
}
