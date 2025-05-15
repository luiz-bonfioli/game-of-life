export const getMatrixDimension = () => {
    // The variable import.meta.env.VITE_MATRIX_DIMENSION will be loaded from .env.[development, production or staging]
    const dimension = parseInt(import.meta.env.VITE_MATRIX_DIMENSION, 10)
    return isNaN(dimension) ? 50 : dimension;
}