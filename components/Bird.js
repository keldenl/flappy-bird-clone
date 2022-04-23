import React, { useState } from "react";
import { StyleSheet, View, Animated } from "react-native";

export function Bird({ body }) {
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View style={[styles.finger, { left: x, top: y, width, height }]} />
    );
}

const styles = StyleSheet.create({
    finger: {
        backgroundColor: 'red',
        position: "absolute"
    }
});