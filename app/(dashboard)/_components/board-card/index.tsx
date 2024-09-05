import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Actions } from "../../../../components/actions";
import { MoreHorizontal } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { toast } from "sonner";
interface BoardCardProps {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}
export const BoardCard = ({
  id,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  isFavorite,
  orgId,
  title,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );
  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions title={title} id={id} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100   outline-none px-3 py-2 transition-opacity">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          createdAtLabel={createdAtLabel}
          authorLabel={authorLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127]  rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
