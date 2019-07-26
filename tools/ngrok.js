let ngrok;
try{
  ngrok = require('ngrok');
} catch (error){
  console.error('ngrok npm package not found. Run `npm install --save-optional`');
}

const authtoken = process.env.NGROK_AUTHTOKEN;
const subdomain = process.env.NGROK_SUBDOMAIN;

//TODO: make this work without auth or a subdomain?
if (!authtoken && subdomain) {
  console.error('ngrok needs an auth token and subdomain');
  return;
}

(async () => {
  const url = await ngrok.connect({
    subdomain,
    authtoken,
    addr: process.env.PORT || '3000'
  });

  console.log(`🚚 ngrok:\tApp is at ${url} \n\t\tUse http://127.0.0.1:4040 to inspect`)
})();
