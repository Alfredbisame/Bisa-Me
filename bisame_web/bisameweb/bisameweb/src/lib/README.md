# API Configuration Library

A modular, production-ready API configuration system for Next.js with TypeScript support.

## 📁 Structure

```
src/lib/
├── config/
│   └── constants.ts      # Base URLs and app configuration
├── api-endpoints.ts       # All API endpoint definitions
├── client.ts              # Generic HTTP client with all verbs
├── auth-client.ts         # Authenticated HTTP client
└── index.ts               # Main exports
```

## 🚀 Usage

### Basic HTTP Requests

```typescript
import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

// GET request
const listings = await httpClient.get(
  buildListingsUrl(LISTINGS_ENDPOINTS.trending)
);

// POST request
const newListing = await httpClient.post(
  buildListingsUrl(LISTINGS_ENDPOINTS.list),
  { title: 'New Item', price: 1000 }
);

// With query parameters
const searchResults = await httpClient.get(
  buildListingsUrl(LISTINGS_ENDPOINTS.search),
  { params: { q: 'laptop', category: 'electronics' } }
);
```

### Authenticated Requests

```typescript
import { authClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

// Authenticated GET
const favorites = await authClient.get(
  buildListingsUrl(LISTINGS_ENDPOINTS.favorites)
);

// Authenticated POST
const newReview = await authClient.post(
  buildListingsUrl(REVIEW_ENDPOINTS.base),
  { rating: 5, comment: 'Great product!' }
);

// Authenticated DELETE
await authClient.delete(
  buildListingsUrl(replacePathParams(FAVORITES_ENDPOINTS.delete, { listingId: '123' }))
);
```

### Path Parameters

```typescript
import { replacePathParams, LISTINGS_ENDPOINTS } from '@/lib';

// Replace {id} with actual value
const endpoint = replacePathParams(LISTINGS_ENDPOINTS.details, { id: '123' });
// Result: '/v1/api/listings/123'
```

### Token Management

```typescript
import { tokenManager, sessionManager } from '@/lib/auth-client';

// After login
tokenManager.setToken(authToken, true); // true = localStorage (persistent)
sessionManager.setUser(userData, true);

// Check authentication
if (sessionManager.isAuthenticated()) {
  const user = sessionManager.getUser();
}

// Logout
sessionManager.clearSession();
```

### Error Handling

```typescript
import { authClient, ApiError } from '@/lib';

try {
  const data = await authClient.get('/api/endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}:`, error.message);
    console.error('Error data:', error.data);
  }
}
```

## 🔌 Available Endpoints

All endpoints are organized by domain in `api-endpoints.ts`:

- **Authentication**: `AUTH_ENDPOINTS` - login, signup, OAuth, OTP, etc.
- **Listings**: `LISTINGS_ENDPOINTS` - trending, favorites, search, etc.
- **Categories**: `CATEGORY_ENDPOINTS` - all categories, dropdown options
- **Regions**: `REGION_ENDPOINTS` - listings summary, ranked regions
- **Profile**: `PROFILE_ENDPOINTS` - user listings, reviews, stats
- **Favorites**: `FAVORITES_ENDPOINTS` - manage favorites
- **Reviews**: `REVIEW_ENDPOINTS` - customer reviews, replies
- **Follows**: `FOLLOW_ENDPOINTS` - following, followers, actions
- **Chat**: `CHAT_ENDPOINTS` - contacts, messages
- **Promotions**: `PROMOTION_ENDPOINTS` - plans, purchases
- **Files**: `FILE_ENDPOINTS` - file uploads
- **Forms**: `FORM_ENDPOINTS` - form options
- **Misc**: `MISC_ENDPOINTS` - complains, home sections, live stream

## 🛠️ HTTP Methods

Both `httpClient` and `authClient` support:

- `get<T>(url, config?)` - GET requests
- `post<T>(url, data?, config?)` - POST requests
- `put<T>(url, data?, config?)` - PUT requests
- `patch<T>(url, data?, config?)` - PATCH requests
- `delete<T>(url, config?)` - DELETE requests

## ⚙️ Configuration

All configuration is in `config/constants.ts`:

- **Base URLs**: `AUTH_API_BASE_URL`, `LISTINGS_BASE_URL`
- **Firebase**: `FIREBASE_CONFIG`
- **OAuth**: `GOOGLE_OAUTH`
- **NextAuth**: `NEXTAUTH`
- **App Settings**: `APP_CONFIG`

## 🔒 Authentication Flow

1. **Login**: Use `httpClient.post()` with `buildAuthUrl(AUTH_ENDPOINTS.login)`
2. **Store Token**: Call `tokenManager.setToken(token)`
3. **Store User**: Call `sessionManager.setUser(user)`
4. **Make Requests**: Use `authClient` for authenticated endpoints
5. **Logout**: Call `sessionManager.clearSession()`

## 📝 TypeScript Support

Full TypeScript support with generics:

```typescript
interface Listing {
  id: string;
  title: string;
  price: number;
}

const listings = await httpClient.get<Listing[]>(url);
// listings is typed as Listing[]
```

## 🌐 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_AUTH_API_BASE_URL=https://auth.bisame.com/
NEXT_PUBLIC_LISTINGS_BASE_URL=https://api.bisame.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_DEFAULT_COUNTRY_CODE=GH
# ... and others
```

## 🎯 Best Practices

1. **Use TypeScript generics** for type-safe responses
2. **Handle errors** with try-catch and `ApiError` checks
3. **Use `authClient`** for protected endpoints
4. **Use helper functions** like `buildAuthUrl()`, `buildListingsUrl()`, `replacePathParams()`
5. **Keep tokens secure** - they auto-inject with `authClient`
6. **Clear session on logout** - use `sessionManager.clearSession()`
