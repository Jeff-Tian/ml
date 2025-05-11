/* 标准 Unity 头文件 */
#ifndef UNITY_H
#define UNITY_H

#define UNITY_INCLUDE_SETUP_STUBS
#define UNITY_WEAK_ATTRIBUTE

#ifdef __cplusplus
extern "C"
{
#endif

#include <setjmp.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 类型定义 - 必须放在函数声明之前 */
typedef int UNITY_INT;

/* 基础测试宏 */
#define TEST_ASSERT_EQUAL(expected, actual) UnityAssertEqualNumber((UNITY_INT)(expected), (UNITY_INT)(actual), __LINE__, NULL)
#define RUN_TEST(func) run_test(func, #func)
#define UNITY_BEGIN() unity_begin()
#define UNITY_END() unity_end()

/* 支持函数声明 */
void setUp(void);
void tearDown(void);
void UnityAssertEqualNumber(UNITY_INT expected, UNITY_INT actual, unsigned short line, const char* msg);
int unity_begin(void);
int unity_end(void);
void run_test(void (*func)(void), const char* name);

#ifdef __cplusplus
}
#endif

#endif /* UNITY_H */