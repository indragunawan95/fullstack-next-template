import { POST } from '@/app/api/task/route';
import { prisma } from '@/lib/prisma';

// Mocking the prisma client's module
jest.mock('@/lib/prisma', () => ({
  prisma: {
    todo: {
      create: jest.fn().mockResolvedValue({ id: 1, text: 'Test Todo' }),
    },
  },
}));

describe('/api/route POST endpoint', () => {
  it('creates a new todo item successfully', async () => {
    // Mock the JSON function and prisma response
    const jsonMock = jest.fn().mockResolvedValue({ text: 'Test Todo' });
    const req = { json: jsonMock };
    prisma.todo.create.mockResolvedValue({ id: 1, text: 'Test Todo' });

    const response = await POST(req);
    // Convert the ReadableStream to JSON before assertions
    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result).toEqual({ data: { id: 1, text: 'Test Todo' } });
    expect(prisma.todo.create).toHaveBeenCalledWith({ data: { text: 'Test Todo' } });
  });

  it('handles exceptions', async () => {
    // Mock the JSON function and prisma to throw an error
    const jsonMock = jest.fn().mockResolvedValue({ text: 'Test Todo' });
    const req = { json: jsonMock };
    const errorMessage = 'Something went wrong';
    prisma.todo.create.mockRejectedValue(new Error(errorMessage));

    const response = await POST(req);
    // Convert the ReadableStream to JSON before assertions
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result).toEqual({ error: errorMessage });
  });
});