export const generateProductErrorInfo = (product) => {
    return `
        One or more properties were incomplete or not valid.
        List of required properties:
        * name : needs to be a String, received ${product.name}
        * description : needs to be a String, received ${product.description}
        * category : needs to be a String, received ${product.category}
        * code : needs to be a String, received ${product.code}
        * price : needs to be a Number, received ${product.price}
        * stock: needs to be a Number, received ${product.stock}
    `
};

export const generateProductExistsInfo = (product) => {
    return `
    A product with this code already exists in the database.
    * code: received ${product.code}
    `
};