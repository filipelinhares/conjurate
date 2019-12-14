## [0.5.0]

### Changed:
- `templatesRoot` renamed to `templatesSource`

### Removed:
- `chalk` as dependencies

## [0.4.0]

Start using `vinyl-fs` instead of a temp dir.

### Added:

- `--logs` and `--no-logs` flags.

### Changed:

- Placeholders names to:
  - `%camel-case%`
  - `%lower-case%`
  - `%no-case%`
  - `%dot-case%`
  - `%dash-case%`
  - `%pascal-case%`
  - `%path-case%`
  - `%snake-case%`
  - `%swap-case%`
  - `%title-case%`
  - `%upper-case%`
  - `%first-word%`
  - `%last-word%`
