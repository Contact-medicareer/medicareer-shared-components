// medicareer-shared-components エントリポイント
// Astro コンポーネントは .astro 形式のファイル参照のため、
// 各サイトからは `import X from 'medicareer-shared-components/components/X.astro'` で直接読み込む。
// このエントリポイントは絶対パス解決ヘルパーのみ提供する。

const path = require('path');

module.exports = {
  componentsDir: path.join(__dirname, 'components'),
  // 各コンポーネントへの絶対パス（Astro tooling から使用したい場合用）
  paths: {
    BaseHeader: path.join(__dirname, 'components', 'BaseHeader.astro'),
    BaseFooter: path.join(__dirname, 'components', 'BaseFooter.astro'),
    BaseLayout: path.join(__dirname, 'components', 'BaseLayout.astro'),
    Logo: path.join(__dirname, 'components', 'Logo.astro'),
  }
};
