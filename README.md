# Fortran IntelliSense package
[![vs marketplace](https://img.shields.io/vscode-marketplace/v/hansec.fortran-ls.svg?label=vs%20marketplace)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![downloads](https://img.shields.io/vscode-marketplace/d/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![rating](https://img.shields.io/vscode-marketplace/r/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)

Fortran IntelliSense support for VSCODE, powered by the [Fortran Language Server](https://github.com/hansec/fortran-language-server).

![Autocomplete in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/autocomplete.png)

![Hover definition in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/hover_def.png)

![Peek definition in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/peek_def.png)

## Beta release

This package and its [language server](https://github.com/hansec/fortran-language-server) are in early
release states. Be sure to periodically update the underlying language server to stay up to date with
new features and fixes.

## Requirements
This package requires the following packages to be installed:
 * [fortran](https://marketplace.visualstudio.com/items?itemName=Gimly81.fortran)

Additionally, you must have [Python](https://www.python.org/) and the
[Fortran Language Server](https://github.com/hansec/fortran-language-server) installed
on your system.

This package has been tested and *should* work on :apple: macOS (OS X), :penguin: Linux and Windows.

## Features

* [Completion](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_autocomplete.gif)
* [Signature help (fortls v0.7.0+)](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_sigHelp.gif)
* Document outline
* [Go to definition](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_gotodef.gif)
* [Hover](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_hover.gif)
* [Find references](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_refs.png)
* Diagnostics
  - Multiple use of the same variable name
  - Unknown module in USE statement
  - Variable masking definition from parent scope

See [Fortran Language Server](https://github.com/hansec/fortran-language-server) for examples and more details. There is also a [companion package](https://atom.io/packages/ide-fortran) for [the Atom text editor](https://atom.io/).

## Configuration

**Note:** When setting an explicit language server executable path on Windows backslashes must be escaped (ex. `C:\\path\\to\\fortls.exe`).

See the [fortran-language-server README](https://github.com/hansec/fortran-language-server/blob/master/README.rst) for
information on project specific configuration settings.

## Bug reports
Note that most bugs observed with this package are actually related to the upstream
[fortran-language-server](https://github.com/hansec/fortran-language-server). Unless you believe the error
you observe is directly related to Visual Studio Code please submit issues to the
[upstream repo](https://github.com/hansec/fortran-language-server/issues/new). When filing bugs please
provide example code to reproduce the observed issue if possible.

## License
MIT License. See [the license](LICENSE.md) for more details.

## Support

If you *really* like [Fortran IntelliSense](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls) or the underlying [language server](https://github.com/hansec/fortran-language-server) you can <a href='https://paypal.me/hansec' target="_blank">buy me a :coffee: or a :beer:</a> to say thanks.
