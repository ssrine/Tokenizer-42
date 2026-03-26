# Contributing to Tokenizer42

Thank you for your interest in contributing to Tokenizer42! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Follow the project's coding standards
- Maintain professional communication

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

1. Check if the issue already exists
2. Run `npm test` to verify the issue
3. Collect relevant information:
   - Reproduction steps
   - Expected vs actual behavior
   - Node.js version
   - Operating system

### Submitting a Bug Report

Include:
- Clear title and description
- Step-by-step reproduction
- Code examples if applicable
- Screenshots if relevant
- What you expected to happen
- What actually happened

## ✨ Suggesting Enhancements

### Before Suggesting an Enhancement

1. Check if the feature already exists
2. Review the documentation
3. Consider if it aligns with project goals

### Submitting an Enhancement Suggestion

Include:
- Clear, descriptive title
- Current behavior vs desired behavior
- Rationale for the enhancement
- Possible implementation approach
- Examples of similar features elsewhere

## 🤝 Contributing Code

### Development Setup

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Tokenizer.git
cd Tokenizer

# 3. Install dependencies
npm install

# 4. Create a feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Write code following the existing style**
   ```solidity
   // Solidity: Use OpenZeppelin patterns
   // JavaScript: Use ES6+ conventions
   ```

2. **Add tests for new functionality**
   ```javascript
   describe("Your Feature", function () {
       it("Should do something", async function () {
           // Arrange
           // Act
           // Assert
       });
   });
   ```

3. **Update documentation**
   - Update README if user-facing
   - Update project.md if technical
   - Add code comments
   - Update API reference

4. **Run tests locally**
   ```bash
   npm test
   npm run test:coverage
   ```

### Code Style Guide

#### Solidity

```solidity
// Use 4-space indentation
// Add comments to explain logic
// Use clear variable names
// Include inline documentation

/// @notice Brief description
/// @param param1 Description
/// @return Description of return value
function myFunction(uint256 param1) public returns (bool) {
    // Implementation
}
```

#### JavaScript/Tests

```javascript
// Use 4-space indentation
// Use descriptive variable names
// Follow AAA pattern (Arrange-Act-Assert)
// Add comments for complex logic

it("Should describe what is being tested", async function () {
    // Arrange: Setup
    const value = 100;
    
    // Act: Execute
    const result = await doSomething(value);
    
    // Assert: Verify
    expect(result).to.equal(expectedValue);
});
```

### Documentation Standards

- Use clear, professional English
- Include code examples
- Explain the "why" not just the "how"
- Keep lines under 100 characters
- Use markdown formatting properly

## 📝 Commit Messages

Follow conventional commits:

```
type(scope): subject line (50 chars or less)

Longer explanation if needed (wrap at 72 chars).

Closes #issue-number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(contract): add pause mechanism
fix(test): correct allowance decrease test
docs: update README with examples
test: add edge case for large amounts
```

## 📤 Submitting Pull Requests

### Before Submitting

- [ ] Tests pass: `npm test`
- [ ] Coverage is maintained: `npm run test:coverage`
- [ ] Code compiles: `npm run compile`
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No unnecessary files committed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Coverage maintained

## Documentation
- [ ] Updated README if needed
- [ ] Updated technical docs
- [ ] Added code comments

## Checklist
- [ ] Code follows style guide
- [ ] No new warnings generated
- [ ] Changes are backward compatible
```

## 🔍 Code Review Process

1. **Automated Checks**
   - Tests must pass
   - Coverage must be maintained
   - Code must compile

2. **Manual Review**
   - Code quality assessment
   - Security review
   - Documentation quality
   - Design alignment

3. **Feedback & Iteration**
   - Address reviewer feedback
   - Push updates to branch
   - Request re-review

4. **Merge**
   - Squash commits if needed
   - Merge to main branch
   - Close associated issues

## 📚 Documentation Contributions

### Fixing Typos

1. Edit the file directly
2. Create a pull request
3. Reference any related issues

### Adding Examples

Examples should:
- Be runnable/testable
- Include clear explanations
- Follow existing style
- Be properly commented

### Improving Clarity

- Try to match existing style
- Be concise yet complete
- Use proper terminology
- Link to relevant sections

## 🚀 Release Process

1. Update version in package.json
2. Update CHANGELOG (if maintained)
3. Create release notes
4. Tag release in git
5. Push to repository

Version format: `MAJOR.MINOR.PATCH` (Semantic Versioning)

## 📞 Getting Help

- **Questions:** Open a discussion issue
- **Problems:** Describe clearly in an issue
- **Blockers:** Contact maintainers
- **Documentation:** Submit improvement PR

## 🙏 Thank You

Your contributions help make Tokenizer42 better for everyone. Whether it's code, documentation, bug reports, or suggestions - every contribution matters!

---

## Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/)
- [Git Flow Guide](https://git-flow.readthedocs.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Happy contributing! 🚀
