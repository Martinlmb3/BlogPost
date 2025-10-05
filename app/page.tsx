import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "../utils/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      likes: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export default function Home() {
  return (
    <>
      <section className="text-center mb-16 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20 rounded-2xl">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-60 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-300 rounded-3xl opacity-60 blur-2xl transform rotate-45"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Share Your Stories with the World
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful blog posts with ease. BlogPost provides a simple and intuitive platform to bring your ideas to life with a title, an image, and a description.
          </p>
          <div className="mt-10">
            <a className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 inline-flex items-center" href="/create">
              Create a Post Now
              <span className="material-icons ml-2">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <div className="py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-foreground">Latest posts</h1>

        <Suspense fallback={<BlogPostsGrid />}>
          <BlogPosts />
        </Suspense>
      </div>
    </>
  );
}

async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}

// Blog posts grid with loading state
function BlogPostsGrid() {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}