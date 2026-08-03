import { StyleSheet, Pressable, Text, Linking, Platform } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { Link } from "expo-router";
// trying to open google maps - need linking and platform DYI function to do this no extra API
const openMaps = () => {
  const address = "1600 Amphitheatre Parkway,Mountain View,California 94043";
  const encodedAddress = encodeURIComponent(address);
  // check platform
  const url = Platform.select({
    ios: `maps:0,0?q=${encodedAddress}`,
    android: `geo:0,0?q=${encodedAddress}`,
  });
  Linking.openURL(url).catch(() => {
    //
    // Fallback to Google Maps web URL if no maps app is available
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    );
  });
};
export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="coffee-maker.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Annes Coffee Shop
        </ThemedText>
      </ThemedView>
      <ThemedText>We offer the best coffee west of the White river</ThemedText>

      <Collapsible title="Address">
        <ThemedText style={styles.text}>
          Phone:{"\n"}
          <Link href="tel:5555555555" style={styles.link}>
            555-555-5555
          </Link>
          {"\n"}
          or{" "}
          <Link href="sms:5555555555" style={styles.link}>
            Click Here to Text!
          </Link>
        </ThemedText>
        <ThemedText>1600 Amphitheatre Parkway </ThemedText>

        <ThemedText>Mountain View,California 94043</ThemedText>
        <Pressable onPress={openMaps}>
          <ThemedText type="link">Open Map</ThemedText>
        </Pressable>
      </Collapsible>
      <Collapsible title="Menu">
        <ThemedText>We offer all kinds of coffee and pastries</ThemedText>
        <Link href="/menu" asChild>
          <Pressable>
            <Text style={styles.link}>Menu</Text>
          </Pressable>
        </Link>
      </Collapsible>
      <Collapsible title="Reviews">
        <ThemedText>What our customers are saying</ThemedText>

        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Open Google reviews</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  link: {
    textDecorationLine: "underline",
    // color: "#49BBEB",
    color: "#0A7EA7",
  },
});
