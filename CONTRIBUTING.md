# Contributing to Hemisphere

Thank you for your interest in contributing to Hemisphere! This document provides guidelines for setting up your development environment and contributing to the project.

## Development Philosophy

### Core Principle: Test-Driven Development (TDD)

**MOST IMPORTANT**: This project strictly follows **t-wada's TDD principles**. Every piece of code must be developed using the Red-Green-Refactor cycle:

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

### AI-First Development

Hemisphere is designed with **AI-First Development** in mind. This means:
- Code should be readable by both humans and AI
- Clear module separation and interfaces
- Comprehensive documentation and type definitions
- Strict adherence to the MCP (Machine Control Program) protocol
- **All code must have tests written first (TDD)**

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

### Test-Driven Development Practice

1. **Before writing any production code**:
   - Write a failing test that describes the desired behavior
   - Run the test to ensure it fails (Red phase)
   - Only then write production code

2. **Writing tests**:
   ```rust
   #[test]
   fn test_behavior_description() {
       // Arrange
       let system = SystemUnderTest::new();
       
       // Act
       let result = system.do_something();
       
       // Assert
       assert_eq!(result, expected_value);
   }
   ```

3. **Test organization**:
   - Unit tests: In the same file as the code (`#[cfg(test)] mod tests`)
   - Integration tests: In `tests/` directory
   - Each test should test ONE thing
   - Test names should clearly describe what is being tested

4. **Coverage requirements**:
   - Minimum 80% code coverage
   - 100% coverage for public APIs
   - All edge cases must have tests

### Code Style

- Follow Rust standard naming conventions
- Use meaningful variable and function names
- Keep functions small and focused
- Document public APIs with doc comments
- **No production code without a failing test first**

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

### Testing (TDD Workflow)

1. **Starting a new feature**:
   ```bash
   # 1. Write a failing test
   # 2. Run test to see it fail
   cargo test
   # 3. Write minimal code to pass
   # 4. Run test to see it pass
   cargo test
   # 5. Refactor if needed
   # 6. Ensure tests still pass
   cargo test
   ```

2. **Test types required**:
   - Unit tests for all public functions
   - Integration tests for component interactions
   - E2E tests for MCP protocol changes
   - Property-based tests for algorithms

3. **Running tests**:
   ```bash
   # Run all tests
   cargo test
   
   # Run specific test
   cargo test test_name
   
   # Run with coverage
   cargo tarpaulin --out Html
   ```

4. **PR requirements**:
   - All tests must pass
   - Coverage must not decrease
   - New features must have tests
   - Bug fixes must include regression tests

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