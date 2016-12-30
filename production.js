module.exports = {
  apps : [{
    name        : "fork",
    script      : "bin/www",
    watch       : true,
    env: {
      "NODE_ENV": "production",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}