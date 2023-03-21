[![Build Status](https://img.shields.io/github/actions/workflow/status/GMOD/jbrowse-components/push.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/GMOD/jbrowse-components/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/GMOD/jbrowse-components/main.svg?logo=codecov&style=for-the-badge)](https://codecov.io/gh/GMOD/jbrowse-components/branch/main)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZT5Db250cmlidXRvciBDb3ZlbmFudCBMb2dvPC90aXRsZT48ZyBpZD0iQ2FudmFzIj48ZyBpZD0iR3JvdXAiPjxnIGlkPSJTdWJ0cmFjdCI+PHVzZSB4bGluazpocmVmPSIjcGF0aDBfZmlsbCIgZmlsbD0iIzVFMEQ3MyIvPjwvZz48ZyBpZD0iU3VidHJhY3QiPjx1c2UgeGxpbms6aHJlZj0iI3BhdGgxX2ZpbGwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU4IDI0KSIgZmlsbD0iIzVFMEQ3MyIvPjwvZz48L2c+PC9nPjxkZWZzPjxwYXRoIGlkPSJwYXRoMF9maWxsIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gMTgyLjc4NyAxMi4yODQ2QyAxNzMuMDA1IDkuNDk0MDggMTYyLjY3NyA4IDE1MiA4QyA5MC4xNDQxIDggNDAgNTguMTQ0MSA0MCAxMjBDIDQwIDE4MS44NTYgOTAuMTQ0MSAyMzIgMTUyIDIzMkMgMTg4LjQ2NCAyMzIgMjIwLjg1NyAyMTQuNTc1IDI0MS4zMDggMTg3LjU5OEMgMjE5Ljg3IDIyOC4yNzIgMTc3LjE3MyAyNTYgMTI4IDI1NkMgNTcuMzA3NSAyNTYgMCAxOTguNjkyIDAgMTI4QyAwIDU3LjMwNzUgNTcuMzA3NSAwIDEyOCAwQyAxNDcuNjA0IDAgMTY2LjE3OSA0LjQwNzA5IDE4Mi43ODcgMTIuMjg0NloiLz48cGF0aCBpZD0icGF0aDFfZmlsbCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNIDEzNy4wOSA5LjIxMzQyQyAxMjkuNzU0IDcuMTIwNTYgMTIyLjAwOCA2IDExNCA2QyA2Ny42MDgxIDYgMzAgNDMuNjA4MSAzMCA5MEMgMzAgMTM2LjM5MiA2Ny42MDgxIDE3NCAxMTQgMTc0QyAxNDEuMzQ4IDE3NCAxNjUuNjQzIDE2MC45MzEgMTgwLjk4MSAxNDAuNjk4QyAxNjQuOTAzIDE3MS4yMDQgMTMyLjg4IDE5MiA5NiAxOTJDIDQyLjk4MDcgMTkyIDAgMTQ5LjAxOSAwIDk2QyAwIDQyLjk4MDcgNDIuOTgwNyAwIDk2IDBDIDExMC43MDMgMCAxMjQuNjM0IDMuMzA1MzEgMTM3LjA5IDkuMjEzNDJaIi8+PC9kZWZzPjwvc3ZnPg==)](CODE_OF_CONDUCT.md)

# jbrowse-components

Monorepo using Lerna and Yarn workspaces containing many related packages for
next-generation JBrowse development.

Homepage https://jbrowse.org/jb2

Docs http://jbrowse.org/jb2/docs/

## Pre-requisites

- [git](https://git-scm.com/downloads)
- [nodejs](https://nodejs.org/en/download/) (node 14 or greater)
- [yarn](https://yarnpkg.com/en/docs/install)

You may need additional pre-requisites on certain versions of nodejs.

On macOS with homebrew:

    brew install pkg-config cairo pango libpng jpeg giflib librsvg

On Ubuntu, with apt:

    sudo apt install -y python make gcc libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

## Install (Linux/Mac)

Simply clone the git repo and run yarn in the root repository

```sh
git clone https://github.com/GMOD/jbrowse-components.git
cd jbrowse-components
yarn
```

## Install (Windows)

```pwsh
# Make sure you check out line-endings as-is by running
# `git config --global core.autocrlf false`
# Also, make sure symlinks are enabled by running
# `git config --global core.symlinks true`.
# You may also need to clone as an administrator for symlinks to work.
git clone -c core.symlinks=true https://github.com/GMOD/jbrowse-components.git
cd .\jbrowse-components\
yarn
```

## Quick start for developers

You can use these commands to help get started with your development environment

For running jbrowse-web

```sh
cd products/jbrowse-web
yarn start
```

For jbrowse-desktop, launch two tabs

```sh
# starts webpack dev server
cd products/jbrowse-desktop
yarn start

# starts electron window
cd products/jbrowse-desktop
yarn electron
```

For running e.g. jbrowse-react-linear-genome-view you can use storybook

```sh
cd products/jbrowse-react-linear-genome-view
yarn storybook
```

See CONTRIBUTING.md for more info

If you are installing JBrowse on your server, check out our quick start guides
here https://jbrowse.org/jb2/docs/

```
packages
├── core
│   ├── assemblyManager
│   │   ├── assemblyConfigSchema.ts
│   │   ├── assemblyManager.ts
│   │   ├── assembly.ts
│   │   └── index.ts
│   ├── BaseFeatureWidget
│   │   ├── BaseFeatureDetail.tsx
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   ├── SequenceFeatureDetails.test.js
│   │   ├── SequenceFeatureDetails.tsx
│   │   ├── test_data
│   │   │   ├── DLGAP3_dna.fa
│   │   │   ├── DLGAP3.json
│   │   │   ├── DLGAP3_pep.fa
│   │   │   ├── NCDN_dna.fa
│   │   │   ├── NCDN.json
│   │   │   ├── NCDN_upstream_dna.fa
│   │   │   └── volvox.fa
│   │   ├── types.tsx
│   │   └── util.tsx
│   ├── configuration
│   │   ├── configurationSchema.test.ts
│   │   ├── configurationSchema.ts
│   │   ├── configurationSlot.test.ts
│   │   ├── configurationSlot.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   ├── util.test.ts
│   │   └── util.ts
│   ├── CorePlugin.ts
│   ├── data_adapters
│   │   ├── BaseAdapter.test.ts
│   │   ├── BaseAdapter.ts
│   │   ├── CytobandAdapter.ts
│   │   └── dataAdapterCache.ts
│   ├── declare.d.ts
│   ├── docs
│   │   ├── connections.md
│   │   └── README.md
│   ├── package.json
│   ├── pluggableElementTypes
│   │   ├── AdapterType.ts
│   │   ├── AddTrackWorkflowType.ts
│   │   ├── ConnectionType.ts
│   │   ├── DisplayType.ts
│   │   ├── index.ts
│   │   ├── InternetAccountType.ts
│   │   ├── models
│   │   │   ├── baseConnectionConfig.ts
│   │   │   ├── BaseConnectionModelFactory.js
│   │   │   ├── BaseDisplayModel.tsx
│   │   │   ├── baseInternetAccountConfig.ts
│   │   │   ├── baseTrackConfig.ts
│   │   │   ├── BaseTrackModel.ts
│   │   │   ├── BaseViewModel.ts
│   │   │   ├── index.ts
│   │   │   └── InternetAccountModel.ts
│   │   ├── PluggableElementBase.ts
│   │   ├── renderers
│   │   │   ├── BoxRendererType.ts
│   │   │   ├── CircularChordRendererType.ts
│   │   │   ├── ComparativeServerSideRendererType.ts
│   │   │   ├── declare.d.ts
│   │   │   ├── FeatureRendererType.ts
│   │   │   ├── index.ts
│   │   │   ├── README.md
│   │   │   ├── RendererType.ts
│   │   │   ├── ServerSideRenderedContent.tsx
│   │   │   ├── ServerSideRendererType.tsx
│   │   │   └── util
│   │   │       ├── serializableFilterChain.test.ts
│   │   │       └── serializableFilterChain.ts
│   │   ├── RpcMethodType.test.ts
│   │   ├── RpcMethodType.ts
│   │   ├── TextSearchAdapterType.ts
│   │   ├── TrackType.ts
│   │   ├── ViewType.ts
│   │   └── WidgetType.ts
│   ├── PluginLoader.ts
│   ├── PluginManager.ts
│   ├── Plugin.ts
│   ├── README.md
│   ├── ReExports
│   │   ├── Attributes.tsx
│   │   ├── BaseCard.tsx
│   │   ├── DataGrid.tsx
│   │   ├── FeatureDetails.tsx
│   │   ├── index.ts
│   │   ├── list.ts
│   │   ├── material-ui-colors.js
│   │   └── modules.tsx
│   ├── rpc
│   │   ├── BaseRpcDriver.test.ts
│   │   ├── BaseRpcDriver.ts
│   │   ├── configSchema.ts
│   │   ├── coreRpcMethods.ts
│   │   ├── declaration.d.ts
│   │   ├── MainThreadRpcDriver.ts
│   │   ├── remoteAbortSignals.ts
│   │   ├── RpcManager.ts
│   │   └── WebWorkerRpcDriver.ts
│   ├── TextSearch
│   │   ├── BaseResults.test.ts
│   │   ├── BaseResults.ts
│   │   └── TextSearchManager.ts
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   ├── ui
│   │   ├── AboutDialog.tsx
│   │   ├── App.tsx
│   │   ├── AssemblySelector.tsx
│   │   ├── CascadingMenu.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── colors.ts
│   │   ├── Drawer.tsx
│   │   ├── DrawerWidget.tsx
│   │   ├── DropDownMenu.tsx
│   │   ├── EditableTypography.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── FactoryResetDialog.tsx
│   │   ├── FatalErrorDialog.test.tsx
│   │   ├── FatalErrorDialog.tsx
│   │   ├── FileSelector
│   │   │   ├── FileSelector.tsx
│   │   │   ├── index.ts
│   │   │   ├── LocalFileChooser.tsx
│   │   │   └── UrlChooser.tsx
│   │   ├── Icons.tsx
│   │   ├── index.ts
│   │   ├── Logo.tsx
│   │   ├── Menu.tsx
│   │   ├── PrerenderedCanvas.tsx
│   │   ├── react-colorful.js
│   │   ├── ResizeHandle.tsx
│   │   ├── ReturnToImportFormDialog.tsx
│   │   ├── SanitizedHTML.test.tsx
│   │   ├── SanitizedHTML.tsx
│   │   ├── SnackbarModel.ts
│   │   ├── Snackbar.tsx
│   │   ├── theme.test.ts
│   │   ├── theme.ts
│   │   ├── Tooltip.tsx
│   │   └── ViewContainer.tsx
│   └── util
│       ├── aborting.ts
│       ├── analytics.ts
│       ├── Base1DUtils.ts
│       ├── Base1DViewModel.test.ts
│       ├── Base1DViewModel.ts
│       ├── blockTypes.ts
│       ├── calculateDynamicBlocks.test.ts
│       ├── calculateDynamicBlocks.ts
│       ├── calculateStaticBlocks.test.ts
│       ├── calculateStaticBlocks.ts
│       ├── color
│       │   ├── cssColorsLevel4.ts
│       │   └── index.ts
│       ├── compositeMap.ts
│       ├── declare.d.ts
│       ├── formatFastaStrings.test.js
│       ├── formatFastaStrings.ts
│       ├── idMaker.ts
│       ├── index.test.ts
│       ├── index.ts
│       ├── io
│       │   ├── index.ts
│       │   └── RemoteFileWithRangeCache.ts
│       ├── jexlStrings.test.js
│       ├── jexlStrings.ts
│       ├── jexl.ts
│       ├── layouts
│       │   ├── BaseLayout.ts
│       │   ├── GranularRectLayout.test.js
│       │   ├── GranularRectLayout.ts
│       │   ├── index.ts
│       │   ├── MultiLayout.ts
│       │   ├── PrecomputedLayout.ts
│       │   ├── PrecomputedMultiLayout.js
│       │   └── SceneGraph.ts
│       ├── mst-reflection.js
│       ├── offscreenCanvasPonyfill.tsx
│       ├── offscreenCanvasUtils.tsx
│       ├── QuickLRU.d.ts
│       ├── QuickLRU.js
│       ├── range.test.js
│       ├── range.ts
│       ├── rxjs.ts
│       ├── simpleFeature.test.ts
│       ├── simpleFeature.ts
│       ├── stats.test.ts
│       ├── stats.ts
│       ├── TimeTraveller.ts
│       ├── tracks.ts
│       ├── types
│       │   ├── index.ts
│       │   ├── mst.ts
│       │   └── util.ts
│       └── when.ts
└── text-indexing
    ├── package.json
    ├── src
    │   ├── index.ts
    │   ├── TextIndexing.ts
    │   ├── types
    │   │   ├── common.test.ts
    │   │   ├── common.ts
    │   │   ├── gff3Adapter.ts
    │   │   └── vcfAdapter.ts
    │   └── util.ts
    ├── tsconfig.build.es5.json
    ├── tsconfig.build.esm.json
    └── tsconfig.json

24 directories, 190 files

plugin-development-tools
├── package.json
├── README.md
├── src
│   ├── babelPluginJBrowse.ts
│   ├── createRollupConfig.ts
│   ├── declare.d.ts
│   ├── index.ts
│   └── util.ts
├── tsconfig.json
└── yarn.lock

1 directory, 9 files

plugins
├── alignments
│   ├── package.json
│   ├── src
│   │   ├── AlignmentsFeatureDetail
│   │   │   ├── AlignmentsFeatureDetail.tsx
│   │   │   ├── index.test.js
│   │   │   └── index.ts
│   │   ├── AlignmentsTrack
│   │   │   └── index.ts
│   │   ├── BamAdapter
│   │   │   ├── BamAdapter.test.ts
│   │   │   ├── BamAdapter.ts
│   │   │   ├── BamSlightlyLazyFeature.ts
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── MismatchParser.test.ts
│   │   │   └── MismatchParser.ts
│   │   ├── CramAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── CramAdapter.test.ts
│   │   │   ├── CramAdapter.ts
│   │   │   ├── CramSlightlyLazyFeature.ts
│   │   │   ├── CramTestAdapters.ts
│   │   │   └── index.ts
│   │   ├── declare.d.ts
│   │   ├── HtsgetBamAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── HtsgetBamAdapter.ts
│   │   │   └── index.ts
│   │   ├── index.test.ts
│   │   ├── index.ts
│   │   ├── LinearAlignmentsDisplay
│   │   │   ├── components
│   │   │   │   └── AlignmentsDisplay.tsx
│   │   │   ├── index.ts
│   │   │   └── models
│   │   │       ├── configSchema.test.js
│   │   │       ├── configSchema.ts
│   │   │       └── model.tsx
│   │   ├── LinearPileupDisplay
│   │   │   ├── components
│   │   │   │   ├── ColorByModifications.tsx
│   │   │   │   ├── ColorByTag.tsx
│   │   │   │   ├── FilterByTag.tsx
│   │   │   │   ├── LinearPileupDisplayBlurb.tsx
│   │   │   │   ├── SetFeatureHeight.tsx
│   │   │   │   ├── SetMaxHeight.tsx
│   │   │   │   └── SortByTag.tsx
│   │   │   ├── configSchema.test.js
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   ├── LinearSNPCoverageDisplay
│   │   │   ├── components
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── index.ts
│   │   │   └── models
│   │   │       ├── configSchema.test.js
│   │   │       ├── configSchema.ts
│   │   │       └── model.ts
│   │   ├── NestedFrequencyTable.ts
│   │   ├── PileupRenderer
│   │   │   ├── components
│   │   │   │   ├── PileupRendering.test.js
│   │   │   │   └── PileupRendering.tsx
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── PileupLayoutSession.ts
│   │   │   ├── PileupRenderer.tsx
│   │   │   └── sortUtil.ts
│   │   ├── PileupRPC
│   │   │   └── rpcMethods.ts
│   │   ├── shared.ts
│   │   ├── SNPCoverageAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── SNPCoverageAdapter.ts
│   │   ├── SNPCoverageRenderer
│   │   │   ├── configSchema.js
│   │   │   ├── index.ts
│   │   │   └── SNPCoverageRenderer.ts
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── arc
│   ├── package.json
│   ├── src
│   │   ├── ArcRenderer
│   │   │   ├── ArcRenderer.tsx
│   │   │   ├── ArcRendering.test.tsx
│   │   │   ├── ArcRendering.tsx
│   │   │   ├── configSchema.tsx
│   │   │   └── index.tsx
│   │   ├── declare.d.ts
│   │   ├── index.ts
│   │   └── LinearArcDisplay
│   │       ├── configSchema.tsx
│   │       ├── index.tsx
│   │       └── model.tsx
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── authentication
│   ├── package.json
│   ├── src
│   │   ├── DropboxOAuthModel
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.tsx
│   │   ├── ExternalTokenModel
│   │   │   ├── configSchema.ts
│   │   │   ├── ExternalTokenEntryForm.tsx
│   │   │   ├── index.ts
│   │   │   └── model.tsx
│   │   ├── GoogleDriveOAuthModel
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.tsx
│   │   ├── HTTPBasicModel
│   │   │   ├── configSchema.ts
│   │   │   ├── HTTPBasicLoginForm.tsx
│   │   │   ├── index.ts
│   │   │   └── model.tsx
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── OAuthModel
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       └── model.tsx
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── bed
│   ├── package.json
│   ├── src
│   │   ├── BedAdapter
│   │   │   ├── BedAdapter.test.ts
│   │   │   ├── BedAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── BedTabixAdapter
│   │   │   ├── BedTabixAdapter.test.ts
│   │   │   ├── BedTabixAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── BigBedAdapter
│   │   │   ├── BigBedAdapter.test.ts
│   │   │   ├── BigBedAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── breakpoint-split-view
│   ├── package.json
│   ├── src
│   │   ├── BreakpointAlignmentsFeatureDetail
│   │   │   ├── BreakpointAlignmentsFeatureDetail.tsx
│   │   │   └── index.js
│   │   ├── BreakpointSplitView.ts
│   │   ├── components
│   │   │   ├── AlignmentConnections.tsx
│   │   │   ├── Breakends.tsx
│   │   │   ├── BreakpointSplitView.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Translocations.tsx
│   │   ├── declare.d.ts
│   │   ├── index.ts
│   │   ├── model.ts
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── circular-view
│   ├── package.json
│   ├── README.md
│   ├── src
│   │   ├── BaseChordDisplay
│   │   │   ├── components
│   │   │   │   ├── BaseChordDisplay.tsx
│   │   │   │   ├── DisplayError.js
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── RpcRenderedSvgGroup.js
│   │   │   ├── index.ts
│   │   │   └── models
│   │   │       ├── baseChordDisplayConfig.ts
│   │   │       ├── BaseChordDisplayModel.ts
│   │   │       └── renderReaction.js
│   │   ├── CircularView
│   │   │   ├── components
│   │   │   │   ├── CircularView.js
│   │   │   │   ├── ImportForm.tsx
│   │   │   │   └── Ruler.js
│   │   │   └── models
│   │   │       ├── CircularView.ts
│   │   │       ├── slices.test.js
│   │   │       ├── slices.ts
│   │   │       ├── viewportVisibleRegion.test.js
│   │   │       └── viewportVisibleRegion.ts
│   │   └── index.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── comparative-adapters
│   ├── package.json
│   ├── src
│   │   ├── ChainAdapter
│   │   │   ├── ChainAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── DeltaAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── DeltaAdapter.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── MashMapAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── MashMapAdapter.ts
│   │   ├── MCScanAnchorsAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── MCScanAnchorsAdapter.test.ts
│   │   │   └── MCScanAnchorsAdapter.ts
│   │   ├── MCScanSimpleAnchorsAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── MCScanSimpleAnchorsAdapter.ts
│   │   ├── PAFAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── PAFAdapter.test.ts
│   │   │   └── PAFAdapter.ts
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── config
│   ├── package.json
│   ├── src
│   │   ├── ConfigurationEditorWidget
│   │   │   ├── components
│   │   │   │   ├── CallbackEditor.tsx
│   │   │   │   ├── ColorEditor.test.tsx
│   │   │   │   ├── ColorEditor.tsx
│   │   │   │   ├── ConfigurationEditor.test.tsx
│   │   │   │   ├── ConfigurationEditor.tsx
│   │   │   │   ├── JsonEditor.tsx
│   │   │   │   ├── SlotEditor.tsx
│   │   │   │   ├── StringArrayEditor.tsx
│   │   │   │   └── TypeSelector.tsx
│   │   │   ├── index.tsx
│   │   │   └── model.ts
│   │   ├── FromConfigAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── FromConfigAdapter.test.ts
│   │   │   ├── FromConfigAdapter.ts
│   │   │   ├── FromConfigRegionsAdapter.test.ts
│   │   │   ├── FromConfigRegionsAdapter.ts
│   │   │   ├── FromConfigSequenceAdapter.test.ts
│   │   │   ├── FromConfigSequenceAdapter.ts
│   │   │   └── index.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── RefNameAliasAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── RefNameAliasAdapter.test.ts
│   │       └── RefNameAliasAdapter.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── data-management
│   ├── package.json
│   ├── scripts
│   │   └── getUcscAssemblies.js
│   ├── src
│   │   ├── AddConnectionWidget
│   │   │   ├── components
│   │   │   │   ├── AddConnectionWidget.js
│   │   │   │   ├── AddConnectionWidget.test.js
│   │   │   │   ├── ConfigureConnection.js
│   │   │   │   └── ConnectionTypeSelect.tsx
│   │   │   ├── index.js
│   │   │   └── model.js
│   │   ├── AddTrackWidget
│   │   │   ├── components
│   │   │   │   ├── AddTrackWidget.test.tsx
│   │   │   │   ├── AddTrackWidget.tsx
│   │   │   │   ├── ConfirmTrack.tsx
│   │   │   │   ├── DefaultAddTrackWorkflow.tsx
│   │   │   │   └── TrackSourceSelect.tsx
│   │   │   ├── index.js
│   │   │   ├── index.test.jsx
│   │   │   └── model.ts
│   │   ├── AssemblyManager
│   │   │   ├── AssemblyAddForm.tsx
│   │   │   ├── AssemblyEditor.tsx
│   │   │   ├── AssemblyManager.test.tsx
│   │   │   ├── AssemblyManager.tsx
│   │   │   ├── AssemblyTable.tsx
│   │   │   └── index.ts
│   │   ├── HierarchicalTrackSelectorWidget
│   │   │   ├── components
│   │   │   │   ├── CloseConnectionDialog.tsx
│   │   │   │   ├── DeleteConnectionDialog.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── HierarchicalTrackSelector.test.tsx
│   │   │   │   ├── HierarchicalTrackSelector.tsx
│   │   │   │   ├── ManageConnectionsDialog.tsx
│   │   │   │   ├── Node.tsx
│   │   │   │   ├── ToggleConnectionsDialog.tsx
│   │   │   │   └── util.ts
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── model.test.js
│   │   │   └── model.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   ├── PluginStoreWidget
│   │   │   ├── components
│   │   │   │   ├── CustomPluginForm.tsx
│   │   │   │   ├── InstalledPluginsList.tsx
│   │   │   │   ├── InstalledPlugin.tsx
│   │   │   │   ├── PluginCard.tsx
│   │   │   │   ├── PluginStoreWidget.test.js
│   │   │   │   └── PluginStoreWidget.tsx
│   │   │   ├── index.js
│   │   │   ├── model.test.js
│   │   │   └── model.ts
│   │   ├── SetDefaultSession
│   │   │   ├── index.ts
│   │   │   ├── SetDefaultSession.test.tsx
│   │   │   └── SetDefaultSession.tsx
│   │   └── ucsc-trackhub
│   │       ├── configSchema.js
│   │       ├── index.js
│   │       ├── model.js
│   │       ├── ucscAssemblies.js
│   │       └── ucscTrackHub.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── dotplot-view
│   ├── package.json
│   ├── src
│   │   ├── declare.d.ts
│   │   ├── DotplotDisplay
│   │   │   ├── components
│   │   │   │   └── DotplotDisplay.tsx
│   │   │   ├── index.ts
│   │   │   ├── renderDotplotBlock.ts
│   │   │   └── stateModelFactory.ts
│   │   ├── DotplotReadVsRef.ts
│   │   ├── DotplotRenderer
│   │   │   ├── ComparativeRenderRpc.ts
│   │   │   ├── components
│   │   │   │   └── DotplotRendering.tsx
│   │   │   ├── configSchema.ts
│   │   │   ├── DotplotRenderer.ts
│   │   │   └── index.ts
│   │   ├── DotplotView
│   │   │   ├── blockTypes.ts
│   │   │   ├── components
│   │   │   │   ├── Axes.tsx
│   │   │   │   ├── CursorIcon.tsx
│   │   │   │   ├── DotplotView.tsx
│   │   │   │   ├── Grid.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── ImportForm.tsx
│   │   │   │   ├── util.ts
│   │   │   │   └── WarningDialog.tsx
│   │   │   ├── index.ts
│   │   │   ├── model.test.ts
│   │   │   └── model.ts
│   │   ├── extensionPoints.ts
│   │   ├── index.ts
│   │   ├── LaunchDotplotView.ts
│   │   ├── ServerSideRenderedBlockContent.tsx
│   │   ├── ServerSideSyntenyRendering.js
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── gff3
│   ├── package.json
│   ├── src
│   │   ├── Gff3Adapter
│   │   │   ├── configSchema.ts
│   │   │   ├── Gff3Adapter.test.ts
│   │   │   ├── Gff3Adapter.ts
│   │   │   └── index.ts
│   │   ├── Gff3TabixAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── Gff3TabixAdapter.test.ts
│   │   │   ├── Gff3TabixAdapter.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── grid-bookmark
│   ├── package.json
│   ├── src
│   │   ├── GridBookmarkWidget
│   │   │   ├── components
│   │   │   │   ├── AssemblySelector.tsx
│   │   │   │   ├── ClearBookmarks.tsx
│   │   │   │   ├── DeleteBookmark.tsx
│   │   │   │   ├── DownloadBookmarks.tsx
│   │   │   │   ├── GridBookmarkWidget.test.js
│   │   │   │   ├── GridBookmarkWidget.tsx
│   │   │   │   └── ImportBookmarks.tsx
│   │   │   ├── index.js
│   │   │   ├── model.ts
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   ├── index.test.js
│   │   └── index.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── gtf
│   ├── package.json
│   ├── src
│   │   ├── declare.d.ts
│   │   ├── GtfAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── GtfAdapter.test.ts
│   │   │   ├── GtfAdapter.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── hic
│   ├── package.json
│   ├── src
│   │   ├── declare.d.ts
│   │   ├── HicAdapter
│   │   │   ├── configSchema.ts
│   │   │   └── HicAdapter.ts
│   │   ├── HicRenderer
│   │   │   ├── components
│   │   │   │   ├── HicRendering.test.js
│   │   │   │   └── HicRendering.tsx
│   │   │   ├── configSchema.ts
│   │   │   ├── HicRenderer.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── LinearHicDisplay
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       └── model.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── jobs-management
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── JobsListWidget
│   │       ├── components
│   │       │   ├── CurrentJobCard.tsx
│   │       │   ├── JobCard.tsx
│   │       │   └── JobsListWidget.tsx
│   │       ├── index.js
│   │       └── model.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── legacy-jbrowse
│   ├── package.json
│   ├── src
│   │   ├── declare.d.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   ├── JBrowse1Connection
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── jb1ConfigLoad.ts
│   │   │   ├── jb1ConfigParse.ts
│   │   │   ├── jb1ToJb2.ts
│   │   │   ├── model.js
│   │   │   ├── types.ts
│   │   │   └── util.ts
│   │   ├── JBrowse1TextSeachAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── HttpMap.test.ts
│   │   │   ├── HttpMap.ts
│   │   │   ├── index.ts
│   │   │   ├── JBrowse1TextSearchAdapter.test.ts
│   │   │   └── JBrowse1TextSearchAdapter.ts
│   │   └── NCListAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── NCListAdapter.test.ts
│   │       ├── NCListAdapter.ts
│   │       └── NCListFeature.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── linear-comparative-view
│   ├── package.json
│   ├── src
│   │   ├── BlockError.js
│   │   ├── declare.d.ts
│   │   ├── index.tsx
│   │   ├── LaunchLinearSyntenyView.ts
│   │   ├── LinearComparativeDisplay
│   │   │   ├── components
│   │   │   │   └── LinearComparativeDisplay.tsx
│   │   │   └── index.ts
│   │   ├── LinearComparativeView
│   │   │   ├── components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── LinearComparativeView.tsx
│   │   │   │   └── RubberBand.tsx
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   ├── LinearSyntenyDisplay
│   │   │   ├── index.test.ts
│   │   │   └── index.ts
│   │   ├── LinearSyntenyRenderer
│   │   │   ├── components
│   │   │   │   ├── LinearSyntenyRendering.tsx
│   │   │   │   └── SyntenyTooltip.tsx
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── LinearSyntenyRenderer.ts
│   │   ├── LinearSyntenyView
│   │   │   ├── components
│   │   │   │   ├── Icons.tsx
│   │   │   │   ├── ImportForm.tsx
│   │   │   │   └── LinearSyntenyView.tsx
│   │   │   ├── index.ts
│   │   │   ├── model.test.ts
│   │   │   └── model.ts
│   │   ├── ReadVsRef.tsx
│   │   ├── ServerSideRenderedBlockContent.tsx
│   │   ├── ServerSideRenderedContent.js
│   │   ├── SyntenyFeatureDetail
│   │   │   ├── index.ts
│   │   │   └── SyntenyFeatureDetail.tsx
│   │   ├── SyntenyTrack
│   │   │   └── index.tsx
│   │   └── util.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── linear-genome-view
│   ├── package.json
│   ├── src
│   │   ├── BaseLinearDisplay
│   │   │   ├── components
│   │   │   │   ├── BaseLinearDisplay.tsx
│   │   │   │   ├── Block.tsx
│   │   │   │   ├── LinearBlocks.tsx
│   │   │   │   ├── ServerSideRenderedBlockContent.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── index.ts
│   │   │   └── models
│   │   │       ├── baseLinearDisplayConfigSchema.ts
│   │   │       ├── BaseLinearDisplayModel.tsx
│   │   │       └── serverSideRenderedBlock.ts
│   │   ├── index.ts
│   │   ├── LinearBareDisplay
│   │   │   ├── configSchema.ts
│   │   │   ├── index.test.js
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   ├── LinearBasicDisplay
│   │   │   ├── components
│   │   │   │   └── SetMaxHeight.tsx
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   └── LinearGenomeView
│   │       ├── components
│   │       │   ├── CenterLine.tsx
│   │       │   ├── ExportSvgDialog.tsx
│   │       │   ├── GetSequenceDialog.tsx
│   │       │   ├── Gridlines.tsx
│   │       │   ├── Header.tsx
│   │       │   ├── HelpDialog.tsx
│   │       │   ├── ImportForm.tsx
│   │       │   ├── LinearGenomeViewSvg.tsx
│   │       │   ├── LinearGenomeView.test.js
│   │       │   ├── LinearGenomeView.tsx
│   │       │   ├── MiniControls.tsx
│   │       │   ├── OverviewRubberBand.tsx
│   │       │   ├── OverviewScaleBar.tsx
│   │       │   ├── RefNameAutocomplete.tsx
│   │       │   ├── RubberBand.tsx
│   │       │   ├── Ruler.tsx
│   │       │   ├── ScaleBar.test.tsx
│   │       │   ├── ScaleBar.tsx
│   │       │   ├── SearchBox.tsx
│   │       │   ├── SearchResultsDialog.tsx
│   │       │   ├── SequenceSearchDialog.tsx
│   │       │   ├── TrackContainer.tsx
│   │       │   ├── TrackLabel.tsx
│   │       │   ├── TracksContainer.tsx
│   │       │   ├── util.ts
│   │       │   └── ZoomControls.tsx
│   │       ├── hg38DisplayedRegions.json
│   │       ├── index.test.ts
│   │       ├── index.tsx
│   │       ├── README.md
│   │       ├── util.test.ts
│   │       ├── util.ts
│   │       └── volvoxDisplayedRegions.json
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── lollipop
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   ├── LinearLollipopDisplay
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   └── LollipopRenderer
│   │       ├── components
│   │       │   ├── Lollipop.js
│   │       │   ├── LollipopRendering.js
│   │       │   ├── LollipopRendering.test.js
│   │       │   └── Stick.js
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── Layout.ts
│   │       └── LollipopRenderer.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── menus
│   ├── package.json
│   ├── src
│   │   ├── AboutWidget
│   │   │   ├── components
│   │   │   │   ├── AboutWidget.test.js
│   │   │   │   └── AboutWidget.tsx
│   │   │   └── index.ts
│   │   ├── HelpWidget
│   │   │   ├── components
│   │   │   │   ├── HelpWidget.test.js
│   │   │   │   └── HelpWidget.tsx
│   │   │   └── index.ts
│   │   ├── ImportSessionWidget
│   │   │   ├── components
│   │   │   │   └── ImportSessionWidget.tsx
│   │   │   └── index.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── SessionManager
│   │       ├── components
│   │       │   ├── SessionManager.test.js
│   │       │   └── SessionManager.tsx
│   │       └── index.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── protein
│   ├── package.json
│   ├── src
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── ProteinReferenceSequenceRenderer
│   │       ├── aminoAcids.js
│   │       ├── components
│   │       │   └── Rendering.js
│   │       ├── configSchema.js
│   │       ├── index.js
│   │       ├── nucleotides.js
│   │       ├── README.md
│   │       └── util.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── rdf
│   ├── package.json
│   ├── src
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── SPARQLAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── README.md
│   │       ├── SPARQLAdapter.test.ts
│   │       └── SPARQLAdapter.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── sequence
│   ├── package.json
│   ├── src
│   │   ├── BgzipFastaAdapter
│   │   │   ├── BgzipFastaAdapter.test.ts
│   │   │   ├── BgzipFastaAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── ChromSizesAdapter
│   │   │   ├── ChromSizesAdapter.test.ts
│   │   │   ├── ChromSizesAdapter.ts
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── createExtensionPoints.ts
│   │   ├── DivSequenceRenderer
│   │   │   ├── components
│   │   │   │   ├── DivSequenceRendering.test.js
│   │   │   │   └── DivSequenceRendering.tsx
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── GCContentAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── GCContentAdapter.ts
│   │   │   └── index.ts
│   │   ├── IndexedFastaAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── IndexedFastaAdapter.test.ts
│   │   │   ├── IndexedFastaAdapter.ts
│   │   │   └── index.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   ├── LinearReferenceSequenceDisplay
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   ├── ReferenceSequenceTrack
│   │   │   ├── configSchema.ts
│   │   │   └── index.ts
│   │   ├── SequenceSearchAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── SequenceSearchAdapter.ts
│   │   └── TwoBitAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── TwoBitAdapter.test.ts
│   │       └── TwoBitAdapter.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── spreadsheet-view
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── SpreadsheetView
│   │       ├── components
│   │       │   ├── ColumnFilterControls.js
│   │       │   ├── ColumnMenu.js
│   │       │   ├── GlobalFilterControls.js
│   │       │   ├── ImportWizard.js
│   │       │   ├── RowMenu.tsx
│   │       │   ├── Spreadsheet.test.js
│   │       │   ├── Spreadsheet.tsx
│   │       │   └── SpreadsheetView.tsx
│   │       ├── importAdapters
│   │       │   ├── BedImport.test.ts
│   │       │   ├── BedImport.ts
│   │       │   ├── ImportUtils.test.ts
│   │       │   ├── ImportUtils.ts
│   │       │   ├── STARFusionImport.test.ts
│   │       │   ├── STARFusionImport.ts
│   │       │   ├── VcfImport.test.ts
│   │       │   └── VcfImport.ts
│   │       └── models
│   │           ├── ColumnDataTypes
│   │           │   ├── index.ts
│   │           │   ├── LocEnd.js
│   │           │   ├── LocRef.js
│   │           │   ├── LocStart.js
│   │           │   ├── LocString.js
│   │           │   ├── MakeSpreadsheetColumnType.js
│   │           │   ├── Number.js
│   │           │   └── Text.js
│   │           ├── FilterControls.ts
│   │           ├── ImportWizard.ts
│   │           ├── Row.ts
│   │           ├── Spreadsheet.ts
│   │           ├── SpreadsheetView.test.ts
│   │           ├── SpreadsheetView.ts
│   │           └── StaticRowSet.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── svg
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── SvgFeatureRenderer
│   │       ├── components
│   │       │   ├── Arrow.tsx
│   │       │   ├── Box.tsx
│   │       │   ├── FeatureGlyph.tsx
│   │       │   ├── FeatureLabel.tsx
│   │       │   ├── ProcessedTranscript.tsx
│   │       │   ├── Segments.tsx
│   │       │   ├── Subfeatures.tsx
│   │       │   ├── SvgFeatureRendering.test.tsx
│   │       │   ├── SvgFeatureRendering.tsx
│   │       │   ├── SvgOverlay.tsx
│   │       │   └── util.ts
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       └── README.md
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── sv-inspector
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── SvInspectorView
│   │       ├── components
│   │       │   └── SvInspectorView.js
│   │       ├── models
│   │       │   ├── adhocFeatureUtils.js
│   │       │   ├── breakpointSplitViewFromTableRow.js
│   │       │   └── SvInspectorView.ts
│   │       └── SvInspectorViewType.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── text-indexing
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── TextIndexRpcMethod
│   │       └── TextIndexRpcMethod.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── trackhub-registry
│   ├── package.json
│   ├── src
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   └── trackhub-registry
│   │       ├── configSchema.js
│   │       ├── HubDetails.js
│   │       ├── index.js
│   │       ├── model.js
│   │       ├── SelectBox.js
│   │       ├── TrackHubRegistrySelect.js
│   │       └── tracks.js
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── trix
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   └── TrixTextSearchAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── TrixTextSearchAdapter.test.ts
│   │       └── TrixTextSearchAdapter.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
├── variants
│   ├── package.json
│   ├── src
│   │   ├── ChordVariantDisplay
│   │   │   ├── index.ts
│   │   │   └── models
│   │   │       └── ChordVariantDisplay.js
│   │   ├── extensionPoints.ts
│   │   ├── index.test.js
│   │   ├── index.ts
│   │   ├── LinearVariantDisplay
│   │   │   ├── configSchema.test.js
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   └── model.ts
│   │   ├── StructuralVariantChordRenderer
│   │   │   ├── index.js
│   │   │   └── ReactComponent.js
│   │   ├── VariantFeatureWidget
│   │   │   ├── AnnotGrid.tsx
│   │   │   ├── BreakendOptionDialog.tsx
│   │   │   ├── BreakendPanel.tsx
│   │   │   ├── index.ts
│   │   │   ├── VariantAnnPanel.tsx
│   │   │   ├── VariantCsqPanel.tsx
│   │   │   ├── VariantFeatureWidget.test.js
│   │   │   ├── VariantFeatureWidget.tsx
│   │   │   └── VariantSampleGrid.tsx
│   │   ├── VariantTrack
│   │   │   └── index.ts
│   │   ├── VcfAdapter
│   │   │   ├── configSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── VcfAdapter.test.ts
│   │   │   └── VcfAdapter.ts
│   │   └── VcfTabixAdapter
│   │       ├── configSchema.ts
│   │       ├── index.ts
│   │       ├── VcfFeature.test.ts
│   │       ├── VcfFeature.ts
│   │       ├── VcfTabixAdapter.test.ts
│   │       └── VcfTabixAdapter.ts
│   ├── tsconfig.build.es5.json
│   ├── tsconfig.build.esm.json
│   └── tsconfig.json
└── wiggle
    ├── package.json
    ├── src
    │   ├── BigWigAdapter
    │   │   ├── BigWigAdapter.test.ts
    │   │   ├── BigWigAdapter.ts
    │   │   ├── configSchema.ts
    │   │   └── index.ts
    │   ├── configSchema.ts
    │   ├── CreateMultiWiggleExtension
    │   │   ├── ConfirmDialog.tsx
    │   │   └── index.ts
    │   ├── DensityRenderer
    │   │   ├── configSchema.ts
    │   │   ├── DensityRenderer.test.js
    │   │   ├── DensityRenderer.ts
    │   │   └── index.ts
    │   ├── drawxy.ts
    │   ├── index.test.js
    │   ├── index.ts
    │   ├── LinearWiggleDisplay
    │   │   ├── components
    │   │   │   ├── SetColorDialog.tsx
    │   │   │   ├── SetMinMaxDialog.tsx
    │   │   │   ├── Tooltip.tsx
    │   │   │   ├── WiggleDisplayComponent.tsx
    │   │   │   └── YScaleBar.tsx
    │   │   ├── index.ts
    │   │   └── models
    │   │       ├── configSchema.ts
    │   │       └── model.tsx
    │   ├── LinePlotRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── LinePlotRenderer.ts
    │   ├── MultiDensityRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiDensityRenderer.ts
    │   ├── MultiLinearWiggleDisplay
    │   │   ├── components
    │   │   │   ├── declare.d.ts
    │   │   │   ├── SetColorDialog.tsx
    │   │   │   ├── SetMinMaxDialog.tsx
    │   │   │   ├── Tooltip.tsx
    │   │   │   ├── util.test.ts
    │   │   │   ├── util.ts
    │   │   │   ├── WiggleDisplayComponent.tsx
    │   │   │   └── YScaleBar.tsx
    │   │   ├── index.ts
    │   │   └── models
    │   │       ├── configSchema.ts
    │   │       └── model.tsx
    │   ├── MultiLineRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiLineRenderer.ts
    │   ├── MultiQuantitativeTrack
    │   │   └── index.ts
    │   ├── MultiRowLineRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiRowLineRenderer.ts
    │   ├── MultiRowXYPlotRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiRowXYPlotRenderer.ts
    │   ├── MultiWiggleAdapter
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiWiggleAdapter.ts
    │   ├── MultiWiggleAddTrackWidget
    │   │   ├── AddTrackWorkflow.tsx
    │   │   └── index.ts
    │   ├── MultiWiggleRendering.tsx
    │   ├── MultiXYPlotRenderer
    │   │   ├── configSchema.ts
    │   │   ├── index.ts
    │   │   └── MultiXYPlotRenderer.ts
    │   ├── QuantitativeTrack
    │   │   └── index.ts
    │   ├── Tooltip.tsx
    │   ├── util.test.js
    │   ├── util.ts
    │   ├── WiggleBaseRenderer.tsx
    │   ├── WiggleRendering.test.js
    │   ├── WiggleRendering.tsx
    │   ├── WiggleRPC
    │   │   └── rpcMethods.ts
    │   └── XYPlotRenderer
    │       ├── configSchema.ts
    │       ├── index.ts
    │       ├── XYPlotRenderer.test.js
    │       └── XYPlotRenderer.ts
    ├── tsconfig.build.es5.json
    ├── tsconfig.build.esm.json
    └── tsconfig.json

225 directories, 784 files
```
