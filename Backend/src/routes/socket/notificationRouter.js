const notificationRouter = (socket) => {
    socket.on('invite', (data) => {
        socket.emit('join_confirmation', {
            message: `You have been invited to join the team, ${data.receiver_id}!`,
        })
    })
}

export default notificationRouter
