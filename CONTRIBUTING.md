# Nameless Analytics | Contributing

Thank you for your interest in contributing to Nameless Analytics! We welcome contributions from the community to help make this open-source analytics suite even better.

## How to Contribute

### 1. Reporting Bugs
If you find a bug, please open an issue on GitHub. Include:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected vs. actual behavior.
- Any relevant logs from GTM Preview mode or BigQuery errors.

### 2. Feature Requests
Suggestions for new features are always welcome. Please open an issue and describe:
- The problem this feature would solve.
- How you imagine the feature working.
- Any technical considerations (e.g., changes needed in GTM Server vs. Web).

### 3. Pull Requests
If you want to contribute code, templates, or documentation:
1. **Fork the repository** and create your branch from `main`.
2. **Make your changes**:
   - For **SQL scripts**, ensure they follow the BigQuery standard SQL syntax and are well-commented.
   - For **GTM Templates**, provide a clear description of the changes in the PR.
   - For **Documentation**, ensure clarity and professional tone.
3. **Test your changes** in a real GCP/GTM environment before submitting.
4. **Submit a Pull Request** with a detailed description of what you've done.

## Technical Standards

### SQL Style
- Use `lower_case` for table and column names.
- Provide comments for complex logic.
- Ensure scripts are idempotent where possible (e.g., `CREATE OR REPLACE`).

### GTM Templates
- Use descriptive names for variables and tags.
- Minimize the use of external libraries; prefer GTM native APIs.
- Ensure compliance with Google Consent Mode.

## License
By contributing to Nameless Analytics, you agree that your contributions will be licensed under the [MIT License](LICENSE).
