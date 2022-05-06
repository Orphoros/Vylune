import fs from 'fs';
import getSystemResponse from './responseGiver';

const threshold = 0.5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function processMessageByAI(npl:any, msg: string): Promise<string> {
  if (!fs.existsSync(process.env.BRAIN_FILE!)) {
    console.error('[ERR]: Cannot skip training, no brain was found!');
    return 'Something feels wrong... I could use some help from <@400271116607946752>';
  }
  npl.load(process.env.BRAIN_FILE!);
  const result = await npl.process(msg);
  const answer = result.score > threshold && result.answer
    ? result.answer
    : getSystemResponse('com.orphoros.vylune.sys.nnerror');
  const sentiment = '';
  /*
  if (result.sentiment.score !== 0) {
    sentiment = `  ${result.sentiment.score > 0 ? ':)' : ':('}   (${
      result.sentiment.score
    })`;
  }
  */
  return `${answer}${sentiment}`;
}
