import fs from 'fs';
import { NNTrainingData } from 'src/typings/training-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function trainnlp(manager:any) {
  const rawFile = fs.readFileSync(process.env.TRAINING_FILE!).toString();
  const trd = JSON.parse(rawFile) as NNTrainingData[];

  trd.forEach((e) => {
    e.patterns.forEach((p) => {
      manager.addDocument('en', p.replace(/[^a-zA-Z ]+/g, '').toLowerCase(), e.intent);
    });
  });

  console.log('Training, please wait..');
  const hrstart = process.hrtime();
  await manager.train();
  const hrend = process.hrtime(hrstart);
  console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  console.log('Trained!');

  trd.forEach((e) => {
    e.outputs.forEach((o) => {
      manager.addAnswer('en', e.intent, o);
    });
  });

  manager.save(process.env.BRAIN_FILE!, true);
}
