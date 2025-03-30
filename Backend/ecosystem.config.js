module.exports = {
    apps: [
        {
            name: 'opennezt',
            script: './build/main.js',
            instances: 'max',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                PORT: 3456,
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3456,
            },
        },
    ],
}
