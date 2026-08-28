# Architecture Overview: gemini-cli

This document outlines the architecture of the `gemini-cli` project, a CLI-based agent designed for the Termux/Node.js environment.

## 1. Project Structure

[Project Root]/
├── bin/                 # CLI entry point/executable
├── src/                 # Core application logic
│   ├── agents/          # Agent orchestration and sub-agents
│   ├── tools/           # MCP tools implementation
│   ├── skills/          # Specialized agent skills
│   └── utils/           # Shared utility functions
├── gemini-cli/          # Project workspace (memory/configs)
├── GEMINI.md            # Project memory and rules
├── TODO.md              # Project task management
├── ARCHITECTURE.md      # This document
└── package.json         # Node.js dependencies and scripts

## 2. High-Level System Diagram

[User] <--> [CLI Interface (Node.js/Termux)] <--> [Agent Core] <--> [Google Gemini API]
                                                      |
                                                      +--> [Local System/Tools]

## 3. Core Components

### 3.1. CLI Interface
*   **Responsibility:** Handles user input, displays outputs, and manages the execution flow of the agent.
*   **Technologies:** Node.js, `readline` (or similar CLI library).

### 3.2. Agent Core
*   **Responsibility:** Orchestrates user requests, maintains session state, invokes sub-agents, and communicates with the Gemini API.
*   **Technologies:** Node.js, Gemini API SDK.

## 4. Data Stores

### 4.1. Local Files
*   **Type:** Markdown files.
*   **Purpose:** Persists project-specific configuration, memory (`GEMINI.md`), tasks (`TODO.md`), and logs.

## 5. External Integrations / APIs

*   **Google Gemini API:** Provides LLM capabilities for text processing, code generation, and task planning.

## 6. Deployment & Infrastructure

*   **Environment:** Local Termux (Android).
*   **Runtime:** Node.js.

## 7. Security Considerations

*   **API Keys:** Must be managed via environment variables and NEVER committed to version control.
*   **File Permissions:** Standard Linux file system permissions apply to the workspace.

## 8. Development & Testing Environment

*   **Local Setup:** Node.js runtime and npm for dependency management.
*   **Testing:** Manual and automated testing via project-specific test scripts.

## 10. Project Identification

Project Name: gemini-cli
Primary Contact: [User Name]
Date of Last Update: 2026-08-23

## 11. Glossary / Acronyms

*   **CLI:** Command Line Interface.
*   **MCP:** Model Context Protocol.
*   **Termux:** Terminal emulator for Android.
