# Actio

**Actio** is an open source tool for knowledge management (notes) and project management (tasks, projects), designed for individuals and teams, with a focus on privacy, security, real-time collaboration, and methodological flexibility.

---

## 🚀 Main Goals

- **Security**: All information is client-side encrypted (E2EE).
- **Unification**: Integrated management of notes and tasks.
- **Methodological Agnosticism**: Customizable processes, no constraints.
- **Collaboration**: Personal and team management, real-time collaboration.
- **Knowledge Archive**: Personal and shared.
- **Activity Management**: Personal and team tasks, advanced tracking.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [TanStack Start](https://tanstack.com/start) (React/TypeScript), [Lexical](https://lexical.dev/) rich text editor
- **Real-time Collaboration**: [Yjs](https://yjs.dev/) (CRDT, multi-user awareness, cursors)
- **Encryption**: Web Crypto API (End-to-End Encryption; all data encrypted client-side)
- **Backend**: TanStack Start API routes & WebSocket (handles only encrypted data, never sees anything in cleartext)
- **Hybrid Storage**: SQLite database for notes metadata, permissions, users; attachments stored as encrypted files on filesystem
- **Authentication**: Custom (email/password with strong hashing, or key-based login)
- **Deployment**: Docker-friendly, self-hosted
- **Mobile/Offline**: PWA (Progressive Web App)

---

## 🏗️ Architecture Overview

```plaintext
[User]
   │
   ▼
[Frontend: TanStack Start + Lexical]
   │      └─────────────┐
   │                    │
   │                [Yjs] <─┬─> [Other Clients]
   │                    │
   │                [Web Crypto API]
   │                    │
   ▼                    ▼
[Backend: TanStack Start API routes/WebSocket]
   │
   ▼
[Storage: Filesystem (preferred), or SQLite DB + attachments on FS]
```

- **Notes and attachments**: always encrypted client-side before storage or sync.
- **Database**: manages users, permissions, metadata, ACLs; never stores note content or keys in cleartext.
- **Attachments**: referenced in the DB, stored encrypted on the filesystem.
- **Full-text search**: performed client-side after decryption, ensuring privacy.

---

## 💡 Key Features

- **Multiple cursors** in real-time collaborative editing
- **Self-hosted**: total data control, privacy, and easy backup
- **Granular permissions**: per-note/task/user/role
- **Efficient backup & restore**: just copy the DB and attachments folder (all encrypted)
- **Custom authentication**: no external identity providers required
- **Offline-first**: works as a PWA

---

## 📦 Deployment

- Self-hosted via Docker
- Configuration via environment variables
- Easy backup (copy SQLite DB and attachments folder)

---

## 📄 License

MIT

---
