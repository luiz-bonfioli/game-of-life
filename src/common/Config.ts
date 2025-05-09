export const getMatrixDimension = () => {
    const dimension = parseInt(import.meta.env.VITE_MATRIX_DIMENSION, 10)
    return isNaN(dimension) ? 50 : dimension;
}