#px to rem webpack loader 
通过将css中的px 自动conver 为 rem 的单位。

#使用

```
npm install --save-dev wptpx2rem
```

然后在webpack中使用 


**file.js**

```js
import css from 'file.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader' ,'wptPx2RemLoader'],
      },
    ],
  },
};
```

## Options

|                    Name                     |            Type             | Default  | Description                                                            |
| :-----------------------------------------: | :-------------------------: | :------: | :--------------------------------------------------------------------- |
|              **[`rem`](#url)**              |    `{Number}`    |  `10`  | rem的单位                  |
|           **[`exclude`](#import)**           |    `{Array}`    |  `[]`  | 排除的属性,例如:['font-size']                          |                             |


