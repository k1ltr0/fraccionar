/**
 * Format a number to CLP currency
 * @param value Number to format
 */
export const formatCLP = (value: number | bigint) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
}
