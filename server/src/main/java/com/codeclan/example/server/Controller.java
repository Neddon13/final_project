package com.codeclan.example.server;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping
    String home() {
        return "test";
    }

    @GetMapping(path ="/snake")
    String getSnake() {
        return "snake";
    }

    @GetMapping(path ="/flappy-bird")
    String getFlappyBird() {
        return "flappyBird";
    }

    @GetMapping(path ="/susies-adventure")
    String getSusiesAdventure() {
        return "susiesAdventure";
    }

    @GetMapping(path ="/codecland-adventure")
    String getCodeclandAdventure() {
        return "codeclandAdventure";
    }

}
