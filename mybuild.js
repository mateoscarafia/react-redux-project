const { exec } = require('child_process');

exec(
  'serve -s build -l 443 --ssl-cert "./ssl/woordi.com.crt" --ssl-key "./ssl/woordi.com.key',
  async (error, stdout, stderr) => {
    !error && console.log('react app running in port 443 - HTTPS')
  },
);
