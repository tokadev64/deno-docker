# setup

wgrib2 をインストールした Docker 環境のセットアップと起動方法

## deno インストール

### mac

```
brew install deno
```

### win

```
scoop install deno
```

### Dockerfile コピー

※ Arm アーキテクチャマシン (M1 Mac etc) を使用している場合は、Arm 用の Dockerfile に上書きしてください。

```
cp DockerfileArm docker/Dockerfile
```

## Docker ビルド + 起動

```
# ビルド
deno task build

# 起動
deno task run

# ビルド + 起動
deno task brun

# 起動した Docker コンテナに入りたい時
deno task in
```
