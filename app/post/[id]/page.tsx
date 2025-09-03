import { prisma } from "../../../utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export const revalidate = 200;

async function getData(id: string) {
const data = await prisma.blogPost.findUnique({
    where: {
    id: id,
    },
});

if (!data) {
    return notFound();
}

return data;
}

type Params = Promise<{ id: string }>;

export default async function IdPage({ params }: { params: Params }) {
const { id } = await params;
const data = await getData(id);

return (
    <div className="max-w-3xl mx-auto py-8 px-4">
    <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to posts
    </Link>

    <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-center">{data.title}</h1>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
            <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
            />
            </div>
            <p className="font-medium">{data.authorName}</p>
        </div>
        <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            }).format(data.createdAt)}
        </p>
        </div>
    </div>

    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
        src={data.imageUrl}
        alt={data.title}
        fill
        className="object-cover"
        priority
        />
    </div>

    <Card className="mb-5">
        <CardContent>
        <p className="text-gray-700">{data.content}</p>
        </CardContent>
    </Card>
    <Card className="mb-5">
        <CardContent>
            <form action="">
                <Textarea name="comment" id="comment" className="w-full mb-3" />
                <div className="flex ">
                    <button 
                    className="ml-auto flex-grow-0 px-4 py-2 cursor-pointer bg-gray-200 rounded">Cancel</button>
                    <input 
                    type="submit" 
                    value="Add a comment" 
                    className="flex-grow-0 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded ml-2" />
                </div>
            </form>
        </CardContent>
    </Card>
    <Card>
        <CardContent>
            <p>UserName <span>Datetime</span></p>
            <p>content</p>
            <div className="flex items-center space-x-2 mt-2">
                <ThumbsUp className="w-5 h-5 cursor-pointer hover:fill-blue-500 hover:text-blue-500" />
                <ThumbsDown className="w-5 h-5 cursor-pointer hover:fill-red-500 hover:text-red-500" />
            </div>
        </CardContent>
    </Card>
    </div>
);
}