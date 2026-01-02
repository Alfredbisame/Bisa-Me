// This route is deprecated. Use /api/Dashboard/Followers/Follow instead.
export async function POST() {
  return new Response('This endpoint is deprecated. Use /api/Dashboard/Followers/Follow instead.', {
    status: 410, // Gone
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}