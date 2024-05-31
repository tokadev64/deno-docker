FROM denoland/deno:ubuntu

# Install libraries for installing wgrib2
RUN apt update \
  && apt upgrade -y \
  && apt install -y wget \
  && apt install -y make \
  && apt install -y build-essential \
  && apt install -y gfortran \
  && apt install -y zlib1g-dev

# Setting for libraries
ENV CC gcc
ENV FC gfortran

EXPOSE 1993
WORKDIR /app

# Download wgrib2
RUN cd ~
RUN wget https://www.ftp.cpc.ncep.noaa.gov/wd51we/wgrib2/wgrib2.tgz.v3.1.1
RUN tar xvzf wgrib2.tgz.v3.1.1

# Install wgrib2
RUN cd grib2/ \
  && make \
  && cp wgrib2/wgrib2 /usr/local/bin/

RUN rm wgrib2.tgz.v3.1.1 \
  && rm -rf grib2 \
  && chown deno:deno /app

USER deno
COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--allow-run", "--allow-ffi", "main.ts"]
