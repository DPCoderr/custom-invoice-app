import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type PostsRequestDto = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Route = createFileRoute("/posts")({
  component: Posts,
  // loader: ({ context }) =>
  //   context.queryClient.ensureQueryData({
  //     queryKey: ["posts"],
  //     queryFn: async (): Promise<PostsRequestDto[]> => {
  //       const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //       const data = await res.json();
  //       setTimeout(() => 10000)
  //       return data;
  //     },
  //   }),
});

function Posts() {
  const { data: posts, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<PostsRequestDto[]>  => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      return data;
    },
  });

  if (isPending) {
    return <>PLEASE WAITTTTTTT</>
  }

  if (isError) {
    return <>OOPS something went wrong</>
  }

  return (
    <>
      <h1>Hi</h1>
      { posts && posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  );
}
