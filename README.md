# Refile
提供基于HTTP的文件管理服务, 受到IPFS启发.

Refile的文件管理是基于内容寻址和引用计数进行的, 通过Refile上传的文件会失去它的文件名和MIME类型.

## Quickstart
```sh
docker run \
  --detach \
  --publish 8080:8080 \
  blackglory/refile
```

## Install
### 从源代码运行
```sh
git clone https://github.com/BlackGlory/refile
cd log
yarn install
yarn build
yarn bundle
yarn --silent start
```

### 从源代码构建
```sh
git clone https://github.com/BlackGlory/refile
cd refile
yarn install
yarn docker:build
```

### Recipes
#### docker-compose.yml
```yaml
version: '3.8'

services:
  refile:
    image: 'blackglory/refile'
    restart: always
    volumes:
      - 'refile-database:/database'
      - 'reifle-storage:/storage'
    ports:
      - '8080:8080'

volumes:
  refile-database:
  refile-storage:
```

## API
所有API中的namespace和id都需要满足此正则表达式: `^[a-zA-Z0-9\.\-_]{0,255}$`

### upload file
`PUT /refile/files/<hash>`

上传文件.

上传文件时需要提供三个参数:
- `file`:
  需要上传的二进制文件, 由FormData的file字段提供.
  一次只能上传一个文件, 表单的编码必须为`multipart/form-data`.
- `hashList`:
  分段hash列表, 由ForumData的多个名为hashList的同名字段提供.
  将文件按512KiB为切割点进行分段, 计算出每段内容的SHA-256,
  将其16进制字符串形式保存为有序数组, 该数组即为文件的hashList.
- `hash`:
  文件的最终hash, 在URL里提供.
  将hashList的字符串连接起来, 计算其SHA-256, 其16进制字符串形式即为文件的最终hash.

被上传的文件必须先通过set reference建立相应的引用关系.
如果文件的引用数为零, 上传会被拒绝.
上传参数设计得如此复杂是为了能够尽早拒绝错误和重复的文件.

上传的文件原本不存在时, 返回HTTP状态码201.
上传的文件原本就已经存在时, 返回HTTP状态码204.
上传的文件的hash校验错误时, 返回HTTP状态码409.

### get file info
`GET /refile/files/<hash>`

获取与资源相关的信息.

返回JSON:
```ts
{
  hash: string
  location: string | null // 未上传时, location为null
  references: number
}
```

#### Example
##### curl
```sh
curl "http://localhost:8080/refile/files/$hash"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/files/${hash}`)
  .then(res => res.json())
```

### get file location
`GET /refile/files/<hash>/location`

通过hash获取文件的location.
它与get file info的功能重合, 但性能更好.

如果location存在, 返回HTTP状态码200, 以文本形式返回location.
如果location不存在, 返回HTTP状态码404.

#### Example
##### curl
```sh
curl "http://localhost:8080/refile/files/$hash/location"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/files/${hash}/location`)
  .then(res => res.text())
```

### set reference
`PUT /refile/namespaces/<namespace>/items/<id>/files/<hash>`

设置文件hash与引用的关系.

#### Example
##### curl
```sh
curl \
  --request PUT \
  "http://localhost:8080/refile/namespaces/$namespace/items/$id/files/$hash"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespaces/${namespace}/items/${id}/files/${hash}`)
```

### remove reference
`DELETE /refile/namespaces/<namespace>/items/<id>/files/<hash>`

移除文件hash与引用的关系.

#### Example
##### curl
```sh
curl \
  --request DELETE \
  "http://localhost:8080/refile/namespaces/$namespace/items/$id/files/$hash"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespaces/${namespace}/items/${id}/files/${hash}`, {
  method: 'DELETE'
})
```

### remove references by item id
`DELETE /refile/namespaces/<namespace>/items/<id>`

移除特定项目的全部引用.

#### Example
##### curl
```sh
curl \
  --request DELETE \
  "http://localhost:8080/refile/namespaces/$namespace/items/$id"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespaces/${namespace}/items/${id}`, {
  method: 'DELETE'
})
```

### remove references by namespace
`DELETE /refile/namespaces/<namespace>`

删除特定命名空间下的全部引用.

#### Example
##### curl
```sh
curl \
  --request DELETE \
  "http://localhost:8080/refile/namespaces/$namespace"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespaces/${namespace}`, {
  method: 'DELETE'
})
```

### get all namespaces
`GET /refile/namespaces`

获取所有命名空间.

返回JSON:
```ts
string[]
```

如果设置了请求头`Accept: application/x-ndjson`, 则会以[ndjson]格式返回.

[ndjson]: https://github.com/ndjson/ndjson-spec

#### Example
##### curl
```sh
curl 'http://localhost:8080/refile/namespaces'
```

##### JavaScript
```js
await fetch('http://localhost:8080/refile/namespaces')
  .then(res => res.json())
```

### get all item ids
`GET /refile/namespaces/<namespace>/items`

获取特定命名空间下的所有项目id列表.

返回JSON:
```ts
string[]
```

如果设置了请求头`Accept: application/x-ndjson`, 则会以[ndjson]格式返回.

[ndjson]: https://github.com/ndjson/ndjson-spec

#### Example
##### curl
```sh
curl "http://localhost:8080/refile/namespaces/$namespace/items"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespaces/${namespace}/items`)
  .then(res => res.json())
```

### get file hashes by item id
`GET /refile/namespaces/<namespace>/items/<id>/files`

获取与特定引用相关联的文件hash列表.

返回JSON:
```ts
string[]
```

如果设置了请求头`Accept: application/x-ndjson`, 则会以[ndjson]格式返回.

[ndjson]: https://github.com/ndjson/ndjson-spec

#### Example
##### curl
```sh
curl "http://localhost:8080/refile/namespaces/$namespace/items/$id/files"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/namespace/${namespace}/items/${id}/files`)
  .then(res => res.json())
```

### get item ids by file hash
`GET /refile/files/<hash>/namespaces/<namespace>/items`

获取特定命名空间下与特定文件相关的项目id列表.

返回JSON:
```ts
string[]
```

如果设置了请求头`Accept: application/x-ndjson`, 则会以[ndjson]格式返回.

[ndjson]: https://github.com/ndjson/ndjson-spec

#### Example
##### curl
```sh
curl "http://localhost:8080/refile/files/$hash/namespaces/$namespace/items"
```

##### JavaScript
```js
await fetch(`http://localhost:8080/refile/files/${hash}/namespaces/${namespace}/items`)
  .then(res => res.json())
```

### collect garbage
`POST /refile/gc`

执行垃圾回收, 将引用数为0的文件从存储中删除.

#### Example
##### curl
```sh
curl 'http://localhost:8080/refile/gc'
```
       
##### JavaScript
```js
await fetch('http://localhost:8080/refile/gc', {
  method: 'POST'
})
```

## 环境变量
### `REFILE_HOST`, `REFILE_PORT`
通过环境变量`REFILE_HOST`和`REFILE_PORT`决定服务器监听的地址和端口,
默认值为`localhost`和`8080`.

## 客户端
- JavaScript/TypeScript(Node.js, Browser): <https://github.com/BlackGlory/refile-js>
