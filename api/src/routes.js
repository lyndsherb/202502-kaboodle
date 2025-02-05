import express from 'express';
const router = express.Router();

router.get('/events', (req, res) => {
    res.send('List of events');
});

router.get('/events/:id', (req, res) => {
    const eventId = req.params.id;
    res.send(`Details of event ${eventId}`);
});

router.post('/events', (req, res) => {
    res.send('Create a new event');
});

router.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    res.send(`Update event ${eventId}`);
});

router.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    res.send(`Delete event ${eventId}`);
});
  
export default router;
