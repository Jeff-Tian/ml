cmake_minimum_required(VERSION 3.10)

project(HelloWorld)

find_package(fmt CONFIG REQUIRED)

add_executable(HelloWorld helloworld.cpp)

target_link_libraries(HelloWorld PRIVATE fmt::fmt)

# GoogleTest requires at least C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
    DOWNLOAD_EXTRACT_TIMESTAMP TRUE
)

# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()

add_executable(
    hello_test
    tests/hello_test.cc
)

add_executable(
    test_imagenet
    tests/test_imagenet.c
    tests/unity/unity.c
    pgmimage.c
    imagenet.c
    backprop.c
)

target_include_directories(
    test_imagenet
    PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/tests/unity
)

add_test(
    NAME TestImageNet
    COMMAND test_imagenet
)

target_link_libraries(
    hello_test
    GTest::gtest_main
)

target_link_libraries(
    test_imagenet
    PRIVATE
    m
)

include(GoogleTest)
gtest_discover_tests(hello_test)