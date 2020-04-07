## 0.6.2
* When checking base language extension do not check if active due to lazy loading, fixes [#21](https://github.com/hansec/vscode-fortran-ls/issues/17)

## 0.6.1
* Fix syntax highlighting with "fortran" language package (requires fortls v1.11.0+), fixes [#17](https://github.com/hansec/vscode-fortran-ls/issues/17)

## 0.6.0
* Add support for language server v1.9 features
* Fix support for VSCode "fortran" extension, fixes [#15](https://github.com/hansec/vscode-fortran-ls/issues/15)
* Bump recommended minimum language server version to 1.9.0

## 0.5.0
* Add support for multi-root workspaces (separate LS per root)
* Add support for language server v1.8 features

## 0.4.0
* Add support for language server v1.7 features
* Verify language server launch arguments before constructing server interface

## 0.3.0
* Update package to reflect full release of language server

## 0.2.5
* Update README to reflect Modern Fortran extension support

## 0.2.4
* Fix support for free form files with Modern Fortran extension

## 0.2.3
* Fix package publishing errors

## 0.2.1
* Add support for additional language scopes, fixes [#3](https://github.com/hansec/vscode-fortran-ls/issues/3)
* Bump recommended minimum language server version to 0.9.2

## 0.2.0
* Use signatureHelp by default
* Bump recommended minimum language server version to 0.8.1

## 0.1.3
* Add support for variable_hover language server option
* Bump recommended minimum language server version to 0.7.1

## 0.1.2
* Add support for signatureHelp requests
* Bump recommended minimum language server version to 0.7.0

## 0.1.1
* Add automatic language server version check when package loads

## 0.1.0
* Use incremental sync by default
* Do not filter autocomplete suggestions by default
* Add support for setting intrinsic case
* Bump recommended language server version to 0.6.0
* Remove shell-env dependency

## 0.0.5
* Add support for disabling language server prefix filtering
* Bump recommended language server version to 0.4.0

## 0.0.4
* Add support for configuration options (Hide outdated warning, Hide type member symbols, Incremental sync)

## 0.0.2
* Fix typo in default language server path

## 0.0.1 - First Release
* Initial release
