## [0.7.0]

### Added:
- `--flat` option to CLI.

## [0.6.0]

### Added:
- Confirmation prompts
- Create `templatesSource` folder on `--init` if does not exists.

### Removed:
- Option to use config inside `package.json`

## [0.5.2]

### Removed:
- `fs-extra` dependency

## [0.5.1]

### Removed:
- `prompts` dependency and make `--init` command works.

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
