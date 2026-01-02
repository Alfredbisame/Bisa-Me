import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { OptionsProps, TriggerProps } from "../../Foods/context/FormContext";
import { httpClient, buildListingsUrl, CATEGORY_ENDPOINTS } from "@/lib";

const useFetchDynamicOptions = (
  trigger: TriggerProps,
  attributeKey: string | string[],
  attributeValue: string | string[] | undefined,
  optionKey: string,
  handleChangeOptionData: (data: OptionsProps) => void,
  enabled = true,
  categoryOverride?: string,
  subCategoryOverride?: string
) => {
  const searchParams = useSearchParams();
  const group = "Buy and Sell";
  // Use overrides if provided (so the unified form can pass values), otherwise fall back to URL searchParams
  const urlCategory = searchParams.get("category") as string;
  const urlSubCategory = searchParams.get("subCategory") as string;
  const category = categoryOverride || urlCategory;
  const subCategory = subCategoryOverride || urlSubCategory;
  const [data, setData] = useState<string[]>([]);

  // Use ref to track the last fetch params to prevent duplicate requests
  const lastFetchRef = useRef<string>("");

  useEffect(() => {
    const fetcher = async () => {
      try {
        const merged = new Set<string>();

        // Shared in-memory cache across hook instances
        const globalCache: Map<string, string[]> =
          (globalThis as any).__dynamicOptionCache || new Map();
        if (!(globalThis as any).__dynamicOptionCache)
          (globalThis as any).__dynamicOptionCache = globalCache;

        // normalize to arrays for consistent handling
        const keys = Array.isArray(attributeKey)
          ? attributeKey
          : [attributeKey];
        const values = Array.isArray(attributeValue)
          ? attributeValue
          : [attributeValue || ""];

        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const v = values[i] || values[0] || ""; // fallback to first value if present

          // skip if no attribute value
          if (!v) continue;

          // Create a unique key for this fetch request
          const fetchKey = `${category}-${subCategory}-${k}-${v}-${optionKey}`;

          // Use cache if available
          if (globalCache.has(fetchKey)) {
            const cached = globalCache.get(fetchKey) || [];
            cached.forEach((opt) => merged.add(opt));
            continue;
          }

          // Skip if we already fetched with these exact params in this instance
          if (fetchKey === lastFetchRef.current) {
            continue;
          }

          const baseUrl = buildListingsUrl(CATEGORY_ENDPOINTS.dropdownOptions);
          const params = new URLSearchParams({
            category,
            subCategory,
            attributeKey: k,
            attributeValue: v,
            optionKey,
            group,
          });
          const apiUrl = `${baseUrl}?${params.toString()}`;

          const response = await httpClient.get<{
            data?: unknown[];
            message?: string;
            code?: number;
          }>(apiUrl);

          // Handle different response structures
          let newData: string[] = [];
          if (Array.isArray(response)) {
            newData = response.filter(
              (item): item is string => typeof item === "string"
            );
          } else if (Array.isArray(response.data)) {
            newData = response.data.filter(
              (item): item is string => typeof item === "string"
            );
          } else if (
            response &&
            typeof response === "object" &&
            "data" in response &&
            Array.isArray((response as any).data?.data)
          ) {
            const nestedData = (response as any).data.data;
            newData = Array.isArray(nestedData)
              ? nestedData.filter(
                  (item): item is string => typeof item === "string"
                )
              : [];
          }

          // cache the result
          globalCache.set(fetchKey, newData);

          newData.forEach((opt) => merged.add(opt));

          const message =
            typeof response === "object" &&
            response !== null &&
            "message" in response &&
            typeof response.message === "string"
              ? response.message
              : "Options updated";
          // toast.success(message);

          // Update the last fetch ref
          lastFetchRef.current = fetchKey;
        }

        // If there are multiple keys/values, attempt a combined fetch as well
        if (keys.length > 1 && values.every(Boolean)) {
          try {
            const combinedKey = keys.join("|");
            const combinedValue = values.join("|");
            const combinedFetchKey = `${category}-${subCategory}-${combinedKey}-${combinedValue}-${optionKey}`;

            if (
              !globalCache.has(combinedFetchKey) &&
              combinedFetchKey !== lastFetchRef.current
            ) {
              const baseUrl = buildListingsUrl(
                CATEGORY_ENDPOINTS.dropdownOptions
              );
              const params = new URLSearchParams({
                category,
                subCategory,
                attributeKey: keys.join(","),
                attributeValue: values.join(","),
                optionKey,
                group,
              });
              const apiUrl = `${baseUrl}?${params.toString()}`;

              const response = await httpClient.get<{
                data?: unknown[];
                message?: string;
                code?: number;
              }>(apiUrl);

              let combinedData: string[] = [];
              if (Array.isArray(response)) {
                combinedData = response.filter(
                  (item): item is string => typeof item === "string"
                );
              } else if (Array.isArray(response.data)) {
                combinedData = response.data.filter(
                  (item): item is string => typeof item === "string"
                );
              } else if (
                response &&
                typeof response === "object" &&
                "data" in response &&
                Array.isArray((response as any).data?.data)
              ) {
                const nestedData = (response as any).data.data;
                combinedData = Array.isArray(nestedData)
                  ? nestedData.filter(
                      (item): item is string => typeof item === "string"
                    )
                  : [];
              }

              globalCache.set(combinedFetchKey, combinedData);
              combinedData.forEach((opt) => merged.add(opt));
              lastFetchRef.current = combinedFetchKey;
            } else if (globalCache.has(combinedFetchKey)) {
              (globalCache.get(combinedFetchKey) || []).forEach((opt) =>
                merged.add(opt)
              );
            }
          } catch (err) {
            // Non-fatal: log and continue with per-key results
            console.debug(
              "Combined dynamic fetch not available or failed",
              err
            );
          }
        }

        const mergedArray = Array.from(merged);
        setData(mergedArray);

        // Use the trigger attribute if available to indicate what caused the update.
        handleChangeOptionData({
          options: mergedArray,
          triggerAttribute:
            trigger.triggerAttribute ||
            (Array.isArray(attributeKey)
              ? attributeKey[0]
              : String(attributeKey)),
          optionKey: optionKey,
        });
      } catch (error: any) {
        console.error("Dynamic fetch failed:", error);
        const errorMessage = error?.message || "Failed to fetch options";
        toast.error(
          typeof errorMessage === "string"
            ? errorMessage
            : "Failed to fetch options"
        );
      }
    };

    // Start fetch when trigger is set and there is at least one attribute value, category and subCategory
    const hasAttributeValue = Array.isArray(attributeValue)
      ? attributeValue.some((v) => Boolean(v)) // for multidependencies allow fetch when at least one value present
      : Boolean(attributeValue);

    if (!enabled) return; // gate fetching if not active

    // If we have all required context (option key, category, subCategory and attribute values)
    // then fetch. This allows initial fetch when the dependent attribute values are already present
    // (e.g., prefilled form) as well as re-fetching when attributeValue changes.
    if (optionKey && category && subCategory && hasAttributeValue) {
      fetcher();
    }
  }, [
    trigger.triggerValue,
    attributeKey,
    attributeValue,
    optionKey,
    category,
    subCategory,
    enabled,
    // handleChangeOptionData is now stable from context, but keep it in deps
    handleChangeOptionData,
  ]);

  return { data };
};

export default useFetchDynamicOptions;
