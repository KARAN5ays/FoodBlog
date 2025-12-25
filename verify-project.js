
const { getPosts } = require('./src/lib/hashnode');

// Native fetch is available in Node 18+

const HASHNODE_API = 'https://gql.hashnode.com'; // Hardcoded for script
const HASHNODE_DOMAIN = 'it-blog-livid.vercel.app'; // Your domain

const QUERY = `
  query GetPosts($host: String!) {
    publication(host: $host) {
      posts(first: 20) {
        edges {
          node {
            title
            slug
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

async function checkProjects() {
    try {
        const res = await fetch(HASHNODE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: QUERY,
                variables: { host: HASHNODE_DOMAIN }
            })
        });

        const json = await res.json();
        const posts = json.data.publication.posts.edges;

        console.log("Found " + posts.length + " total posts.");

        const projects = posts.filter(edge =>
            edge.node.tags.some(tag => ['project', 'projects', 'portfolio'].includes(tag.name.toLowerCase()))
        );

        if (projects.length > 0) {
            console.log("\n✅ SUCCESS: Found " + projects.length + " PROJECT post(s):");
            projects.forEach(p => {
                console.log(`- "${p.node.title}" (Tags: ${p.node.tags.map(t => t.name).join(', ')})`);
            });
            console.log("\nIt should appear on http://localhost:3000/projects");
        } else {
            console.log("\n❌ No posts found with tag 'project' or 'portfolio'.");
            console.log("Recent posts tags:");
            posts.slice(0, 5).forEach(p => {
                const tagNames = p.node.tags.map(t => t.name).join(', ');
                console.log(`- "${p.node.title}": [${tagNames}]`);
            });
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

checkProjects();
