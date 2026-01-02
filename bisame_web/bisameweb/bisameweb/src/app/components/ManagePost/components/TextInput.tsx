"use client";

import React, { forwardRef, ForwardedRef, MutableRefObject, Ref } from "react";
import type { JSX } from "react";
import {
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

export type TextInputProps<TFieldValues extends FieldValues = FieldValues> = {
  tag: "input" | "textarea";
  labelName?: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
  onRegister: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  styles?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function TextInputInner<TFieldValues extends FieldValues = FieldValues>(
  {
    tag,
    labelName,
    name,
    placeholder,
    type = "text",
    errorMessage,
    onRegister,
    rules,
    styles = "",
    accept,
    multiple,
    onChange,
  }: TextInputProps<TFieldValues>,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const { ref: registerRef, ...registerRest } = onRegister(name, rules);

  const handleRef = (
    element: HTMLInputElement | HTMLTextAreaElement | null
  ) => {
    // connect react-hook-form
    registerRef(element);

    // forward ref
    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      (
        ref as MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>
      ).current = element;
    }
  };

  const baseStyles = `w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    errorMessage ? "border-red-500" : "border-gray-300"
  } ${styles}`;

  const commonProps = {
    ...registerRest,
    ref: handleRef,
    placeholder,
    className: baseStyles,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      // RHF handler
      registerRest.onChange(e);
      // optional external handler
      if (onChange) {
        onChange(e);
      }
    },
  };

  return (
    <div className="w-full">
      {labelName && (
        <label className="block text-xs font-semibold mb-1 text-gray-700">
          {labelName}
        </label>
      )}

      {tag === "input" ? (
        <input
          type={type}
          accept={accept}
          multiple={multiple}
          {...commonProps}
        />
      ) : (
        <textarea rows={4} {...commonProps} />
      )}

      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

// ---- Typed forwardRef + displayName ----

type TextInputComponent = (<TFieldValues extends FieldValues = FieldValues>(
  props: TextInputProps<TFieldValues> & {
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const TextInput = forwardRef(TextInputInner) as TextInputComponent;

TextInput.displayName = "TextInput";

export default TextInput;
