module.exports = {
  apps: [
    {
      name: 'PRIME-code-challenge',
      script: './bin/www',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
