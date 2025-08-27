# ChatGPT Clone PRD - Minimal Viable Product (Updated)

## 1. Project Overview

### Product Name

AI Chat Application

### Purpose

Build a minimal ChatGPT clone with core conversational AI features using modern web technologies.

### Tech Stack

- **Frontend Framework**: **Next.js 15+** (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend/Database**: Supabase (PostgreSQL + Auth + Realtime)
- **AI Model**: OpenAI API (**GPT-4o** or **GPT-4o mini**)

## 2. Core Features (MVP)

### 2.1 User Authentication

- **Sign Up/Sign In**: Email & password authentication via Supabase Auth.
- **Session Management**: Persistent login state.
- **Sign Out**: Functionality to clear the user session.

### 2.2 Chat Interface

- **Message Input**:

  - Text area with multi-line support.
  - Send button that is disabled when the input is empty.
  - Keyboard shortcut (Enter to send, Shift+Enter for a new line).

- **Message Display**:
  - User messages (right-aligned, distinct color).
  - AI responses (left-aligned, different color).
  - Timestamp for each message.
  - Loading indicator while waiting for the AI response.

### 2.3 Chat Management

- **New Chat**: Ability to start a fresh conversation.
- **Chat History**: List of previous conversations displayed in a sidebar.
- **Delete Chat**: Functionality to remove individual conversations.
- **Auto-save**: All messages are automatically persisted to the database.

### 2.4 AI Integration

- **OpenAI API Connection**: Manage the API key via environment variables.
- **Streaming Responses**: Real-time token streaming for an instant response experience.
- **Error Handling**: Graceful fallback for API failures.
- **Context Maintenance**: Send conversation history with each request to maintain context.

## 3. Database Schema

### Tables in Supabase

```sql
-- Users table (managed automatically by Supabase Auth)

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 4. Page Structure

### 4.1 Routes (Next.js App Router)

```
/app
  /(auth)
    /login
    /signup
  /(dashboard)
    /layout.tsx         # Dashboard layout with sidebar
    /chat
      /[conversationId]/page.tsx  # Specific conversation page
  /api
    /chat/route.ts      # API endpoint for OpenAI streaming
```

### 4.2 Main Layout Components

- **Sidebar** (250px width):

  - 'New Chat' button.
  - List of conversations.
  - User profile dropdown menu (at the bottom).

- **Main Chat Area**:
  - Header with the conversation title.
  - Scrollable messages container.
  - Message input section fixed to the bottom.

## 5. UI/UX Requirements

### Design Principles

- **Responsive**: Mobile-first design approach.
- **Dark/Light Mode**: Support for theme switching based on system preference.
- **Accessibility**: Adherence to web accessibility standards (e.g., keyboard navigation, ARIA labels).

### Component Specifications

- Utilize **shadcn/ui** components:
  - `Button`: For primary actions.
  - `Input` & `Textarea`: For text input fields.
  - `ScrollArea`: For the message list.
  - `Dialog`: For user confirmations (e.g., delete).
  - `DropdownMenu`: For the user menu.
  - `Skeleton`: To indicate loading states.

### Visual Hierarchy

- **Font Sizes**:
  - Headers: `text-lg`
  - Messages: `text-base`
  - Timestamps: `text-sm`
- **Spacing**: Consistent padding using Tailwind CSS's spacing scale.
- **Colors**: Use Tailwind's `slate` or `zinc` color palettes.

## 6. API Endpoints

### Next.js Route Handlers

```typescript
// POST /api/chat
// Role: Receives user message and streams the AI response.
// Request Body: { message: string, conversationId?: string }
// Returns: A stream of AI response tokens (using Server-Sent Events or a ReadableStream).

// POST /api/conversations
// Role: Creates a new conversation.
// Returns: { id, title, created_at }

// GET /api/conversations
// Role: Fetches the user's list of conversations.
// Returns: Conversation[]

// DELETE /api/conversations/[id]
// Role: Deletes a specific conversation and all its messages.
```

## 7. State Management

### Client-Side State

- **Current Conversation**: The list of messages in the active chat.
- **Conversations List**: The list of chats for the sidebar.
- **Loading States**: Indicators for API calls and waiting for responses.
- **User Session**: The user's authentication status.

### Data Fetching Strategy

- **Prioritize Server Components**: Fetch initial data (like the conversation list) on the server using Next.js Server Components to optimize performance.
- **Client-Side Fetching**: For real-time interactions (e.g., sending/receiving new messages), handle data fetching in Client Components. It is recommended to use a library like **TanStack Query** (formerly React Query) or **SWR**.
- **Optimistic UI Updates**: Improve user experience (UX) by updating the UI instantly upon message submission, without waiting for the server response (e.g., using `onMutate` in TanStack Query).

## 8. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_KEY

# OpenAI
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 9. Security Requirements

- **API Key Protection**: The OpenAI API key must only be used on the server-side and never exposed to the client.
- **Row Level Security (RLS)**: Enable RLS in Supabase to ensure users can only access their own data.
- **Rate Limiting**: Implement rate limiting on API endpoints to prevent abuse.
- **Input Sanitization**: Sanitize user inputs before storing them in the database to prevent attacks like XSS.
- **CORS Configuration**: Set up proper CORS headers for the API routes.

## 10. Performance Targets

- **Initial Load**: < 3 seconds.
- **Message Send**: Instant UI update (using optimistic updates).
- **AI Response Start**: < 2 seconds (time to first token).
- **Database Queries**: < 100ms.

## 11. MVP Exclusions (Future Features)

- Selection of multiple AI models.
- Message editing.
- Code block syntax highlighting.
- File attachments.
- Conversation sharing.
- Advanced prompt templates.
- Token usage tracking.
- Conversation export functionality.

## 12. Success Metrics

- A user can successfully sign up and sign in.
- A user can start a new conversation.
- A user can send a message and receive a response from the AI.
- Conversations persist across sessions.
- A user can view and continue previous conversations.
- A user can delete a conversation.

---

### Implementation Priority:

1.  Set up the Next.js project and connect to Supabase.
2.  Implement the authentication flow using Supabase Auth.
3.  Build the basic chat UI with shadcn/ui components.
4.  Integrate the OpenAI API with streaming via a Next.js Route Handler.
5.  Implement functionality to save conversations and messages to the database.
6.  Add the conversation history list and navigation in the sidebar.
7.  Implement loading and error state handling logic.
