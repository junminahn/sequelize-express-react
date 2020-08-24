module.exports = {
  apps: [
    {
      name: 'backend',
      script: './bin/www',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
