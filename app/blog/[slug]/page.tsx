'use client'
import React, { useEffect, useState } from 'react'
import { getBlog } from '@/app/lib/actions'

type Props = {}
type BlogData = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    date: Date;
    authorId: string;
} | null;

export default function Page({ params }: { params: { slug: string } }) {
    
    const [blog, setBlog] = useState<BlogData>();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: BlogData = await getBlog(params.slug)
            setBlog(data);
        }
        fetchData();
    }, [])

    const handleAddComment = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            // do db call and add comment in db
            setComment('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 border rounded-md">
            <h1 className="text-3xl font-bold mb-4 pb-2 border-b">{blog?.title}</h1>
            <div className="text-lg text-gray-700 mb-6" style={{ overflowWrap: 'break-word' }}>{blog?.content}</div>
            <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <textarea
                    className="w-full border rounded-md p-2 mb-4"
                    rows={4}
                    placeholder="Add your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={handleAddComment}
                >
                    Add Comment
                </button>
                <div className="mt-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="border rounded-md p-2 mb-2">
                            {comment}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
