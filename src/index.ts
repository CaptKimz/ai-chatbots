import { config } from './config/config'
import serverModule from './servers'

async function startServer() {
    try {
        // Verify Redis connection before starting the server
        const isRedisConnected = await config.redis.verifyConnection()
        
        if (!isRedisConnected) {
            console.error('❌ Server Startup Failed: Redis Connection Error')
            process.exit(1)
        }

        const PORT = config.server.port
        serverModule.start(Number(PORT))
    } catch (error) {
        console.error('❌ Server Startup Failed:', error)
        process.exit(1)
    }
}

startServer()
