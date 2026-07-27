export function calculateCoupon(
  total,
  coupon
) {
  if (!coupon) {
    return {
      discount: 0,
      total,
    };
  }

  if (
    coupon.minOrder &&
    total < coupon.minOrder
  ) {
    return {
      discount: 0,
      total,
    };
  }

  let discount = 0;

  if (coupon.type === "percent") {
    discount =
      (total * coupon.value) / 100;

    if (
      coupon.maxDiscount &&
      discount > coupon.maxDiscount
    ) {
      discount =
        coupon.maxDiscount;
    }
  } else {
    discount = coupon.value;
  }

  if (discount > total) {
    discount = total;
  }

  return {
    discount,
    total: total - discount,
  };
}