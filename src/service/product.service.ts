import { httpService } from "./https.service";

const productEntPoint = "products";

const productService = {
  findAll: async () => {
    const { data } = await httpService.get(productEntPoint);
    return data;
  },

  findAllPaginated: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const { data } = await httpService.get(
      `${productEntPoint}?limit=${limit}&skip=${skip}`
    );
    return data;
  }
};

export default productService;
