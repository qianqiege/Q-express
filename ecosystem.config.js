module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "API",
      script    : "bin/www",
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
	  key : "thekey",
      user : "node",
      host : "120.25.81.41",
      ref  : "origin/master",
      repo : "git@git.oschina.net:ybyt/QOLM-V.git",
      path : "/home/qolm/QOLM-nodejs",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    },
  }
}
