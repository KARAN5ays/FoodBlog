import axios from 'axios';
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
      const res: any = await axios.post(
        HASHNODE_API,
        {
          query: ALL_POSTS_QUERY,
          variables: { host: HASHNODE_DOMAIN, after: cursor }
        }
      );

      const postsData: any = res?.data?.data?.publication?.posts;
      if (!postsData) break;

      const fetchedEdges = postsData.edges || [];
      allEdges = allEdges.concat(fetchedEdges);

      hasNextPage = postsData.pageInfo?.hasNextPage;
      cursor = postsData.pageInfo?.endCursor || null;

      if (!hasNextPage) break;
    }

    return allEdges
      .filter(edge => edge && edge.node && edge.node.publishedAt)
      .sort(
        (a, b) =>
          new Date(b.node.publishedAt).getTime() -
          new Date(a.node.publishedAt).getTime()
      );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const res = await axios.post(
      HASHNODE_API,
      {
        query: SINGLE_POST_QUERY,
        variables: { host: HASHNODE_DOMAIN, slug }
      }
    );
    return res?.data?.data?.publication?.post as HashnodePost | null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};
