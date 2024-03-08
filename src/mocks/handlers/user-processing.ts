import {http, HttpResponse} from 'msw';

import {delay} from './utils';

const generateRandomName = (): string => {
  const nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
  ];

  return nameList[Math.floor( Math.random() * nameList.length )];
};

const pollingGenerator = function* (
  isSuccessfulPolling: boolean
): Generator<{status: string}> {
  yield {status: 'STARTING'};
  yield {status: 'IN PROGRESS'};
  yield {status: 'IN PROGRESS'};
  yield {status: 'IN PROGRESS'};
  yield {status: 'IN PROGRESS'};

  if (isSuccessfulPolling) {
    yield {status: 'DONE'};
  } else {
    yield {status: 'FAILED'};
  }
};

let generator: Generator<{status: string}> = null;
let canObtainData = true;

export const handlers = [
  http.post<null, {id: string, isSuccessProgress: boolean, canObtainData: boolean}>('/api/user-processing/init', async ({request}) => {
    const body = await request.json();

    canObtainData = body.canObtainData;

    await delay(1000);

    if (body.id) {
      generator = pollingGenerator(body.isSuccessProgress);

      return new HttpResponse(null, {status: 200});
    } else {
      return new HttpResponse(null, {status: 400});
    }
  }),
  http.get<null>('/api/user-processing/progress', async () => {
    await delay(1000);

    return generator ?
      HttpResponse.json(generator.next().value) :
      new HttpResponse(null, { status: 400 });
  }),
  http.get<null>('/api/user-processing/result', async () => {
    generator = null;

    await delay(1000);

    return canObtainData ? HttpResponse.json({
      name: generateRandomName(),
      age: Math.floor(Math.random() * 10)
    }) : new HttpResponse(null, {status: 401});
  }),
];
