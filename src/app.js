const fs = require('fs');
const path = require('path');

main();

function main() {
  const dir = 'import_data';
  const regExp = new RegExp(/:([a-z0-9_]+):/g);

  let count = {};
  fs.readdirSync(dir)
    .filter((file) => {
      return fs.statSync(path.join(dir, file)).isDirectory();
    })
    .forEach((subdir) => {
      // チャンネルの日毎のファイル一覧の中身
      let files = fs
        .readdirSync(path.join(dir, subdir))
        .map((file) => JSON.parse(fs.readFileSync(path.join(dir, subdir, file))));

      if (files.length === 0) {
        // チャンネル投稿データなし
        return;
      }

      files.forEach((messages) => {
        messages.forEach((msg) => {
          // reactionsから検索
          if (msg.reactions) {
            msg.reactions.forEach((reaction) => {
              const reactionName = reaction.name;
              const reactionCount = reaction.count;
              const emoji = `:${reactionName}:`;
              count[emoji] ? (count[emoji] += reactionCount) : (count[emoji] = 1);
            });
          }

          // botがノイズなのでtextからは除外
          if (msg.subtype && msg.subtype === 'bot_message') {
            return false;
          }
          // textから検索
          const textMatched = regExp.exec(msg.text);
          if (textMatched) {
            const emoji = textMatched[0];
            count[emoji] ? count[emoji]++ : (count[emoji] = 1);
          }
        });
      });
    });

  Object.keys(count)
    .sort((a, b) => count[b] - count[a])
    .forEach((emoji) => console.log(`${emoji} ${count[emoji]}`));
}
