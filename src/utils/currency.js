export const formatCurrency = (amount, currencySetting) => {
  // Extract numeric value from string like "$123.45"
  const numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) 
    : amount;

  if (isNaN(numericAmount)) return amount;

  const currencyMap = {
    'USD ($)': { symbol: '$', position: 'before', rate: 1 },
    'EUR (€)': { symbol: '€', position: 'after', rate: 0.92 },
    'GBP (£)': { symbol: '£', position: 'before', rate: 0.79 },
    'JPY (¥)': { symbol: '¥', position: 'before', rate: 149.50 }
  };

  const config = currencyMap[currencySetting] || currencyMap['USD ($)'];
  const convertedAmount = numericAmount * config.rate;
  const formatted = config.symbol === '¥' 
    ? Math.round(convertedAmount).toString() 
    : convertedAmount.toFixed(2);

  return config.position === 'before' 
    ? `${config.symbol}${formatted}` 
    : `${formatted}${config.symbol}`;
};
