# Runs the Travis CI

set -ex -o pipefail
cd `dirname $0`
cd ../tour-of-heroes

ng build

if [[ ${TRAVIS} && (${CI_MODE} == "local_e2e") ]]; then
  npm run lint
  npm run test -- --watch=false
  PROTRACTOR_CONFIG="./protractor.conf.js"
fi

# When using saucelabs, use a different config.
if [[ ${TRAVIS} && (${CI_MODE} == "saucelabs_e2e") ]]; then
  PROTRACTOR_CONFIG="./protractor-saucelabs.conf.js"
fi

concurrently --success first --kill-others "lite-server" "protractor $PROTRACTOR_CONFIG"
