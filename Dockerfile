FROM denoland/deno:ubuntu

# Install libraries for installing wgrib2
RUN apt update
RUN apt upgrade -y
RUN apt install -y wget
RUN apt install -y make
RUN apt install -y build-essential
RUN apt install -y gfortran
RUN apt install -y zlib1g-dev

# Setting for libraries
ENV CC gcc
ENV FC gfortran

# Download wgrib2
RUN cd ~
RUN wget https://www.ftp.cpc.ncep.noaa.gov/wd51we/wgrib2/wgrib2.tgz.v3.1.1
RUN tar xvzf wgrib2.tgz.v3.1.1

# Install wgrib2
RUN cd grib2/ && make && cp wgrib2/wgrib2 /usr/local/bin/

EXPOSE 1993
WORKDIR /app

USER deno

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--allow-run", "--allow-ffi", "main.ts"]
