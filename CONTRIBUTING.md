# Contributing to Hemisphere

Thank you for your interest in contributing to Hemisphere! This document provides guidelines for setting up your development environment and contributing to the project.

## Development Philosophy

Hemisphere is designed with **AI-First Development** in mind. This means:
- Code should be readable by both humans and AI
- Clear module separation and interfaces
- Comprehensive documentation and type definitions
- Strict adherence to the MCP (Machine Control Program) protocol

## Prerequisites

### Required Tools

- **Rust**: 1.70.0 or later
- **Node.js**: 18.0 or later (for hemisphere-agent)
- **Git**: For version control

### Platform-Specific Requirements

#### Linux
```bash
# For X11 support
sudo apt-get install libx11-dev libxcb1-dev libxcb-shape0-dev libxcb-xfixes0-dev

# For Tauri (hemisphere-agent)
sudo apt-get install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

#### Windows
- Visual Studio 2019 or later with C++ build tools
- Windows 10 SDK

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/taiki3/hemisphere.git
   cd hemisphere
   ```

2. **Build the project**
   ```bash
   # Build hemisphere-wm only (currently)
   cargo build
   
   # Run tests
   cargo test
   
   # Run with debug logging
   RUST_LOG=hemisphere_wm=debug cargo run --bin hemisphere-wm
   ```

3. **Code formatting and linting**
   ```bash
   # Format code
   cargo fmt --all
   
   # Run clippy
   cargo clippy -- -D warnings
   ```

## Project Structure

```
hemisphere/
├── hemisphere-wm/        # Window Manager component
├── hemisphere-agent/     # Desktop Agent component
├── mcp-spec/            # MCP protocol specifications
└── docs/                # Additional documentation
```

## Development Guidelines

### Code Style

- Follow Rust standard naming conventions
- Use meaningful variable and function names
- Keep functions small and focused
- Document public APIs with doc comments

### Commit Messages

Use conventional commit format:
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Build process or auxiliary tool changes

### Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting PR
- Add integration tests for MCP protocol changes

### Component Independence

Remember that `hemisphere-wm` and `hemisphere-agent` must remain independent:
- They should only communicate via MCP
- No shared code outside of workspace dependencies
- Each component should be buildable and testable in isolation

## MCP Protocol Development

When modifying the MCP protocol:
1. Update the specification in `mcp-spec/`
2. Implement changes in both components
3. Add protocol version negotiation if breaking changes
4. Update integration tests

## Debugging

### Enable debug logging
```bash
# For hemisphere-wm
RUST_LOG=hemisphere_wm=debug cargo run --bin hemisphere-wm

# For hemisphere-agent (when available)
RUST_LOG=hemisphere_agent=debug cargo tauri dev
```

### Common Issues

1. **Build failures on Linux**: Ensure all system dependencies are installed
2. **Clippy warnings**: Run `cargo clippy --fix` for automatic fixes
3. **Format issues**: Run `cargo fmt --all` before committing

## Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes
6. Push to your fork
7. Open a Pull Request

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure CI passes
- Be responsive to review feedback

## AI Developer Notes

If you're an AI contributing to this project:
- Prioritize code clarity and explicit type annotations
- Document your reasoning in comments when implementing complex logic
- Ensure MCP protocol messages include clear descriptions
- Test edge cases thoroughly

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

Thank you for contributing to Hemisphere!