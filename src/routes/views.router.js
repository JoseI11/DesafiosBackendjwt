import ProductManager from '../dao/dbManagers/productdbManager.js';
import CartdbManager from '../dao/dbManagers/cartdbManager.js';
import { Router } from "express";
// import { checkLogged,checkLogin } from '../../middlewares/auth.js';

const router = Router();
const productmanager = new ProductManager();
const cartdbManager = new CartdbManager();
router.get("/products", async (req, res) => {
  const { limit = 2, page = 1, category, usable, sort } = req.query;

  const {
    docs: products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await productmanager.getProducts(page, limit, category, usable, sort);
  res.render("products", {
  
    user:req.user,
    products,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,

  });
})

router.get("/product/:pid",async (req, res) => {
  const { pid } = req.params;
  const product = await productmanager.getProductsbyId(pid);
  res.render("product", {
    product,

  });
});
router.get("/cart/:cid",async (req, res) => {
  const { cid } = req.params;
  const cart = await cartdbManager.getCartsbyId(cid);
  res.render("cart", {
    cart,
  });
});


router.get("/" ,(req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/products", (req, res) => {
  res.render("products", { user: req.user});
});
export default router;