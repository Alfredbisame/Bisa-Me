"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

type ObjectProps = Record<string, string | string[] | (string | string[])[]>;

export interface OptionsProps {
  options: string[];
  triggerAttribute: string;
  optionKey?: string;
}

export interface TriggerProps {
  triggerValue: string;
  triggerAttribute: string;
}

interface ContextProps {
  error: Record<string, string>;
  handleUpdateError: (errors: Record<string, string>) => void;
  FormData: ObjectProps;
  triggerValue: TriggerProps;
  optionData: OptionsProps;
  newOptions: Record<string, string[]> | undefined;
  handleChangeOptionData: (data: OptionsProps) => void;
  handleFormData: (data: ObjectProps) => void;
  handleTriggerValue: (value: TriggerProps) => void;
  clearFormData: () => void;
  handleUpdateOptions: (data: Record<string, string[]>) => void;
  // Whether the category step is currently active; used to gate dynamic option fetching
  categoryActive: boolean;
  handleSetCategoryActive: (v: boolean) => void;
}

const Context = createContext<ContextProps | null>(null);

const FormContext = ({ children }: { children: React.ReactNode }) => {
  const [FormData, setFormData] = useState<ObjectProps>({});
  const [error, setError] = useState<Record<string, string>>({});
  const [triggerValue, setTriggerValue] = useState<TriggerProps>({
    triggerAttribute: "",
    triggerValue: "",
  });
  const [optionData, setOptionData] = useState<OptionsProps>({
    options: [],
    triggerAttribute: "",
  });
  const [newOptions, setNewOptions] = useState<Record<string, string[]>>();
  const [categoryActive, setCategoryActive] = useState<boolean>(false);

  console.log(error);

  // Memoize all callback functions to prevent recreating them on every render
  const handleUpdateError = useCallback((errors: Record<string, string>) => {
    setError(errors);
  }, []);

  const handleUpdateOptions = useCallback((data: Record<string, string[]>) => {
    setNewOptions((prev) => ({ ...prev, ...data }));
  }, []);

  const handleChangeOptionData = useCallback((data: OptionsProps) => {
    setOptionData(data);
  }, []);

  const clearFormData = useCallback(() => {
    setFormData({});
  }, []);

  const handleTriggerValue = useCallback((value: TriggerProps) => {
    setTriggerValue(value);
  }, []);

  const handleFormData = useCallback((data: ObjectProps) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSetCategoryActive = useCallback(
    (v: boolean) => setCategoryActive(v),
    []
  );

  // Load from localStorage only once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("baseFormData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, []); // Empty dependency array - only run once

  // Save to localStorage when FormData changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("baseFormData", JSON.stringify(FormData));
  }, [FormData]);

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      newOptions,
      error,
      FormData,
      triggerValue,
      optionData,
      handleUpdateError,
      handleFormData,
      handleTriggerValue,
      handleChangeOptionData,
      clearFormData,
      handleUpdateOptions,
      categoryActive,
      handleSetCategoryActive,
    }),
    [
      newOptions,
      error,
      FormData,
      triggerValue,
      optionData,
      handleUpdateError,
      handleFormData,
      handleTriggerValue,
      handleChangeOptionData,
      clearFormData,
      handleUpdateOptions,
      categoryActive,
      handleSetCategoryActive,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useFormContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Forgot to wrap context with Provider");
  return context;
};

export default FormContext;
