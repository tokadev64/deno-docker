FROM denoland/deno:ubuntu

EXPOSE 1993
WORKDIR /app

USER deno

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "main.ts"]