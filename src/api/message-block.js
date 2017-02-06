import { Router } from 'express';
import { MessageBlock } from '../models';

const messageBlockRouter = new Router();

messageBlockRouter.get('/', (req, res) => {
  MessageBlock.find().exec((err, blocks) => {
    if (err) return res.status(500).send(err);
    return res.json(blocks);
  });
});

messageBlockRouter.post('/', (req, res) => {
  const { user, visitorIn, textIn, emotionIn, timeIn } = req.body;
  MessageBlock.create({ user, visitorIn, textIn, emotionIn, timeIn }, (err, block) => {
    if (err) return res.status(500).send(err);
    return res.json({ _id: block._id });
  });
});

messageBlockRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  MessageBlock.findByIdAndRemove(id, err => {
    if (err) return res.status(500).send(err);
    return res.json({
      msgBack: `Message ${id} has been successfully removed.`,
    });
  });
});

export default messageBlockRouter;
