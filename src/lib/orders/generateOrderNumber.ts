/** Multibanco orderId max length is 25 characters. */
export function generateOrderNumber(): string {
  const timePart = Date.now().toString(36).slice(-10);
  const randomPart = Math.random().toString(36).slice(2, 6);
  return `MC${timePart}${randomPart}`.slice(0, 25);
}
