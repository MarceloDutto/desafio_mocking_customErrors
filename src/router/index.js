import { Router } from "express";
import { generateProducts } from "../utils/faker.utils.js";
import ProductManager from "../products/manager.products.js";
import CustomError from "../errors/CustomError.js";
import { generateProductErrorInfo, generateProductExistsInfo } from "../errors/info.errors.js";
import EnumErrors from "../errors/EnumErrors.js";
const pm = new ProductManager();

const router = Router();

router.get('/products', (req, res) => {
    const response = pm.getProducts();
    res.json(response);
});

router.post('/products', (req, res) => {
    const { name, description, category, code, price, thumbnail=[], stock } = req.body;
    if(!name || !description || !category || !code || !price || !stock) {
        CustomError.createError({
            name: "Error en la creación del producto",
            cause: generateProductErrorInfo({name, description, category, code, price, stock}),
            message: 'Debe ingresar los campos requeridos.',
            code: EnumErrors.INVALID_TYPES_ERROR
        });
    };

    const products = pm.getProducts();
    if(products.payload.find(prod => prod.code === code)) {
        CustomError.createError({
            name: "Error en la creación del producto",
            cause: generateProductExistsInfo({code}),
            message: 'Un producto con el mismo código ya existe en la base de datos.',
            code: EnumErrors.INVALID_TYPES_ERROR
        });
    };

    const newProductInfo = {
        name,
        description,
        category,
        code,
        price, 
        thumbnail,
        stock
    };

    const response = pm.addProduct(newProductInfo);
    res.json(response);
});


// REALIZAR UN MOCKING DE PRODUCTOS CON FAKER-JS

router.get('/mockingproducts', async (req, res) => {
    try {
        const mockedProducts = await generateProducts(100);

        res.json({status: 'success', message: 'Productos generados', payload: mockedProducts});
    } catch(error) {
        CustomError.createError({
            name: "Error interno del servidor",
            cause: "Error interno del servidor",
            message: "Error al conectar con el servidor",
            code: EnumErrors.SERVER_ERROR
        })
    }
});

export default router;