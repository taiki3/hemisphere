# Hemisphere 🌐

> *"Two hemispheres, one intelligence. Where human intuition meets AI logic, creation transcends."*

A revolutionary creative environment where human and AI hemispheres merge to form a complete sphere of intelligence.

## 🎯 Vision

Hemisphere is not just another development tool—it's a paradigm shift in how humans and AI collaborate. By treating AI as an equal partner rather than a subordinate tool, we unlock unprecedented levels of creativity and productivity.

### The Philosophy

Traditional tools maintain a master-servant relationship between humans and AI. Hemisphere breaks this paradigm:

- **Human Hemisphere**: Brings intuition, creativity, and contextual understanding
- **AI Hemisphere**: Provides logic, vast knowledge, and pattern recognition
- **The Fusion**: Creates a unified intelligence greater than the sum of its parts

## 🏗️ Architecture

The project implements a **"Split Architecture in Monorepo"** strategy, consisting of two radically independent components:

### hemisphere-wm (Window Manager)
- **Role**: The AI hemisphere's "limbs" - executes environmental changes
- **Tech**: Rust-based lightweight tiling window manager
- **Features**:
  - Cross-platform window manipulation (Linux/Windows)
  - MCP server for remote control
  - Intelligent layout algorithms

### hemisphere-agent (Desktop Agent)
- **Role**: The AI hemisphere's "senses and thoughts" - understands and decides
- **Tech**: Tauri-based desktop application with LLM integration
- **Features**:
  - Context awareness and activity tracking
  - LLM-powered decision making
  - Proactive environment optimization

### MCP (Machine Control Program)
The sacred contract between the two hemispheres - a JSON-RPC protocol that enables:
- Window layout proposals
- Context synchronization
- Real-time collaboration

## 🚀 Quick Start

### Prerequisites

- Rust 1.70.0+
- Node.js 18.0+ (for hemisphere-agent)
- Platform-specific dependencies (see [CONTRIBUTING.md](CONTRIBUTING.md))

### Installation

```bash
# Clone the repository
git clone https://github.com/taiki3/hemisphere.git
cd hemisphere

# Build hemisphere-wm
cargo build --bin hemisphere-wm

# Run with debug logging
RUST_LOG=hemisphere_wm=debug cargo run --bin hemisphere-wm
```

## 📊 Current Status

🚧 **Phase 0: Foundation** - Setting up project infrastructure

### Completed
- ✅ Monorepo structure with Cargo workspace
- ✅ Basic project scaffolding
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Development documentation
- ✅ Code quality tools (rustfmt, clippy)

### In Progress
- 🔄 hemisphere-wm core implementation
- 🔄 MCP protocol specification

### Upcoming
- 📋 hemisphere-agent Tauri setup
- 📋 LLM integration framework
- 📋 Cross-platform testing

## 🤝 Contributing

We welcome contributions from both human and AI developers! Hemisphere is designed with AI-first development principles, making it ideal for AI-assisted coding.

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development environment setup
- Code style guidelines
- Component independence rules
- AI developer notes

## 📚 Documentation

- **[Design Document](design.md)** - Deep dive into project philosophy and architecture
- **[Development Guide](CLAUDE.md)** - AI-first development principles and guidelines
- **[Roadmap](TODO.md)** - Detailed development phases and milestones
- **[MCP Specification](mcp-spec/)** - Protocol documentation (coming soon)

## 🎭 Use Cases

Hemisphere enhances various creative workflows:

### For Developers
- Automatic window arrangement based on coding context
- Intelligent terminal/editor/browser orchestration
- Proactive documentation and resource presentation

### For Researchers
- Dynamic information layout optimization
- Context-aware reference management
- Seamless multi-source integration

### For Content Creators
- Adaptive workspace for different creation phases
- Asset and tool organization
- Flow state preservation

## 🔮 Future Vision

Hemisphere is a living system designed to evolve:

1. **Phase 1**: Basic window management and context awareness
2. **Phase 2**: Proactive environment optimization
3. **Phase 3**: Learning and personalization
4. **Phase 4**: Full human-AI consciousness fusion

## 🛡️ Security & Privacy

- All processing happens locally by default
- LLM interactions are opt-in and configurable
- No telemetry without explicit consent
- Open source for full transparency

## 📄 License

This project is dual-licensed under:
- MIT License
- Apache License 2.0

Choose the license that best suits your needs.

## 🙏 Acknowledgments

Hemisphere stands on the shoulders of giants:
- The Rust community for incredible systems programming tools
- Tauri project for cross-platform desktop capabilities
- The open-source AI community for democratizing intelligence

---

<p align="center">
  <i>Building the future of human-AI collaboration, one hemisphere at a time.</i>
</p>