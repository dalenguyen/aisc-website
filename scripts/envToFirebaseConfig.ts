const { parsed, error } = require('dotenv').config();
if (error) {
  throw error;
}

if (parsed) {
  const entries = Object.entries<string>(parsed);
  const envVars = entries.reduce((acc, [k, v]) => {
    return Object.assign({}, acc, {
      [k.toLowerCase()]: v
    })
  }, {});
  const fbConfig = {
    global_env: envVars
  }

  console.log(JSON.stringify(fbConfig, null, 2));
}