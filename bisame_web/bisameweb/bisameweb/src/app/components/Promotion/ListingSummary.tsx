"use client";
import React, { useState } from "react";
import { usePromoContext } from "./context/PromotionContext";
import { PaymentMethod } from "./interfaces";
import SummaryModal from "./SummaryModal";
import PaymentFormModal from "./PaymentFormModal";
import PaymentInitiatedModal from "./PaymentInitiatedModal";
import useFetchPromotions from "./hooks/use-fetch-promotions";
import usePayment from "./hooks/use-payment";
import usePaymentStatus from "./hooks/use-payment-status";
import { useRouter } from "next/navigation";
import { TransactionStatus } from "./types";
import toast from "react-hot-toast";
// import PaymentSuccessModal from "./payment-modals/PaymentSuccessModal";

interface ListingSummaryProps {
  handleChangeModalStatus: () => void;
}

export type PaymentStep = "summary" | "payment" | "initiated" | "success";

const ListingSummary: React.FC<ListingSummaryProps> = ({
  handleChangeModalStatus,
}) => {
  const {
    selectedProduct,
    promotionSelected,
    promoPlan,
    selectedPromotion,
    sectionItems,
  } = usePromoContext();

  // router
  const router = useRouter();

  // state to track modal step
  const [currentStep, setCurrentStep] = useState<PaymentStep>("summary");

  // state to store payment provider
  const [selectedProvider, setSelectedProvider] = useState("");

  // state to store phone number
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { promoData } = useFetchPromotions();
  console.log(promoData);
  const selectedPromoId = promoData?.results.find(
    ({ promotionPlanId }) => promoPlan?.id === promotionPlanId
  )?.id;

  const {
    initiatePayment,
    paymentResponse,
    isMutating: isLoadingInitialize,
  } = usePayment();

  const { paymentStatus, isLoadingStatus, refresh } = usePaymentStatus(
    paymentResponse?.data?.id as string
  );

  console.log(paymentStatus);
  console.log(paymentStatus);
  console.log(paymentStatus);

  const handleProceedToPayment = async () => {
    try {
      // const result = await trigger();
      console.log({
        promotionId: selectedPromoId as string,
        paymentMethod: PaymentMethod.MobileMoney,
        provider: selectedProvider,
        bankCode: null,
        accountNumber: `+233${phoneNumber}`,
      });
      await initiatePayment({
        promotionId: selectedPromoId as string,
        paymentMethod: PaymentMethod.MobileMoney,
        provider: selectedProvider,
        bankCode: null,
        accountNumber: `+233${phoneNumber}`,
      });
      setCurrentStep("initiated");
    } catch (error) {
      console.error("Payment initialization failed:", error);
    }
  };

  const noPromoProduct = selectedProduct.filter(
    (promo) => !promotionSelected.includes(promo.itemName)
  );

  const extractNoPromoProductId: string[] = noPromoProduct.reduce<string[]>(
    (acc, current) => [...acc, current.id],
    []
  );

  const extractNoPromoProduct: string[] = noPromoProduct.reduce<string[]>(
    (acc, current) => [...acc, current.itemName],
    []
  );

  const postData = {
    pricingOption: {
      label: selectedPromotion?.label,
      value: selectedPromotion?.value,
      discountedPrice: selectedPromotion?.discount,
      price: selectedPromotion?.price,
    },
    sectionItems,
    promotionPlanId: promoPlan?.id,
    otherPromotedItems: extractNoPromoProductId,
  };

  const handleNext = () => {
    setCurrentStep("payment");
  };

  const handleCheckStatus = async () => {
    setIsCheckingStatus(true);

    // Trigger an api fetch to get the status of the payment
    try {
      await refresh();
      if (paymentStatus.status == TransactionStatus.Successful) {
        toast.success("Payment successful");
        router.push("/dashboard/purchases");
      } else if(paymentStatus.status == TransactionStatus.Processing){
        toast.success("Processing...");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error occurred getting status" + error.message);
      }
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleClose = () => {
    handleChangeModalStatus();
  };

  const handleFinalClose = () => {
    setCurrentStep("summary");
    setSelectedProvider("");
    setPhoneNumber("");
    handleChangeModalStatus();
  };

  // Render appropriate modal based on current step
  switch (currentStep) {
    case "summary":
      return (
        <SummaryModal
          selectedProduct={selectedProduct}
          promotionSelected={promotionSelected}
          extractNoPromoProduct={extractNoPromoProduct}
          onNext={handleNext}
          onClose={handleClose}
        />
      );

    case "payment":
      return (
        <PaymentFormModal
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isLoadingInitialize={isLoadingInitialize}
          onClose={handleClose}
          onProceed={handleProceedToPayment}
        />
      );

    case "initiated":
      return (
        <PaymentInitiatedModal
          isCheckingStatus={isLoadingStatus}
          onCheckStatus={handleCheckStatus}
          onClose={handleClose}
        />
      );

    default:
      return null;
  }
};

export default ListingSummary;
