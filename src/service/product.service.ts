import { httpService } from "./https.service";

const productEntPoint = "products";

const productService = {
  findAll: async () => {
    const { data } = await httpService.get(productEntPoint);
    return data;
  }
};

export default productService;
