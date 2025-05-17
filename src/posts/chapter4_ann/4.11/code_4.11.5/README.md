# 4.11.5

---

> 对 4.11.5 进行的代码实现

## 依赖

本项目依赖 [fmt](https://github.com/fmtlib/fmt) 库。可用 vcpkg 或 conda 安装：

```shell
vcpkg install fmt
# 或
conda install -c conda-forge fmt
```

不过，由于已经添加了 vcpkg.json 文件，使用 vcpkg 安装时需要在项目根目录下运行：

```shell
vcpkg install --triplet x64-windows
```


## 运行测试

```shell
(cd src/posts/第四章\ 人工神经网络/4.11/code_4.11.5 && cmake --preset=default)
(cd src/posts/第四章\ 人工神经网络/4.11/code_4.11.5/ && cmake -S . -B build)
(cd src/posts/第四章\ 人工神经网络/4.11/code_4.11.5 && cmake --build build)
(cd src/posts/第四章\ 人工神经网络/4.11/code_4.11.5/ && cd build && ctest)
```

## 故障排除

如果报错，可以尝试：

```
cmake -G "Unix Makefiles" -S . -B build
cmake --build build
```