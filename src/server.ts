import app from "./app";

import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});

app.use(rateLimiter);
app.listen(3000, () => {
    console.info(`adp accessment: Math Operations Service up and running at 3000`);
});