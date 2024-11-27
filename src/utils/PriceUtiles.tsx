// convert event.price to number from string
export const extractMoney = (priceString: string) => {
  var amount = priceString.match(/[0-9]+([,.][0-9]+)?/);
  var unit = priceString.replace(/[0-9]+([,.][0-9]+)?/, "");
  if (amount && unit) {
    return {
      amount: +amount[0].replace(",", "."),
      currency: unit,
    };
  }
  return null;
};
export default extractMoney;
