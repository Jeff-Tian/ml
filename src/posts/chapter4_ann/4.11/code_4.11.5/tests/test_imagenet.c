#include "tests/unity/unity.h"
#include "backprop.h"
#include "pgmimage.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 声明外部函数 */
extern void load_target(IMAGE *img, BPNN *net);
extern BPNN *bpnn_create(int n_in, int n_hidden, int n_out);
extern void bpnn_free(BPNN *net);

/* 测试辅助函数 */
IMAGE* create_test_image(const char* name) {
    IMAGE* img = (IMAGE*)malloc(sizeof(IMAGE));
    img->name = strdup(name);
    img->rows = 32;
    img->cols = 32;
    
    /* 修正：分配正确类型的数据 */
    img->data = (char*)malloc(32 * 32);
    memset(img->data, 0, 32 * 32);
    return img;
}

void free_test_image(IMAGE* img) {
    free(img->name);
    free(img->data);
    free(img);
}

/* 针对sunglasses的测试 */
void test_load_target_with_sunglasses(void) {
    IMAGE* img = create_test_image("user_head_smile_sunglasses_1.pgm");
    BPNN* net = bpnn_create(32*32, 0, 1); // 创建一个有一个输出单元的网络
    
    load_target(img, net);
    
    TEST_ASSERT_EQUAL(0.9, net->target[1]); // 应该被识别为高目标值(TARGET_HIGH)
    
    bpnn_free(net);
    free_test_image(img);
}

/* 针对非sunglasses的测试 */
void test_load_target_without_sunglasses(void) {
    IMAGE* img = create_test_image("user_head_smile_open_1.pgm");
    BPNN* net = bpnn_create(32*32, 0, 1);
    
    load_target(img, net);
    
    TEST_ASSERT_EQUAL(0.1, net->target[1]); // 应该被识别为低目标值(TARGET_LOW)
    
    bpnn_free(net);
    free_test_image(img);
}

void setUp(void) {}
void tearDown(void) {}

/* Unity 框架简化实现 */
int unity_begin(void) { printf("UNITY BEGIN\n"); return 0; }
int unity_end(void) { printf("UNITY END\n"); return 0; }
void run_test(void (*func)(void), const char* name) { 
    printf("Running %s\n", name); 
    func(); 
    printf("Test passed!\n");
}
void UnityAssertEqualNumber(UNITY_INT expected, UNITY_INT actual, unsigned short line, const char* msg) {
    if (expected != actual) {
        printf("TEST FAILED at line %d: Expected %d but got %d\n", line, (int)expected, (int)actual);
        exit(1);
    }
}

int main(void) {
    UNITY_BEGIN();
    RUN_TEST(test_load_target_with_sunglasses);
    RUN_TEST(test_load_target_without_sunglasses);
    return UNITY_END();
}