import type { Request, Response } from 'express';
import express from 'express';

import type { EventItem } from '@org/shared';
import { sendAnEvent, SERVICE_PORTS } from '@org/shared';

import { validateComment } from './utils';

const app = express();
app.use(express.json());

app.post('/api/events', (req: Request<object, object, EventItem>, res: Response) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    setTimeout(async () => {
      const commentStatus = validateComment(data);

      const { status, errorMessage } = await sendAnEvent({
        type: 'CommentModerated',
        data: { ...data, status: commentStatus },
      });

      if (status === 'error') {
        console.error('[moderation] Failed to send CommentModerated event:', errorMessage);
      }
    }, 3000);
  }

  // Respond immediately – do NOT wait for moderation to finish
  res.status(202).send({});
});

app.listen(SERVICE_PORTS.moderation, () => {
  console.log(`Moderation service listening on port ${SERVICE_PORTS.moderation}`);
});
