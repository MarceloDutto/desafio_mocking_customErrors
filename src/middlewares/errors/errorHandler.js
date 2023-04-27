import EnumErrors from "../../errors/EnumErrors.js";

export default (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case EnumErrors.INVALID_TYPES_ERROR:
            res.status(400).json({status: 'error', error: error.name});
            break;
        
        case EnumErrors.SERVER_ERROR:
            res.status(500).json({status: 'error', error: error.name});
            break;
        default:
            res.status(501).json({status: 'error', error: 'Unhandled error'});
            break;
    };
};