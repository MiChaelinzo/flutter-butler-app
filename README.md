# 🤖 Flutter Butler • AI Command Center

> Your sophisticated AI-powered personal butler built with **Flutter** and **Serverpod** that automates daily tasks, provides intelligent assistance, and helps you stay organized through smart automation and personalized insights.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Flutter](https://img.shields.io/badge/Flutter-3.32-02569B)
![Dart](https://img.shields.io/badge/Dart-3.8-0175C2)
![Serverpod](https://img.shields.io/badge/Serverpod-3.3.1-purple)

---

## 🌟 Overview

**Flutter Butler** is a personal assistant app built with **Flutter** and **Serverpod** for the [Serverpod Hackathon](https://serverpod.devpost.com/). It transforms how you manage your day by combining AI-powered features with an intuitive Material Design 3 interface, all running on the Serverpod backend framework.

### ✨ Key Highlights

- **🧠 AI-Powered Intelligence**: Butler chat assistant for smart suggestions, daily briefings, and conversational assistance
- **⚡ Quick Actions**: One-click shortcuts for common tasks (draft emails, meeting prep, research summaries)
- **🎯 Smart Task Management**: Intelligent prioritization with categories and priority levels
- **🔄 Automation Studio**: Pre-built workflow templates for morning routines, meeting prep, and day reviews
- **📊 Daily Briefing Dashboard**: Personalized daily summaries with priorities and motivational quotes
- **🔌 Serverpod Backend**: Full-stack Dart with type-safe API endpoints and serialization
- **📱 Cross-Platform**: Flutter app runs on iOS, Android, Web, and Desktop

---

## 🚀 Features

### 🎯 Core Productivity Suite

#### Daily Briefing Dashboard
Start your day informed with personalized summaries including:
- Time-aware greetings
- Top 3 priorities for the day
- Smart suggestions based on context
- Motivational quotes

#### Task Manager
Intelligent task organization with:
- Priority levels (urgent, high, medium, low)
- Category tags (work, personal, creative, routine)
- Completion tracking with visual progress
- Swipe to delete, tap to complete
- Add tasks with a dialog form

#### Butler Chat Assistant
Conversational AI interface with:
- Context-aware responses
- Quick suggestion chips
- Natural language interaction
- Category-based reply routing

#### Automation Studio
Pre-built workflow templates for:
- Morning routine (5 steps)
- Meeting preparation
- End-of-day review
- Weekly planning
- Run automations with step-by-step execution

### ⚡ Quick Actions
One-click shortcuts powered by Serverpod endpoints:
- Draft professional emails
- Prepare meeting agendas
- Summarize content
- Start focus timer

---

## 🛠️ Technology Stack

### Frontend
- **Flutter 3.32+** — Cross-platform UI framework
- **Material Design 3** — Modern design system with dynamic color
- **Dart 3.8+** — Type-safe programming language

### Backend
- **Serverpod 3.3.1** — The Flutter backend framework
- **PostgreSQL 16** — Database (via Docker)
- **Redis 7** — Caching (via Docker)

### Architecture
- **Serverpod Endpoints** — Type-safe API with auto-generated client code
- **Protocol Models** — Shared serializable data classes (`.spy.yaml`)
- **Three-Package Structure** — Server, Client, Flutter app

---

## 📁 Project Structure

```
flutter-butler-app/
├── flutter_butler_server/       # Serverpod backend
│   ├── bin/main.dart            # Server entry point
│   ├── lib/
│   │   ├── server.dart          # Server initialization
│   │   └── src/
│   │       ├── endpoints/       # API endpoints
│   │       │   ├── butler_endpoint.dart
│   │       │   ├── task_endpoint.dart
│   │       │   └── automation_endpoint.dart
│   │       ├── models/          # Protocol YAML + Dart models
│   │       └── generated/       # Auto-generated code
│   ├── config/                  # Environment configs
│   ├── docker-compose.yaml      # Postgres + Redis
│   └── Dockerfile
│
├── flutter_butler_client/       # Serverpod client package
│   ├── lib/
│   │   ├── flutter_butler_client.dart
│   │   └── src/protocol/       # Client-side models + protocol
│   └── pubspec.yaml
│
├── flutter_butler_flutter/      # Flutter frontend app
│   ├── lib/
│   │   ├── main.dart           # App entry point
│   │   └── src/
│   │       ├── app.dart        # Material 3 app with navigation
│   │       └── screens/
│   │           ├── home_screen.dart
│   │           ├── tasks_screen.dart
│   │           ├── butler_chat_screen.dart
│   │           └── automations_screen.dart
│   ├── assets/config.json      # Server URL config
│   ├── web/                    # Flutter web support
│   └── pubspec.yaml
│
├── src/                        # Web dashboard (React/TypeScript)
├── README.md
└── LICENSE
```

---

## 📦 Installation & Setup

### Prerequisites
- [Flutter SDK](https://flutter.dev/docs/get-started/install) 3.32+
- [Dart SDK](https://dart.dev/get-dart) 3.8+
- [Serverpod CLI](https://docs.serverpod.dev/) 3.3.1
- [Docker](https://www.docker.com/) (for PostgreSQL and Redis)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/MiChaelinzo/flutter-butler-app.git
cd flutter-butler-app
```

2. **Start the database**
```bash
cd flutter_butler_server
docker compose up -d
```

3. **Generate Serverpod code**
```bash
cd flutter_butler_server
serverpod generate
```

4. **Start the server**
```bash
cd flutter_butler_server
dart bin/main.dart --apply-migrations
```

5. **Run the Flutter app**
```bash
cd flutter_butler_flutter
flutter run
```

### Running on Web
```bash
cd flutter_butler_flutter
flutter run -d chrome
```

---

## 🔐 Security & Privacy

- **Local-First Development**: Default config connects to localhost
- **Serverpod Security**: Built-in session management and authentication support
- **Docker Isolation**: Database and cache run in isolated containers
- **No Hardcoded Secrets**: Passwords managed via `config/passwords.yaml`

---

## 🏆 Hackathon Submission

### Serverpod Hackathon — Flutter Butler

This project was built for the [Serverpod Hackathon on Devpost](https://serverpod.devpost.com/).

| Requirement | Status |
|-------------|--------|
| Built with Serverpod and Flutter | ✅ Serverpod 3.3.1 + Flutter 3.32 |
| New and original project | ✅ Built from scratch for this hackathon |
| Working project | ✅ Full-stack with server, client, and Flutter app |
| Code repository | ✅ Public GitHub repo |
| Demo video | 📹 Coming soon |
| Project description | ✅ This README |

### What Flutter Butler Does

Flutter Butler is a personal assistant app that helps users:
- **Stay organized** with smart task management and priority suggestions
- **Start each day informed** with AI-generated daily briefings
- **Automate routines** with pre-built workflow templates
- **Get instant help** through a conversational chat interface
- **Take quick actions** like drafting emails and preparing for meetings

### How It Was Built

- **Serverpod** powers the backend with type-safe endpoints for tasks, briefings, automations, and chat
- **Flutter** provides the cross-platform frontend with Material Design 3
- **Protocol models** defined in YAML ensure type safety across server and client
- **Three-package architecture** follows Serverpod best practices (server, client, Flutter)

### Technical Innovation

- Full-stack Dart — same language on frontend and backend
- Type-safe API calls with auto-generated client code
- Serializable protocol models shared between server and client
- Material Design 3 with dynamic color theming
- Cross-platform support (iOS, Android, Web, Desktop)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with 💜 using Flutter + Serverpod**

[Serverpod Hackathon](https://serverpod.devpost.com/) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>
