import productModel from "../../models/product.model.js"


class ProductManager {

  constructor(){
    this.model = productModel
  }

  async readProducts() {
     await this.model.find()
  }

  async getAllProducts({ limit = 10, page = 1, sort = "asc", query = {} }) {
    try {
      const filter = {}

      if (query.category) {
        filter.category = query.category
      }

      if (query.availability) {
        filter.availability = query.availability
      }

      const options = {
        page,
        limit,
        sort: { price: sort === "desc" ? -1 : 1 },
        lean: true,
      }

      const result = await this.model.paginate(filter, options)

      const totalCount = result.totalDocs
      const totalPages = result.totalPages
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null
      const prevPage = hasPrevPage ? page - 1 : null
      const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null
      const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null

      return {
        status: "success",
        payload: result.docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      };
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getProducts() {
    try {
      const result = await this.model.find()
      return { status: "success", payload: result }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getProductById(productId) {
    try {
      const result = await this.model.findById(productId)
      if (!result) {
        throw new Error("Not Found 0")
      }
      return { status: "success", payload: result }
    } catch (err) {
      throw new Error(err.message)
    }
  }

   async createProduct(product) {
    try {
      const result = await this.model.create(product)
      return { status: "success", payload: result }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async updateProduct(productId, data) {
    try {
      const result = await this.model.findByIdAndUpdate(productId, data, { new: true })
    
      if (result === null) {
        throw new Error("Not Found")
      }
    
      return { status: "success", payload: result }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await this.model.findByIdAndDelete(productId)
      if (result === null) {
        throw new Error("Not Found")
      }
     
      return { status: "success", payload: result  }
    } catch (err) {
      throw new Error(err.message)
    }

  }

}
  export default ProductManager