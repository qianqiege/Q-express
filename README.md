# 生命质量控制前端 - 说明

## 简介
 生命质量控制前端，项目使用 ejs 模板引擎分离 header 与 footer

---
## 编码规范
 **除了返回 bool 类型的函数没有特定要求之外，其它判断语句使用`===`或`!==`来进行严格比较如**`if (foo() === false) {...}`

### 文件编码和普适原则
1. 所有文件编码使用 UTF-8 无 BOM 编码
2. 所有文件换行符使用 Unix 风格(\n)
3. 所有文件缩进均使用四空格代替 Tab

### 命名
 文件名、变量与函数名采用小驼峰命名法如`currentDate`, `getUser`, `fileQuery.ejs`

### 注释
1. 所有类库和函数均要有文档注释，文档注释与被注释内容间不能有空行
2. 单行注释使用`//`，与注释内容间要有一个空格如`// Content`

### 括号使用
1. 左大括号与关键字同行，右大括号与关键字同列
2. if/else语句即使只有一行也必须使用大括号
3. switch的case对齐，合理缩进
4. 关键词后与括号要有一个空格

```
function foo(condition, c) {
    if (condition) {
        doSomething();
    } else {
        doElse();
    }

    switch (c) {
        case 'a':
            result = 1;
            break;
        case 'b':
        case 'c':
            result = 2;
            break;
        default:
            result = 3;
            break;
    }
    return result;
}
```

### 运算符、参数附近的空格使用
1. 每个非一元运算符与两边参与运算的值或表达式中间要有一个空格
2. 左括号`(`与关键词间要有一个空格，右括号`)`后要有空格，除非后面是`);`
3. 比较大段的代码块合理使用空行划分逻辑区间
4. 说明或显示部分中，内容如含有中文、数字、英文单词混杂，应当在数字或者英文单词的前后加入空格
5. 函数参数之间的逗号左侧不留空格，右侧一个空格
6. 关键字后与括号间必须要有一个空格
7. 当参数过长需要换行时与第一个参数对齐
8. 对象字面量的冒号后加空格，冒号前不加

```
for (var i = 0; i < max; ++i) {
    msg[i]['type'] == MSG_TYPE_ERROR ? showError() : errArr.push(msg[i]);
    msg[i]['content'] = 'Info: ' + arr['type'];
}

result = {
    'first': msg[1],
    'second': msg[2],
    'third': msg[3]
};
```

### 逗号使用
1. 定义多个变量时尽量写入同一句语句，使用 逗号 + (空格 或者 换行) `, ( |\n)`分隔
2. 逗号不能出现在行首

```
var foo = 1,
    bar = 2,
    baz = 3;

var obj = {
    foo: 1,
    bar: 2,
    baz: 3
};
```