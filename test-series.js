import { getSeries } from './src/lib/hashnode.js';

async function testSeries() {
  console.log('Testing getSeries function...');
  
  // Test with a common slug that might exist
  const testSlug = 'getting-started'; // Common series name
  console.log(`Testing with slug: ${testSlug}`);
  
  const result = await getSeries(testSlug);
  console.log('Result:', result);
  
  // Test with empty slug
  console.log('\nTesting with empty slug...');
  const emptyResult = await getSeries('');
  console.log('Empty slug result:', emptyResult);
  
  // Test with null/undefined
  console.log('\nTesting with undefined slug...');
  try {
    const undefinedResult = await getSeries(undefined);
    console.log('Undefined slug result:', undefinedResult);
  } catch (error) {
    console.log('Error with undefined slug:', error.message);
  }
}

testSeries().catch(console.error);
