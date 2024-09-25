import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<
    Array<{ quote: string; author: string }>
  >([]);
  const [reload, setReload] = useState<boolean>(false);

  const router = useRouter();
  // useEffect(() => {
  //   const loadFavorites = async () => {
  //     try {
  //       const fav = await AsyncStorage.getItem("favorites");
  //       setFavorites(fav ? JSON.parse(fav) : []);
  //     } catch (error) {
  //       console.error("Error loading favorites:", error);
  //     }
  //   };
  //   loadFavorites();
  // }, [reload]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const DeleteFromFavorites = async (quote: string, author: string) => {
    try {
      setReload(true);
      let favorites: { quote: string; author: string }[] = [];

      // Fetch the stored favorites from AsyncStorage
      const storedFavorites = await AsyncStorage.getItem("favorites");

      // Parse the favorites if they exist, otherwise use an empty array
      favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Filter out the item you want to delete
      favorites = favorites.filter(
        (fav: { quote: string; author: string }) =>
          fav.quote !== quote || fav.author !== author
      );

      // Save the updated favorites array
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
    setReload(false);
  }, [reload]);

  return (
    <View style={{ backgroundColor: "black", padding: 10, flex: 1 }}>
      <AntDesign
        onPress={() => router.replace("/screens/HomeScreen")}
        name="back"
        size={34}
        color="#fff"
      />
      <View style={{ padding: 10 }}>
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                borderColor: "#FF1900",
                padding: 20,
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                "{item.quote}"
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  onPress={() => DeleteFromFavorites(item.quote, item.author)}
                  name="trash"
                  size={22}
                  color="#FF1900"
                />
                <Text style={{ color: "#D400FF", fontSize: 16 }}>
                  - {item.author}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No favorites saved yet.</Text>
        )}
      </View>
    </View>
  );
};

export default FavoritesScreen;
