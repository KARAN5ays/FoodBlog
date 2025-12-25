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
                posts(first: 0) {
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
            next: { revalidate: 60 } // Reduced cache time for debugging
        });

        if (!res.ok) {
            console.error(`[Hashnode] Series list HTTP error! status: ${res.status}`);
            return [];
        }

        const json = await res.json();

        if (json.errors) {
            console.error('[Hashnode] GraphQL errors in getSeriesList:', JSON.stringify(json.errors, null, 2));
            return [];
        }

        const seriesList = json.data?.publication?.seriesList?.edges?.map((edge: any) => edge.node) || [];
        console.log(`[Hashnode] Found ${seriesList.length} series:`, seriesList.map((s: any) => s.name));

        return seriesList;
    } catch (error) {
        console.error("[Hashnode] Exception fetching series list:", error);
        return [];
    }
};
