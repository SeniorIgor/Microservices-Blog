import type { Request, Response } from 'express';
import express from 'express';

import { SERVICE_PORTS } from 'shared/constants';
import type { EventItem } from 'shared/types';

const app = express();
app.use(express.json());

app.post('/events', (req: Request<object, object, EventItem>, res: Response) => {
  // const { type, data } = req.body;

  // if (type === 'CommentCreated') {
  // }

  res.send({});
});

app.listen(SERVICE_PORTS.moderation, () => {
  console.log(`Moderation service listening on port ${SERVICE_PORTS.moderation}`);
});
