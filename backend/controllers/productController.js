exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Questa rotta mostrerà tutti i prodotti all'interno del database"
    })
}