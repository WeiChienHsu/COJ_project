const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io){
    //collaboration sessions
    const collaborations = {};
    // map form socketId to sessionId
    const sessionPath = '/temp_sessions/';
    const socketIdToSessionId = {};

    io.on('connection', (socket) => {
        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        // if (!(sessionId in collaborations)) {
        //     collaborations[sessionId] = {
        //         'participants':[]
        //     };
        // }
        // collaborations[sessionId]['participants'].push(socket.id);
        
        
        // Scession id in collaborations 
        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            redisClient.get(sessionPath + '/' + sessionId, data => {
                if (data) { // there is data in radis
                    console.log('session terminated perviously, pulling back from redis');
                    collaborations[sessionId] = {
                        'cachaedInstructions' : JSON.parse(data),
                        'participants': []
                    }
                } else { // create a new collaboration
                    console.log('creating new session');
                    collaborations[sessionId] = {
                        'cachaedInstructions' : [],
                        'participants': []  
                    }
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        socket.on('change', delta => {
            const sessionId = socketIdToSessionId[socket.id];
            if(sessionId in collaborations){
                collaborations[sessionId]['cachaedInstructions'].push(['change', delta, Date.now()]);
            }
            
            if (sessionId in collaborations){
                const participants = collaborations[sessionId]['participants'];
                for (let participant of participants) {
                    if (socket.id !== participant){
                        io.to(participant).emit('change', delta)
                    }
                }
            } else {
                console.error('error')
            }
        });

        // When client side call restore Buffer

        socket.on('restoreBuffer', () => {
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                const instructions = collaborations[sessionId]['cachaedInstructions'];
                for (let instruction of instructions) {
                    socket.emit(instruction[0], instruction[1]);
                }
            }
        });

        // When disconnect, save content in radis
        socket.on('disconnrect', () => {
            const sessionId = socketIdToSessionId[socket.id];
            let foundAndRemove = false;
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                const index = participants.indexOf(socket.id);
                if (index >= 0){
                    participants.slice(index, 1);
                    foundAndRemove = true;
                    if (participants.length === 0){ //last user
                        const key = sessionPath + '/' + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachaedInstructions']);
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaboraitons[sessionId];
                    }
                }
            }
            if (!foundAndRemove) {
                console.error('warning');
            }
        });
    });
}