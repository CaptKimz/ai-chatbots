import { config } from './config/config'
import serverModule from './servers'

const PORT = config.server.port
serverModule.start(Number(PORT))
