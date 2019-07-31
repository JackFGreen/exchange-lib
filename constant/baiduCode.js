import { isProd } from './env'

export default (isProd(process.env.DEPLOY_ENV) ? '' : '')
