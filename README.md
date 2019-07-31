# exchange-lib
公共库  
> 需要了解 yarn link，yarn add git_repo

## 安装
```sh
# install dep
yarn add git+ssh://git@github.com:JackFGreen/exchange-lib.git
```

## 本地调试开发
1. yarn link 本地的 lib 库到全局
```
cd exchange-lib/
# 关联本地库
yarn link
```

2. 将 lib 库 link 到你的项目
```
cd 你的项目/
# link 对应的库
yarn link exchange-lib
```

3. 引入相应代码
```
# vue main.js
import { isMobile } from 'exchange-lib/tools/platform'

# vue scss
<style lang="scss">
@import '~exchange-lib/scss/_global.scss';
#app {
  color: $color-theme;
}
</style>
```

## 发布到测试或生产
1. unlink 项目中的 lib 库
```
cd 你的项目/
# unlink 对应的库
yarn unlink exchange-lib
```

2. 重新安装最新的 lib 库
```
yarn add git+ssh://git@github.com:JackFGreen/exchange-lib.git
```

3. git push
