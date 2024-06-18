import app from "./app";

import { rateLimit } from 'express-rate-limit'

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
})

app.use(rateLimiter)
app.listen(3000, () => {
    console.info(`adp accessment: Math Operations Service up and running at 3000`)
});