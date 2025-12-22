import { HASHNODE_DOMAIN, HASHNODE_API } from './config';

export interface HashnodePost {
  title: string;
  slug: string;
  brief: string;
  publishedAt: string;
  coverImage: {
    url: string;
  } | null;
  author: {
    name: string;
    profilePicture: string;
  };
  tags: {
    name: string;
  }[];
  content?: {
    html: string;
    markdown: string;
  };
}

export interface PostEdge {
  node: HashnodePost;
}

const ALL_POSTS_QUERY = `
  query GetAllPosts($host: String!, $after: String) {
    publication(host: $host) {
      title
      posts(first: 50, after: $after) {
        totalDocuments
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            title
            slug
            brief
            publishedAt
            coverImage {
              url
            }
            author {
              name
              profilePicture
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

const SINGLE_POST_QUERY = `
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        title
        slug
        brief
        publishedAt
        coverImage {
          url
        }
        author {
          name
          profilePicture
        }
        tags {
          name
        }
        content {
          html
          markdown
        }
      }
    }
  }
`;

export const getPosts = async () => {
  try {
    let allEdges: PostEdge[] = [];
    let hasNextPage = true;
    let cursor: string | null = null;

    while (hasNextPage) {
      const res: Response = await fetch(HASHNODE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ALL_POSTS_QUERY,
          variables: { host: HASHNODE_DOMAIN, after: cursor },
        }),
        // Consistently use no-store to bypass Vercel Data Cache
        cache: 'no-store',
      });

      if (!res.ok) return []; // Return empty array to avoid crashing build

      const json = await res.json();
      const postsData = json?.data?.publication?.posts;

      if (!postsData) break;

      allEdges = allEdges.concat(postsData.edges || []);
      hasNextPage = postsData.pageInfo?.hasNextPage;
      cursor = postsData.pageInfo?.endCursor || null;
    }

    return allEdges
      .filter(edge => edge?.node?.publishedAt)
      .sort((a, b) => new Date(b.node.publishedAt).getTime() - new Date(a.node.publishedAt).getTime());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
export const getPostBySlug = async (slug: string) => {
  try {
    const res: Response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SINGLE_POST_QUERY,
        variables: { host: HASHNODE_DOMAIN, slug },
      }),
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = (await res.json()) as any;
    return (json?.data?.data?.publication?.post || json?.data?.publication?.post) as HashnodePost | null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};
