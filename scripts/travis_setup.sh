# Sets up the test environment on Travis.

set -ex -o pipefail
cd `dirname $0`
source ./env.sh

# Start Xvfb when running locally.
if [[ ${TRAVIS} && (${CI_MODE} == "local") ]]; then
  /etc/init.d/xvfb start
fi
