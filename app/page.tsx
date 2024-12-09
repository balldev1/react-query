"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, updatePost, deletePost } from '@/hook/api';

export default function Home() {
    const queryClient = useQueryClient();

    // Fetch posts
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

    // Create post
    const mutationCreate = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    // Update post
    const mutationUpdate = useMutation({
        mutationFn: ({ id, data }) => updatePost(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] }); // รีเฟรชข้อมูล
        },
    });


    // Delete post
    const mutationDelete = useMutation({
        mutationFn: deletePost,
        onSuccess: (deletedId) => {
            queryClient.setQueryData(['posts'], (oldPosts) =>
                oldPosts.filter((post) => post.id !== deletedId)
            );
        },
    });

    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="">
            <h1>Posts</h1>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id} className="flex  gap-5">
                        <div className="bg-red-500 ">
                            {post.title}
                        </div>
                        <button
                            className="bg-yellow-500 "
                            onClick={() =>
                                mutationUpdate.mutate({ id: post.id, data: { title: 'Updated Title' } })
                            }
                        >
                            Update
                        </button>
                        <button className="bg-green-500 "
                            onClick={() => mutationDelete.mutate(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() =>
                    mutationCreate.mutate({ title: 'New Post', body: 'This is a new post.' }as any)
                }
            >
                Create Post
            </button>
        </div>
    );
}
