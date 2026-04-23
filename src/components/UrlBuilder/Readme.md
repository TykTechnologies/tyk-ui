# URL Builder

```jsx
const handleChange = (value) => {
  console.log('URL changed:', value);
};

<URLBuilder
  initialValue={{
    method: 'GET',
    host: 'http://localhost',
    listenPath: '/api'
  }}
  options={{
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    hosts: [
    "http://localhost",
    "https://localhost",
    "http://api.example.com",
    "https://api.example.com",
  ],
    listenPaths: ["/api", "/v1", "/v2", "/gateway"],
    endpoints: [
    "/pets",
    "/users",
    "/orders",
    "/products",
    "/pet/{id}",
    "/user/{userId}/posts/{postId}",
  ],
    paths: ["1", "2", "3", "new", "edit"]
  }}
  onChange={handleChange}
  disabled={false}
/>
```