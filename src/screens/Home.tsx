import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View
} from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../util/util";
import { VibrancyView } from "@react-native-community/blur";

function Home() {
  const flatListRef = useRef<FlatList>(null);
  const headerHeight = useHeaderHeight();
  const isDarkMode = useColorScheme() === "dark";
  const [currIndex, setCurrIndex] = useState(0);

  const [images] = useState(
    Array(2000).fill(
      "https://random-image-pepebigotes.vercel.app/api/random-image"
    )
  );

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrIndex(index);
    }
  }, []);

  const handlePrevButton = useCallback(() => {
    if (currIndex === 0) return;
    flatListRef?.current?.scrollToIndex({
      index: currIndex - 1,
      animated: true
    });
  }, [currIndex]);

  const handleNextButton = useCallback(() => {
    if (currIndex === images.length - 1) return;
    flatListRef?.current?.scrollToIndex({
      index: currIndex + 1,
      animated: true
    });
  }, [currIndex]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={images}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        ListHeaderComponent={
          <View style={{ height: headerHeight, backgroundColor: "black" }} />
        }
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              height: WINDOW_HEIGHT,
              width: WINDOW_WIDTH,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 40,
                fontWeight: "300",
                zIndex: 99,
                textAlign: "center"
              }}
            >
              {index + 1}
            </Text>
            <Image
              style={{
                height: "100%",
                width: "100%",
                position: "absolute"
              }}
              src={item}
            />
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: 60,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <TouchableWithoutFeedback onPress={() => handlePrevButton()}>
          <VibrancyView
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
            style={{ borderRadius: 8, width: WINDOW_WIDTH - 250 }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "700",
                padding: 10,
                borderRadius: 8,
                textAlign: "center"
              }}
            >
              Prev
            </Text>
          </VibrancyView>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handleNextButton()}>
          <VibrancyView
            blurType="light"
            blurAmount={10}
            style={{ borderRadius: 8, width: WINDOW_WIDTH - 250 }}
            reducedTransparencyFallbackColor="white"
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "700",
                padding: 10,
                borderRadius: 8,
                textAlign: "center"
              }}
            >
              Next
            </Text>
          </VibrancyView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default Home;