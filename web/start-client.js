const args = ['start']
const opts = {stdio: 'inherit', cwd: 'client', shell: true, env: {port: 5001}}
require('child_process').spawn('npm', args, opts)