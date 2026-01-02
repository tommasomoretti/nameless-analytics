# Changelog

All notable changes to Nameless Analytics will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- **BigQuery Master Script**: Create a single SQL/DML script to initialize all reporting table functions at once.
- **Error/Edge Case Management**: Rethink the management of errors and edge cases from scratch (currently in `nameless-analytics-client-side-tracker-tag`).
- **Gemini Gem**: Release the specialized Gemini model for platform Q&A.
- **Streaming Protocol**: Finalize development of the Python/Server-to-Server ingestion protocol and add to documentation.

---

## [1.0.0] - 2026-01-02

### Added
- **Global Repo Analysis**: Completed comprehensive review of all files in the repository to identify missing documentation or features.
- **Link & Anchor Audit**: Verified all internal anchors and external links across all `.md` files for correctness.
- **Technical Deep Dive Review**: Performed final review of the "Client-Side Collection" and "Server-Side Processing" sections for maximum clarity and technical accuracy.

### Documentation
- Enhanced README.md with complete technical architecture documentation
- Added detailed reporting tables documentation with field-by-field descriptions
- Created comprehensive field comparison matrix across all table functions
- Added request payload examples with full parameter documentation

---

## [0.9.0] - 2025-12-XX

### Added
- Initial public release of Nameless Analytics
- Client-side tracker tag for GTM Web
- Server-side client tag for GTM Server-side
- BigQuery reporting table functions:
  - Events
  - Users
  - Sessions
  - Pages
  - Transactions
  - Products
  - Shopping stages (open/closed funnel)
  - GTM Performances
  - Consents
- Firestore integration for real-time session management
- Google Consent Mode integration
- Cross-domain tracking support
- Bot protection and security features

### Documentation
- Main README.md with architecture overview
- CONTRIBUTING.md with contribution guidelines
- Reporting tables documentation
- GTM container templates

---

## Notes

### Version Numbering
- **Major version (X.0.0)**: Breaking changes or major feature releases
- **Minor version (0.X.0)**: New features, backward compatible
- **Patch version (0.0.X)**: Bug fixes and minor improvements

### Categories
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
- **Documentation**: Documentation updates

---

[Unreleased]: https://github.com/nameless-analytics/nameless-analytics/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/nameless-analytics/nameless-analytics/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/nameless-analytics/nameless-analytics/releases/tag/v0.9.0
