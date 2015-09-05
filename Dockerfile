FROM debian

MAINTAINER Vinnie Magro <v@vinnie.io>

RUN apt-get update -qq && apt-get install -qq -y \
  curl

# Install Node
RUN   \
  cd /opt && \
  curl https://iojs.org/dist/latest/iojs-v3.3.0-linux-x64.tar.gz > iojs-v3.3.0-linux-x64.tar.gz && \
  tar -xf iojs-v3.3.0-linux-x64.tar.gz && \
  mv iojs-v3.3.0-linux-x64 node && \
  cd /usr/local/bin && \
  ln -s /opt/node/bin/* . && \
  rm -f /opt/node-v0.10.28-linux-x64.tar.gz

# Set the working directory
WORKDIR   /app

CMD ["/bin/bash"]
