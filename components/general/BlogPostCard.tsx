import Image from "next/image";
import Link from "next/link";
import { LikeButtonWrapper } from "./LikeButtonWrapper";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function BlogPostCard({ data }: IappProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={`/post/${data.id}`} className="block w-full h-full">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/post/${data.id}`}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
            {data.title}
          </h3>
        </Link>

        <Link href={`/post/${data.id}`}>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2 hover:text-gray-800 transition-colors">
            {data.content}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative size-8 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {data.authorName}
            </p>
          </div>

          <time className="text-xs text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(data.createdAt)}
          </time>
        </div>
        
        {/* Like Button */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <LikeButtonWrapper postId={data.id} initialLikes={data.likes} size="sm" />
        </div>
      </div>
    </div>
  );
}