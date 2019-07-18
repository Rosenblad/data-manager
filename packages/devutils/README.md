# @data-manager/devutils

__Warning:__ This package will modify your file system, use at own risk.

## Install

`npm i @data-manager/devutils`

## Usage

`npx dm-watcher <dir> <cleaningScript>`

## Example

In `package.json`

```json
{
  "scripts": {
    "clean": "rm -rf lib ./*.tgz"
  }
}
```

`npx dm-watcher src clean`
