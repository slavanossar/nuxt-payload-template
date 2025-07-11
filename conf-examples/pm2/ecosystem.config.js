require('dotenv').config()

module.exports = {
  apps: [
    {
      name: 'nuxt',
      cwd: './apps/nuxt',
      script: '.output/server/index.mjs',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '512M',
      listen_timeout: 8000,
      kill_timeout: 8000,
      env_production: {
        ...process.env,
        NODE_ENV: 'production',
        NITRO_PRESET: 'node_cluster',
      },
    },
    {
      name: 'payload',
      cwd: './apps/payloadcms',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      listen_timeout: 8000,
      kill_timeout: 8000,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation'
      },
    },
  ],
}