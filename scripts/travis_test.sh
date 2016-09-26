# Runs the Travis CI

set -ex -o pipefail
cd `dirname $0`
cd ../tour-of-heroes

ng build
npm run lint
npm run test -- --watch=false

# When using saucelabs, use a different config.
if [[ ${TRAVIS} && (${CI_MODE} == "saucelabs") ]]; then
  PROTRACTOR_CONFIG="protractor-saucelabs.conf.js"
fi

concurrently --success first --kill-others \"lite-server\" \"protractor $PROTRACTOR_CONFIG\"
