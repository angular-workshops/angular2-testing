# Sets up the test environment on Travis.

# Start Xvfb when running locally.
if [[ ${TRAVIS} && (${CI_MODE} == "local") ]]; then
  /etc/init.d/xvfb start
fi

# Start SauceConnect when running on SauceLabs.
if [[ ${TRAVIS} && (${CI_MODE} == "saucelabs") ]]; then
  ./scripts/sauce_connect_setup.sh
fi
