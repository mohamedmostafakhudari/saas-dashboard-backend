import app from './app';
import connectDB from './config/db';
import { config } from './config/env';

async function start(): Promise<void> {
	await connectDB();

	app.listen(config.port, () => {
		console.log(`[server] Running in ${config.nodeEnv} mode`);
		console.log(`[server] Listening on http://localhost:${config.port}`);
	});
}

start().catch((err) => {
	console.error('[server] Failed to start:', err);
	process.exit(1);
});
