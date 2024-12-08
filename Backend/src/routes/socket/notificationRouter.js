const notificationRouter = (socket) => {
    socket.on('invite', (data) => {
        console.log(`Invite request received from ${data.receiver_id}`)

        socket.emit('join_confirmation', {
            message: `You have been invited to join the team, ${data.receiver_id}!`,
        })
    })
}

export default notificationRouter
