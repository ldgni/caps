"use client";

import {
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  TruckIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/app/cart-context";
import { formatPrice, generateOrderId } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping",
  );
  const [orderId, setOrderId] = useState("");

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Format card number with spaces after every 4 digits
      const cleaned = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
      setPaymentInfo((prev) => ({
        ...prev,
        [name]: formatted.substring(0, 19),
      }));
    } else if (name === "expiryDate") {
      // Format expiry date as MM/YY
      const cleaned = value.replace(/[^0-9]/gi, "");
      if (cleaned.length <= 2) {
        setPaymentInfo((prev) => ({ ...prev, [name]: cleaned }));
      } else {
        const month = cleaned.substring(0, 2);
        const year = cleaned.substring(2, 4);
        setPaymentInfo((prev) => ({ ...prev, [name]: `${month}/${year}` }));
      }
    } else if (name === "cvv") {
      // Limit CVV to 3 or 4 digits
      const cleaned = value.replace(/[^0-9]/gi, "").substring(0, 4);
      setPaymentInfo((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleShippingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("confirmation");
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handlePlaceOrder = () => {
    // Clear cart and redirect to home
    clearCart();
    toast.success("Order placed successfully!", {
      description: `Order #${orderId} has been confirmed. Thank you for shopping with us!`,
    });
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto min-h-[60vh] border-[#2e160e] px-6 py-16 sm:border-x-2">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
          <p className="mb-8 text-gray-700">
            Add some products to your cart before checking out.
          </p>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#2e160e] px-6 py-3 font-bold text-white shadow-[0_4px_0_0_#000000,inset_0_3px_0_0_#3d1c11] transition-all hover:bg-[#3d1c11] active:translate-y-1 active:shadow-none">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto border-[#2e160e] sm:border-x-2">
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
          <div className="flex items-center space-x-2">
            {["shipping", "payment", "confirmation"].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2e160e] ${
                    step === stepName
                      ? "bg-[#2e160e] text-white"
                      : index <
                          ["shipping", "payment", "confirmation"].indexOf(step)
                        ? "bg-[#ebd5bf]"
                        : "bg-white"
                  }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 w-8 ${index < ["shipping", "payment"].indexOf(step) ? "bg-[#2e160e]" : "bg-gray-300"}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - Form */}
          <div className="space-y-6 lg:w-2/3">
            {step === "shipping" && (
              <div className="rounded-lg border-2 border-[#2e160e] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="text-[#2e160e]" />
                  <h2 className="text-xl font-bold">Shipping Information</h2>
                </div>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="block font-medium text-[#2e160e]">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className="block font-medium text-[#2e160e]">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block font-medium text-[#2e160e]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      required
                      className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className="block font-medium text-[#2e160e]">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      required
                      className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label
                        htmlFor="city"
                        className="block font-medium text-[#2e160e]">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="postalCode"
                        className="block font-medium text-[#2e160e]">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="country"
                        className="block font-medium text-[#2e160e]">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#ffc808] px-6 py-3 font-bold text-[#2e160e] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFD337,inset_0_-3px_0_0_#CFA205] transition-all active:translate-y-1 active:shadow-none">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="rounded-lg border-2 border-[#2e160e] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="text-[#2e160e]" />
                  <h2 className="text-xl font-bold">Payment Information</h2>
                </div>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="cardName"
                      className="block font-medium text-[#2e160e]">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      required
                      className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="cardNumber"
                      className="block font-medium text-[#2e160e]">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="expiryDate"
                        className="block font-medium text-[#2e160e]">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="cvv"
                        className="block font-medium text-[#2e160e]">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        required
                        className="w-full rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-4 py-2 outline-none"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="cursor-pointer rounded-lg border-2 border-[#2e160e] bg-white px-6 py-3 font-bold text-[#2e160e] transition-colors hover:bg-gray-100">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#ffc808] px-6 py-3 font-bold text-[#2e160e] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFD337,inset_0_-3px_0_0_#CFA205] transition-all active:translate-y-1 active:shadow-none disabled:opacity-70">
                      {isSubmitting ? "Processing..." : "Complete Order"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "confirmation" && (
              <div className="rounded-lg border-2 border-[#2e160e] p-6">
                <div className="flex flex-col items-center space-y-4 py-8 text-center">
                  <CheckCircle size={64} className="text-green-600" />
                  <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                  <p className="text-gray-700">
                    Thank you for your order. We have received your payment and
                    will process your order shortly.
                  </p>
                  <div className="my-4 w-full max-w-md rounded-lg border-2 border-[#2e160e] bg-[#f9f2eb] p-4">
                    <p className="font-medium">Order Details:</p>
                    <p className="text-sm text-gray-700">Order #: {orderId}</p>
                    <p className="text-sm text-gray-700">
                      Date: {new Date().toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm text-gray-700">
                      Email: {shippingInfo.email}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      Total: {formatPrice(total)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TruckIcon size={20} />
                    <p>Your order will be shipped within 24-48 hours</p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="mt-4 cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#2e160e] px-6 py-3 font-bold text-white shadow-[0_4px_0_0_#000000,inset_0_3px_0_0_#3d1c11] transition-all hover:bg-[#3d1c11] active:translate-y-1 active:shadow-none">
                    Return to Shop
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 rounded-lg border-2 border-[#2e160e] p-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="text-[#2e160e]" />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>

              <div className="border-t-2 border-dotted border-[#2e160e] pt-4">
                <div className="max-h-60 space-y-4 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t-2 border-dotted border-[#2e160e] pt-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium">{formatPrice(subtotal)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium">{formatPrice(shipping)}</p>
                  </div>
                  <div className="flex justify-between border-t-2 border-dotted border-[#2e160e] pt-2">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">{formatPrice(total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
