import type { Request, Response } from 'express';
import express from 'express';

import { SERVICE_PORTS } from 'shared/constants';
import type { EventItem } from 'shared/types';
import { asyncSetTimeout, sendAnEvent } from 'shared/utils';

import { validateComment } from './utils';

const app = express();
app.use(express.json());

app.post('/events', async (req: Request<object, object, EventItem>, res: Response) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    // Wait for comment moderation
    await asyncSetTimeout(3000);

    const commentStatus = validateComment(data);

    const { status, errorMessage } = await sendAnEvent({
      type: 'CommentModerated',
      data: { ...data, status: commentStatus },
    });

    if (status === 'error') {
      return res.status(500).json({ errorMessage });
    }
  }

  res.send({});
});

app.listen(SERVICE_PORTS.moderation, () => {
  console.log(`Moderation service listening on port ${SERVICE_PORTS.moderation}`);
});
