"use client";

import { useEffect, useState } from "react";
import { TriggerProps, useFormContext } from "../../Foods/context/FormContext";
import { ObjectProps } from "../components/SelectOptionInput";
import useFetchDynamicOptions from "./useFetchDynamicOptions";
import { MetaDataProps } from "../interfaces";

const useHandleDynamicOptions = (
  metaData: MetaDataProps,
  formData: ObjectProps,
  optionKey: string
) => {
  const [, setIsTriggered] = useState<boolean>(false);
  const {
    handleTriggerValue,
    triggerValue,
    handleChangeOptionData,
    categoryActive,
  } = useFormContext();

  // Determine dependsOn as string or array (normalize missing to empty string)
  const rawDependsOn = metaData?.dependsOn;
  const dependsOn: string | string[] = Array.isArray(rawDependsOn)
    ? rawDependsOn
    : typeof rawDependsOn === "string"
    ? rawDependsOn
    : "";

  // Prepare attributeValue in the same shape (string or string[])
  // Prefer the current trigger value for attributes that changed so we don't
  // miss updates while `formData` is still being updated asynchronously.
  const tAttr = triggerValue?.triggerAttribute;
  const tVal = triggerValue?.triggerValue;
  let attributeValue: string | string[] | undefined;
  if (Array.isArray(dependsOn) && dependsOn.length) {
    attributeValue = dependsOn.map((k) =>
      String(
        (tAttr === k && tVal !== undefined && tVal !== null
          ? tVal
          : formData[k]) ?? ""
      )
    );
  } else if (typeof dependsOn === "string" && dependsOn) {
    attributeValue =
      tAttr === dependsOn && tVal !== undefined && tVal !== null
        ? String(tVal)
        : String(formData[dependsOn] || "");
  } else {
    attributeValue = undefined;
  }

  // Fetch data when trigger updates; only active when category step is active
  // Pass the optionKey as-is so matching is not affected by casing
  useFetchDynamicOptions(
    triggerValue as TriggerProps,
    dependsOn,
    attributeValue,
    optionKey,
    handleChangeOptionData,
    // enabled only when category step is active in the form context
    Boolean(categoryActive),
    // override category / subCategory from local formData if present
    (formData as any)["category"] as string | undefined,
    (formData as any)["subCategory"] as string | undefined
  );

  const handleTrigger = (value: boolean) => setIsTriggered(value);

  useEffect(() => {
    if (!triggerValue) return;

    // If any of the dependent attributes changed, mark trigger
    if (Array.isArray(dependsOn)) {
      if (dependsOn.includes(triggerValue.triggerAttribute)) {
        setIsTriggered(true);
      }
    } else if (dependsOn === triggerValue.triggerAttribute) {
      setIsTriggered(true);
    }
  }, [triggerValue, dependsOn]);

  return { triggerValue, handleTriggerValue, handleTrigger };
};

export default useHandleDynamicOptions;
