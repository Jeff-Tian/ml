#include "unity.h"

extern void load_target(); // 假设 load_target 方法的声明在其他地方

void test_load_target() {
    // 在这里添加针对 load_target 方法的测试用例
    TEST_ASSERT_EQUAL(expected_value, load_target(input_value)); // 示例测试
}

int main(void) {
    UNITY_BEGIN();
    RUN_TEST(test_load_target);
    return UNITY_END();
}