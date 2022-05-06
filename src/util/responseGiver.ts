import fs from 'fs';
import { SysMessage } from 'src/typings/sys-msg';

export default function returnMessage(label: string): string {
  const file = process.env.ERROR_MSG_FILE!;
  const errorMsgFile: SysMessage[] = JSON.parse(fs.readFileSync(file).toString());
  let msg = 'Something feels wrong... I could use some help from <@400271116607946752>. Tell him please that I cannot say what I was asked to.';
  errorMsgFile.forEach((m) => {
    if (m.id === label) {
      msg = m.content[Math.floor(Math.random() * m.content.length)];
    }
  });
  return msg;
}
