
export function calculatePPU(price, units) {
    let result = (parseFloat(price) / parseFloat(units)).toFixed(2);
    return isNaN(result) ? 0 : result;
}