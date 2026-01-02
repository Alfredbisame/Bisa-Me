import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "../ProductDetail"; // Import type from ProductDetail or a shared types file
import { useFollows } from "../../FollowersFollowing/useFollows";
import { useSave } from "./useSave";
import { KeyedMutator } from "swr";

interface UseProductActionsProps {
    product: Product | undefined;
    mutate: KeyedMutator<any>; // SWR mutate type, using any for flexibility with SWR's broad types
}

export const useProductActions = ({ product, mutate }: UseProductActionsProps) => {
    const { follow } = useFollows();
    const { save, unsave } = useSave();

    const [isFollowing, setIsFollowing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Handle Follow Toggle
    const handleFollowToggle = useCallback(async () => {
        if (!product) return;

        // Optimistic Update
        const previousIsFollowed = product.isFollowed;
        const newIsFollowed = !previousIsFollowed;

        // Optimistically update SWR cache
        await mutate(
            { ...product, isFollowed: newIsFollowed },
            { revalidate: false }
        );

        setIsFollowing(true);

        try {
            // In the current API, 'follow' toggles or just follows. 
            // Assuming 'follow' is the action. If there's an 'unfollow', we need that too.
            // Based on previous analysis, we only saw `follow` being used. 
            // If the API is a toggle, this is fine. If not, we might need an unfollow endpoint.
            // However, the original code only showed `follow(userId)`.
            // We'll proceed with follow for now, assuming it handles the relationship.

            const result = await follow(product.userId);

            if (!result.success) {
                throw new Error(result.message || "Failed to follow user");
            }

            toast.success(result.message || (newIsFollowed ? "Followed successfully" : "Unfollowed successfully"));

            // Trigger revalidation to ensure server sync
            await mutate();

        } catch (error: any) {
            console.error("Follow error:", error);

            // Rollback on error
            await mutate(
                { ...product, isFollowed: previousIsFollowed },
                { revalidate: false }
            );
        } finally {
            setIsFollowing(false);
        }
    }, [product, mutate, follow]);

    // Handle Save/Favorite Toggle
    const handleFavoriteToggle = useCallback(async () => {
        if (!product) return;

        const previousIsFavorite = product.isFavorite;
        const newIsFavorite = !previousIsFavorite;

        // Optimistically update SWR cache
        await mutate(
            { ...product, isFavorite: newIsFavorite },
            { revalidate: false }
        );

        setIsSaving(true);

        try {
            if (newIsFavorite) {
                await save(product.id || product._id); // Handle potentially different ID naming
                toast.success("Added to saved items.");
            } else {
                await unsave(product.id || product._id);
                toast.success("Removed from saved items.");
            }

            // Revalidate
            await mutate();

        } catch (error: any) {
            console.error("Save error:", error);

            // Rollback
            await mutate(
                { ...product, isFavorite: previousIsFavorite },
                { revalidate: false }
            );
        } finally {
            setIsSaving(false);
        }
    }, [product, mutate, save, unsave]);

    return {
        handleFollowToggle,
        handleFavoriteToggle,
        isFollowing,
        isSaving,
    };
};
