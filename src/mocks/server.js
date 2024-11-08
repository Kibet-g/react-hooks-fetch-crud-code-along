// mocks/server.js
import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
  // Define the mock API handlers here
  rest.get("/api/items", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "Yogurt", category: "Dairy" },
        { id: 2, name: "Pomegranate", category: "Produce" },
        { id: 3, name: "Lettuce", category: "Produce" },
      ])
    );
  })
);

// Start the server before tests
beforeAll(() => server.listen());

// Reset all handlers after each test
afterEach(() => server.resetHandlers());

// Close the server after all tests are done
afterAll(() => server.close());
