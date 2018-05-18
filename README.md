# FORTRAN IntelliSense package
[![vs marketplace](https://img.shields.io/vscode-marketplace/v/hansec.fortran-ls.svg?label=vs%20marketplace)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![downloads](https://img.shields.io/vscode-marketplace/d/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![rating](https://img.shields.io/vscode-marketplace/r/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)

FORTRAN IntelliSense support for VSCODE, powered by the [FORTRAN Language Server](https://github.com/hansec/fortran-language-server).

![Autocomplete in FORTRAN IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/autocomplete.png)

![Hover definition in FORTRAN IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/hover_def.png)

## Beta release

This package and its [language server](https://github.com/hansec/fortran-language-server) are in early
release states. Be sure to periodically update the underlying language server to stay up to date with
new features and fixes.

## Requirements
This package requires the following packages to be installed:
 * [fortran](https://marketplace.visualstudio.com/items?itemName=Gimly81.fortran)

Additionally, you must have [Python](https://www.python.org/) and the
[FORTRAN Language Server](https://github.com/hansec/fortran-language-server) installed
on your system.

This package has been tested and *should* work on :apple: macOS (OS X), :penguin: Linux and Windows.

## Features

* Auto completion
* Go to definition
* Hover
* Diagnostics (fortls v0.3.0+)

See [FORTRAN Language Server](https://github.com/hansec/fortran-language-server) for examples and more details.

## Configuration

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

If you *really* like [FORTRAN IntelliSense](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls) or the underlying [language server](https://github.com/hansec/fortran-language-server) you can <a href='https://paypal.me/hansec' target="_blank">buy me a :coffee: or a :beer:</a> to say thanks.
