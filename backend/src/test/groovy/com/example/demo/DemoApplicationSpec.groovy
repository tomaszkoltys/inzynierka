package com.example.demo

import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest
class DemoApplicationSpec extends Specification {
    def "kocham antka"(){
        expect:
        1==1
    }
}
