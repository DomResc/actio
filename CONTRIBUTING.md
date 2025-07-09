# Contributing to Actio

Thank you for considering contributing to Actio! This document outlines the main guidelines and principles for contributing code, documentation, or ideas to the project.

## Language & Code Style

- All code and comments must be written in English.
- Use clear, descriptive variable and function names.
- Prefer modern, idiomatic TypeScript and React patterns.
- Add comments only where necessary for clarity.
- Follow the existing code style and formatting (Prettier and ESLint are configured).

## Project Overview

Actio is an open source tool for knowledge and project management, focused on:

- Security (end-to-end encryption, client-side)
- Privacy (no cleartext data on the server)
- Real-time collaboration (Yjs, multi-user awareness)
- Methodological flexibility (customizable processes)
- Unification of notes and tasks
- Self-hosted, Docker-friendly deployment

## Tech Stack

- Frontend: TanStack Start (React/TypeScript), Lexical rich text editor
- Real-time: Yjs (CRDT)
- Encryption: Web Crypto API (E2EE)
- Backend: TanStack Start API routes & WebSocket (encrypted data only)
- Storage: SQLite (metadata), encrypted files (attachments)
- Authentication: Custom (email/password or key-based)
- PWA support for mobile/offline

## How to Contribute

- Fork the repository and create a new branch for your feature or fix.
- Ensure your code passes linting and formatting checks (`pnpm test`).
- Write clear commit messages and document your changes if needed.
- Open a pull request with a clear description of your contribution.

## Deployment & Testing

- The project is self-hosted and Docker-friendly.
- Use environment variables for configuration.
- For backup, copy the SQLite DB and attachments folder (all data is encrypted).

## License

MIT

---

For any questions, open an issue or contact the maintainer.
