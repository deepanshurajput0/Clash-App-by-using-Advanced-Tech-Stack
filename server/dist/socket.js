import { votingQueue, votingQueueName } from './jobs/VotingJob.js';
export function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected ', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.onAny(async (eventName, data) => {
            if (eventName.startsWith('clashing-')) {
                await votingQueue.add(votingQueueName, data);
                socket.broadcast.emit(`clashing-${data.clashId}`, data);
            }
        });
    });
}
