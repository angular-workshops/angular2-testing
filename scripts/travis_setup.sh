# Sets up the test environment on Travis.

set -ex -o pipefail
cd `dirname $0`

# Start Xvfb when running locally.
if [[ ${TRAVIS} && (${CI_MODE} == "local_e2e") ]]; then
  sh -e /etc/init.d/xvfb start
fi
