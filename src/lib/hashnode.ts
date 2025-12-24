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
  reactions?: {
    total: number;
  };
  readTimeInMinutes?: number;
}

export interface HashnodePublication {
  id: string;
  title: string;
  displayTitle?: string;
  descriptionSEO?: string;
  totalDocuments?: number;
  preferences?: {
    logo?: string;
    navbarItems?: Array<{
      type: string;
      label?: string;
      series?: {
        slug: string;
        name?: string;
      };
      page?: {
        slug: string;
        title?: string;
      };
      url?: string;
    }>;
  };
  links?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    website?: string;
  };
  url?: string;
  favicon?: string;
  author?: {
    name: string;
    profilePicture?: string;
    username?: string;
    bio?: {
      markdown?: string;
      html?: string;
    }
  };
}

export interface PostEdge {
  node: HashnodePost;
}

const ALL_POSTS_QUERY = `
  query GetAllPosts($host: String!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: 50, after: $after) {
        totalDocuments
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            slug
            brief
            publishedAt
            coverImage {
              url
            }
            author {
              id
              name
              profilePicture
            }
            tags {
              id
              name
            }
            readTimeInMinutes
          }
        }
      }
    }
  }
`;

const SINGLE_POST_QUERY = `
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      id
      post(slug: $slug) {
        id
        title
        slug
        brief
        publishedAt
        coverImage {
          url
        }
        author {
          id
          name
          profilePicture
        }
        tags {
          id
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
          variables: {
            host: HASHNODE_DOMAIN,
            after: cursor,
          },
        }),
        // Use ISR with 60 seconds revalidation (faster updates)
        next: { revalidate: 60 },
      });

      if (!res.ok) return []; // Return empty array to avoid crashing build

      const json = await res.json();
      const postsData = json?.data?.publication?.posts;

      if (!postsData) break;

      allEdges = allEdges.concat(postsData.edges || []);
      hasNextPage = postsData.pageInfo?.hasNextPage;
      cursor = postsData.pageInfo?.endCursor || null;
    }

    const posts = allEdges
      .filter(edge => edge?.node?.publishedAt)
      .sort((a, b) => new Date(b.node.publishedAt).getTime() - new Date(a.node.publishedAt).getTime());

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPublication = async (): Promise<HashnodePublication | null> => {
  try {
    const PUBLICATION_QUERY = `
      query GetPublication($host: String!) {
        publication(host: $host) {
          id
          title
          displayTitle
          descriptionSEO
          totalDocuments
          preferences {
            logo
            navbarItems {
              type
              label
              url
              series {
                slug
                name
              }
              page {
                slug
                title
              }
            }
          }
          links {
            twitter
            github
            linkedin
            youtube
            instagram
            website
          }
          url
          favicon
          author {
            name
            profilePicture
            username
            bio {
              markdown
              html
            }
          }
        }
      }
    `;

    const res: Response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PUBLICATION_QUERY,
        variables: { host: HASHNODE_DOMAIN },
      }),
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data?.publication as HashnodePublication | null;
  } catch (error) {
    console.error("Error fetching publication:", error);
    return null;
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
