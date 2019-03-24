# Fortran IntelliSense package
[![vs marketplace](https://img.shields.io/vscode-marketplace/v/hansec.fortran-ls.svg?label=vs%20marketplace)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![downloads](https://img.shields.io/vscode-marketplace/d/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)
[![rating](https://img.shields.io/vscode-marketplace/r/hansec.fortran-ls.svg)](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-ls)

Fortran IntelliSense (IDE functionality) support for VSCode, powered by the [Fortran Language Server](https://github.com/hansec/fortran-language-server).

## Features

* Document outline
* [Completion](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_autocomplete.gif)
* [Signature help](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_sigHelp.gif)
* [GoTo/Peek definition](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_gotodef.gif)
* GoTo implementation
* [Hover](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_hover.gif)
* [Find/Peek references](https://raw.githubusercontent.com/hansec/fortran-language-server/master/images/fortls_refs.png)
* Project-wide symbol search
* Symbol renaming
* Documentation parsing ([Doxygen](http://www.doxygen.org/) and [FORD](https://github.com/Fortran-FOSS-Programmers/ford) styles)
* Diagnostics
  - Multiple definitions with the same variable name
  - Variable definition masks definition from parent scope
  - Missing subroutine/function arguments
  - Unknown user-defined type used in "TYPE"/"CLASS" definition (only if visible in project)
  - Unclosed blocks/scopes
  - Invalid scope nesting
  - Unknown modules in "USE" statement
  - Unimplemented deferred type-bound procedures
  - Use of unimported variables/objects in interface blocks
  - Statement placement errors ("CONTAINS", "IMPLICIT", "IMPORT")
* Code actions [Experimental, must be enabled in settings]
  - Generate type-bound procedures and implementation templates for deferred procedures

See [Fortran Language Server](https://github.com/hansec/fortran-language-server) for examples and more details. There is also a [companion package](https://atom.io/packages/ide-fortran) for [the Atom text editor](https://atom.io/).

**Examples:**

![Autocomplete in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/autocomplete.png)

![Hover definition in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/hover_def.png)

![Peek definition in Fortran IntelliSense](https://raw.githubusercontent.com/hansec/vscode-fortran-ls/master/images/peek_def.png)

## Requirements
This package requires the following extensions to be installed:
 * [Modern Fortran](https://marketplace.visualstudio.com/items?itemName=krvajalm.linter-gfortran) or [fortran](https://marketplace.visualstudio.com/items?itemName=Gimly81.fortran)

Additionally, you must have [Python](https://www.python.org/) and the
[Fortran Language Server](https://github.com/hansec/fortran-language-server) installed
on your system. Be sure to periodically update the underlying language server to stay up to date with
new features and fixes.

This package has been tested and *should* work on :apple: macOS (OS X), :penguin: Linux and Windows.

## Configuration

**Note:** When setting an explicit language server executable path on Windows backslashes must be escaped (ex. `C:\\path\\to\\fortls.exe`).

Due to Fortran's syntax it is recommended that you disable the `Enter` key for suggestion confirmation.
This can be done selectively in fortran files by adding the snippet below to your
[settings.json file](https://code.visualstudio.com/docs/getstarted/settings).

    "[fortran]": {
        "editor.acceptSuggestionOnEnter": "off"
    },
    "[fortran_fixed-form]": {
        "editor.acceptSuggestionOnEnter": "off"
    },
    "[FortranFreeForm]": {
        "editor.acceptSuggestionOnEnter": "off"
    }

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
