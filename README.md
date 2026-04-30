# medicareer-shared-components

メディキャリ全サイト共通の **Astro コンポーネントパッケージ**。
brand-v2 / corp-v2 / agent-lp-v2 で Header / Footer / Layout を統合し、Single Source of Truth で運用する。

## 含まれるコンポーネント

| コンポーネント | 役割 | 主な props |
|---|---|---|
| `BaseHeader.astro` | 共通ヘッダー（白背景・sticky top） | siteName / primaryColor / navItems / cta |
| `BaseFooter.astro` | 共通フッター（ダーク背景・4列 or simple） | brandName / brandTagline / columns / simple |
| `BaseLayout.astro` | HTML 雛形（フォント・OGP） | title / description / themeColor / ogImage |
| `Logo.astro` | ロゴシンボル+テキスト | symbol / siteName / bgColor / hoverColor |

## 前提：CSS 変数（デザイントークン）

各サイトの `global.css` で以下の変数が定義されていることが前提：

```css
:root {
  --color-medicareer-blue: #1E50A2;
  --color-revolution-red: #...;
  --color-revolution-red-dark: #...;
  --color-ink-navy: #0B1F3A;
  --color-on-surface: #...;
  --color-outline-variant: #...;
}
```

このパッケージは **CSS は同梱しない**。各サイトの既存トークンに依存する設計。

## 各サイトでの使い方

### Step 1：依存追加

各サイトの `package.json` に追加：

```json
{
  "dependencies": {
    "medicareer-shared-components": "github:Contact-medicareer/medicareer-shared-components"
  }
}
```

### Step 2：インストール

```bash
npm install
```

### Step 3：コンポーネントをインポート

#### BaseHeader（メディキャリブランドサイト v2 の例）

```astro
---
import BaseHeader from 'medicareer-shared-components/components/BaseHeader.astro';
---

<BaseHeader
  logoSymbol="M"
  siteName="メディキャリ"
  primaryColor="var(--color-medicareer-blue)"
  navItems={[
    { label: 'メディキャリとは', href: '#why' },
    { label: '3つのサービス', href: '#services' },
    { label: '実績', href: '#numbers' },
    { label: 'ミッション', href: '#mission' },
    { label: '運営', href: '#founder' }
  ]}
/>
```

#### BaseHeader（コーポサイト v2 の例：CTA pill 付き）

```astro
---
import BaseHeader from 'medicareer-shared-components/components/BaseHeader.astro';
---

<BaseHeader
  logoSymbol="C"
  siteName="Contact"
  primaryColor="var(--color-revolution-red)"
  navItems={[
    { label: '私たちについて', href: '/about/' },
    { label: '事業', href: '#brands' },
    { label: 'AI', href: '/ai/' },
    { label: 'ニュース', href: '/news/' },
    { label: 'お問い合わせ', href: '/contact/' }
  ]}
  cta={{
    label: '採用情報',
    href: '/recruit/',
    hoverBg: 'var(--color-revolution-red-dark)'
  }}
/>
```

#### BaseFooter（4列モード - brand-v2 の例）

```astro
---
import BaseFooter from 'medicareer-shared-components/components/BaseFooter.astro';
---

<BaseFooter
  brandName="メディキャリ"
  brandTagline="医療職特化のキャリア支援。<br/>学ぶ・相談する・転職する。"
  columns={[
    {
      title: 'サービス',
      links: [
        { label: 'メディキャリ大学', href: 'https://lp-winova.jp/...', external: true },
        { label: 'メディキャリエージェント', href: 'https://medicareer-agent-lp.vercel.app/', external: true },
        { label: 'メディキャリコーチング', href: 'https://training-lp.vercel.app/', external: true }
      ]
    },
    {
      title: '会社情報',
      links: [
        { label: '運営会社', href: 'https://corp-site-v1.vercel.app/', external: true },
        { label: '会社概要', href: 'https://corp-site-v1.vercel.app/about/', external: true }
      ]
    },
    {
      title: '法的情報',
      links: [
        { label: 'プライバシーポリシー', href: 'https://corp-site-v1.vercel.app/privacy-policy/', external: true },
        { label: '利用規約', href: 'https://corp-site-v1.vercel.app/terms/', external: true }
      ]
    }
  ]}
  copyrightRight="MediCareer"
/>
```

#### BaseFooter（simple モード - agent-lp の例）

```astro
---
import BaseFooter from 'medicareer-shared-components/components/BaseFooter.astro';
---

<BaseFooter
  simple
  brandName="メディキャリエージェント"
  subTitle="看護師向けキャリア支援LP"
  simpleLinks={[
    { label: 'プライバシーポリシー', href: '#' },
    { label: '利用規約', href: '#' },
    { label: '特定商取引法', href: '#' }
  ]}
/>
```

#### BaseLayout（任意・各サイトの BaseLayout から差し替え可）

```astro
---
import BaseLayout from 'medicareer-shared-components/components/BaseLayout.astro';
import '../styles/global.css';  // ← 各サイト固有の global.css は別途インポート
---

<BaseLayout title="メディキャリ" description="..." themeColor="#1E50A2">
  <BaseHeader ... />
  <main>
    <slot />
  </main>
  <BaseFooter ... />
</BaseLayout>
```

## 設計思想

- **Single Source of Truth**：3サイトで Header/Footer の見た目・構造を統一
- **トークン非同梱**：CSS 変数は各サイト側で定義（既存の global.css を尊重）
- **props ベースカスタマイズ**：色・テキスト・リンクをサイトごとに切り替え
- **Astro ネイティブ**：`.astro` ファイル直接 import で動作（バンドル不要）

## 関連リポジトリ

- [medicareer-shared-assets](https://github.com/Contact-medicareer/medicareer-shared-assets)：画像・SVG 共通アセット
- [medicareer-fact-base](https://github.com/Contact-medicareer/medicareer-fact-base)：ファクトデータ専用パッケージ
- 各サイト：medicareer-brand-v2 / corp-site-v2 / medicareer-agent-lp-v2

## 改訂履歴

| 日付 | バージョン | 内容 |
|---|---|---|
| 2026-04-29 | 1.0.0 | 初版（BaseHeader / BaseFooter / BaseLayout / Logo） |
