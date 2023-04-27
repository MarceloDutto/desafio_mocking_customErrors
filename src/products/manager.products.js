class ProductManager {
    constructor() {
        this.products = []
    };

    getProducts = () => {
        if(this.products.length === 0) return {status: 'success', message: 'No hay productos', payload: this.products};

        return {status: 'success', message: 'Productos encontrados', payload: this.products};
    };

    addProduct = (productInfo) => {
        this.products.push(productInfo);
        return {status: 'success', message: 'Producto ingresado', payload: productInfo};
    }
}

export default ProductManager;