var plan = require('flightplan');
var appName = "backend-api";

plan.target('setup', {
    host: "mysupertestsite.com",
    username: "gregorysmith",
    agent: process.env.SSH_AUTH_SOCK,
    webRoot: "/usr/local/var"
});

plan.target('staging', {
    host: "mysupertestsite.com",
    username: "gregorysmith",
    agent: process.env.SSH_AUTH_SOCK
}, {
    webRoot: "/usr/local/var",
    ownerUser: "gregorysmith",
    group: "admin"
});

plan.target('production', {
    host: "gregoftheweb.com",
    username: "webadmin",
    agent: process.env.SSH_AUTH_SOCK
}, {
    webRoot: "/var/www",
    ownerUser: "webadmin",
    group: "www-data"
});

var versionedDir = `${new Date().getTime()}`;

plan.remote('setup', function(remote) {
        // remote.mkdir('apps');
        remote.mkdir(`${plan.runtime.options.webRoot}/${appName}`);
        remote.mkdir(`~/${appName}`);
});

plan.local(['staging', 'production'], function(local) {
    local.log("Running local flightplan");

    var filesToTransfer = local.exec('git ls-files', {silent: true});
    local.log("Moving files");
    local.transfer(filesToTransfer, `~/${appName}`);
});

plan.remote(['staging', 'production'], function(remote) {
    remote.hostname();
    remote.log("Remoting in...");
    remote.exec(`cp -R ~/${appName} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`)
    remote.exec(`chown -R ${plan.runtime.options.ownerUser}:${plan.runtime.options.group} ${plan.runtime.options.webRoot}/${appName}/${versionedDir}`);
    remote.with(`cd ${plan.runtime.options.webRoot}/apps`, function() {
        remote.log("Linking")
        remote.exec(`rm -rf ${appName}`);
        remote.exec(`ln -sf ../${appName}/${versionedDir} ${appName}`);
    });
    remote.with(`cd ${plan.runtime.options.webRoot}/apps/${appName}`, function() {
        remote.log('Install dependencies');
        remote.sudo(`npm install --production`, {user: plan.runtime.options.ownerUser});
        remote.exec(`ln -s ${plan.runtime.options.webRoot}/apiKeys.js server/config/apiKeys.js`)
        remote.exec(`sudo /bin/systemctl restart node-app.service`);
    });
});

