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

export interface HashnodeSeries {
  id: string;
  name: string;
  slug: string;
  description?: {
    markdown?: string;
    html?: string;
  };
  coverImage?: string;
  posts?: {
    edges: PostEdge[];
  };
}


export interface PostEdge {
  node: HashnodePost;
}

const ALL_POSTS_QUERY = `
  query GetAllPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after) {
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
        subtitle
        slug
        brief
        publishedAt
        updatedAt
        coverImage {
          url
        }
        author {
          id
          name
          username
          profilePicture
        }
        tags {
          id
          name
          slug
        }
        content {
          html
          markdown
        }
        readTimeInMinutes
      }
    }
  }
`;

export const getPosts = async (first: number = 10, after?: string): Promise<{ edges: PostEdge[], pageInfo: any, totalDocuments: number }> => {
  try {
    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: ALL_POSTS_QUERY,
        variables: {
          host: HASHNODE_DOMAIN,
          first: first,
          after: after
        }
      }),
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return { edges: [], pageInfo: {}, totalDocuments: 0 };
    }

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL errors in getPosts:', {
        errors: json.errors.map((err: any) => ({
          message: err.message,
          path: err.path,
        })),
        query: 'POSTS_QUERY'
      });
      return { edges: [], pageInfo: {}, totalDocuments: 0 };
    }

    const postsData = json?.data?.publication?.posts;
    const edges: PostEdge[] = postsData?.edges || [];
    const pageInfo = postsData?.pageInfo || {};
    const totalDocuments = postsData?.totalDocuments || 0;

    const sortedEdges = edges
      .filter(edge => edge?.node?.publishedAt)
      .sort((a, b) => new Date(b.node.publishedAt).getTime() - new Date(a.node.publishedAt).getTime());

    return { edges: sortedEdges, pageInfo, totalDocuments };

  } catch (error) {
    console.error("Error fetching posts:", error);
    return { edges: [], pageInfo: {}, totalDocuments: 0 };
  }
};

export const getPublication = async (): Promise<HashnodePublication | null> => {
  try {
    console.log(`[Hashnode] Fetching publication for host: ${HASHNODE_DOMAIN}`);
    const PUBLICATION_QUERY = `
      query GetPublication($host: String!) {
        publication(host: $host) {
          id
          title
          displayTitle
          descriptionSEO
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
              html
            }
          }
        }
      }
    `;

    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: PUBLICATION_QUERY,
        variables: { host: HASHNODE_DOMAIN },
      }),
      next: { revalidate: 0 }, // Disable cache for dev
    });

    if (!res.ok) {
      console.error(`[Hashnode] API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL errors in getPublication:', {
        errors: json.errors.map((err: any) => ({
          message: err.message,
          path: err.path,
          extensions: err.extensions
        })),
        query: 'PUBLICATION_QUERY'
      });
      return null;
    }

    return json?.data?.publication as HashnodePublication | null;
  } catch (error) {
    console.error("[Hashnode] Exception fetching publication:", error);
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
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data?.publication?.post || null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};

export const getSeries = async (slug: string): Promise<HashnodeSeries | null> => {
  // Validate input
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    console.error('Invalid slug provided to getSeries:', { slug, type: typeof slug });
    return null;
  }

  const cleanSlug = slug.trim();
  console.log('Fetching series with slug:', cleanSlug);

  try {
    const SERIES_QUERY = `
      query GetSeries($host: String!, $slug: String!) {
        publication(host: $host) {
          id
          series(slug: $slug) {
            id
            name
            slug
            description {
              markdown
              html
            }
            coverImage
            posts(first: 20) {
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
      }
    `;

    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SERIES_QUERY,
        variables: { host: HASHNODE_DOMAIN, slug: cleanSlug }
      }),
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      console.error('HTTP error in getSeries:', {
        status: res.status,
        statusText: res.statusText,
        slug: cleanSlug
      });
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      // Debug the raw error structure
      console.error('Raw GraphQL errors in getSeries:', {
        rawErrors: json.errors,
        errorsType: typeof json.errors,
        errorsLength: Array.isArray(json.errors) ? json.errors.length : 'not array',
        slug: cleanSlug
      });

      // Safely extract error details
      let errorDetails;
      try {
        if (Array.isArray(json.errors)) {
          errorDetails = json.errors.map((err: any) => ({
            message: err.message || 'No message',
            path: err.path || null,
            extensions: err.extensions || null
          }));
        } else {
          errorDetails = [{ message: 'Unexpected error format', rawError: json.errors }];
        }
      } catch (mapError) {
        errorDetails = [{ message: 'Error processing GraphQL errors', mapError: String(mapError) }];
      }

      console.error('GraphQL errors in getSeries:', {
        slug: cleanSlug,
        errorCount: errorDetails.length,
        query: 'SERIES_QUERY'
      });

      return null;
    }

    // Check if series was found
    if (!json.data?.publication?.series) {
      console.log('Series not found:', {
        slug: cleanSlug,
        hasPublication: !!json.data?.publication,
        hasSeriesField: 'series' in (json.data?.publication || {})
      });
      return null;
    }

    return json.data?.publication?.series || null;
  } catch (error) {
    console.error('Error fetching series:', {
      error: error instanceof Error ? error.message : String(error),
      slug: cleanSlug || slug
    });
    return null;
  }
};

export const getSeriesList = async (first: number = 10): Promise<{ id: string, name: string, slug: string, description?: { html?: string }, coverImage?: string, posts: { totalDocuments: number } }[]> => {
  try {
    console.log(`[Hashnode] Fetching series list for host: ${HASHNODE_DOMAIN}`);
    const SERIES_LIST_QUERY = `
      query GetSeriesList($host: String!, $first: Int!) {
        publication(host: $host) {
          id
          seriesList(first: $first) {
            edges {
              node {
                id
                name
                slug
                description {
                  html
                }
                coverImage
                posts(first: 1) {
                  totalDocuments
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SERIES_LIST_QUERY,
        variables: { host: HASHNODE_DOMAIN, first }
      }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`[Hashnode] API Error in getSeriesList: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();

    if (json.errors) {
      console.error('[Hashnode] GraphQL errors in getSeriesList:', JSON.stringify(json.errors, null, 2));
      return [];
    }

    return json?.data?.publication?.seriesList?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error("[Hashnode] Exception in getSeriesList:", error);
    return [];
  }
};
