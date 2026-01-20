# エージェント構成

## [Manager] (Primary)
- プロジェクト全体の進捗を管理する。
- タスクを細分化し、適切なサブエージェントに割り当てる。

## [Architect] (Sub-Agent)
- コード設計とディレクトリ構成の定義を担当。
- 技術選定と依存関係の管理。

## [Tester] (Sub-Agent)
- 単体テストおよび結合テストの作成と実行。
- カバレッジ報告。

## [Developer] (Sub-Agent)
- [Architect] の設計に基づき、実際の機能実装（JavaScript/HTML/CSS）を行う。
- `js/components/` 内の Web Components の作成とロジック実装を担当。
- `locales/` 内の翻訳ファイルの更新。
