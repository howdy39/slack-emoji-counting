# slack-emoji-counting
Slackの絵文字の件数をカウントするプログラム

[Slackで使われている絵文字ランキングを作る | ロードバランスすだちくん](https://blog.animereview.jp/slack-emoji-ranking/)

基本的に上記の記事と似たようなことをしているのだが、メモリ消費が激しすぎて実行できなかったりしたので、次の変更を加えています。

- 低消費メモリ
  - （データにもよると思いますが）元記事は351MBデータに対して35GB使ってますが、519MBデータに対して1.4GB程度でした
  - チャンネルディレクトリあたりのファイル数に依存するので長期間になると結構食うと思います
- emojiリアクションも計測
- BOTやアプリのメッセージ内emojiを除外
  - ※ BOTやアプリのメッセージに対するemojiリアクションは計測する

## Prerequisites
- [Node.js](https://nodejs.org/)

## Steps
1. 管理者権限で対象の期間のデータをエクスポートします
   - https://slack.com/services/export
2. 落としたzipファイルを解凍してディレクトリを`import_data`にします
3. `import_data`ディレクトリをこのプロジェクトと同階層におきます
4. 次のコマンドを実行します
   - `npm run exec > res.text`
