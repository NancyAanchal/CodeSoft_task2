import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { API_KEY } from "@env";

const HomeScreen = () => {
  const router = useRouter();

  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("happiness");
  const [fav, setFav] = useState<boolean>(false);
  const [storedDate, setStoredDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          headers: { "X-Api-Key": API_KEY },
        }
      );
      const data = await response.json();
      const newQuote = data[0].quote;
      const newAuthor = data[0].author;

      setQuote(newQuote);
      setAuthor(newAuthor);
      setFav(false);
      await AsyncStorage.setItem(
        "storedQuote",
        JSON.stringify({ quote: newQuote, author: newAuthor })
      );

      const currentDate = new Date().toISOString().split("T")[0];
      await AsyncStorage.setItem("quoteFetchDate", currentDate);
    } catch (error) {
      console.error(error);
    }
  };

  const loadQuote = async () => {
    try {
      const storedQuote = await AsyncStorage.getItem("storedQuote");
      if (storedQuote) {
        const { quote: savedQuote, author: savedAuthor } =
          JSON.parse(storedQuote);
        setQuote(savedQuote);
        setAuthor(savedAuthor);

        const storedFavorites = await AsyncStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        const isFavorite = favorites.some(
          (fav: { quote: string; author: string }) =>
            fav.quote === savedQuote && fav.author === savedAuthor
        );

        setFav(isFavorite);

        const storedCategory = await AsyncStorage.getItem("category");
        if (storedCategory) {
          setCategory(storedCategory);
        }

        const stored = await AsyncStorage.getItem("quoteFetchDate");
        const current = new Date().toISOString().split("T")[0];
        setStoredDate(stored);
        setCurrentDate(current);
      } else {
        fetchQuote();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadQuote();
    if (storedDate !== currentDate) {
      fetchQuote();
    }
  }, [category]);

  const saveToFavorites = async (quote: string, author: string) => {
    try {
      let favorites: Array<{ quote: string; author: string }> = [];

      const storedFavorites = await AsyncStorage.getItem("favorites");

      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
      }

      favorites.push({ quote, author });

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const DeleteFromFavorities = async (quote: string, author: string) => {
    try {
      let favorites: { quote: string; author: string }[] = [];

      const storedFavorites = await AsyncStorage.getItem("favorites");
      favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      favorites = favorites.filter(
        (fav: { quote: string; author: string }) =>
          fav.quote !== quote || fav.author !== author
      );

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const handleCategory = async () => {
    try {
      await AsyncStorage.setItem("category", category);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderColor: "#FF1900",
            borderWidth: 1,
            borderRadius: 15,
            padding: 10,
            gap: 10,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.quoteText}>{quote}</Text>
            <Text style={styles.authorText}>- {author}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            {fav === false ? (
              <AntDesign
                onPress={() => {
                  saveToFavorites(quote, author);
                  setFav(true);
                }}
                name="hearto"
                size={30}
                color="#FF1900"
              />
            ) : (
              <AntDesign
                onPress={() => {
                  DeleteFromFavorities(quote, author);
                  setFav(false);
                }}
                name="heart"
                size={30}
                color="#FF1900"
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
          <Text style={styles.buttonText}>Change Quote</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF8800",
            flex: 1,
            padding: 16,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 15,
            alignItems: "center",
            minHeight: 120,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.largeButtonText}>Category</Text>
          <SelectDropdown
            data={[
              "age",
              "alone",
              "amazing",
              "anger",
              "architecture",
              "art",
              "attitude",
              "beauty",
              "best",
              "birthday",
              "business",
              "car",
              "change",
              "communication",
              "computers",
              "cool",
              "courage",
              "dad",
              "dating",
              "death",
              "design",
              "dreams",
              "education",
              "environmental",
              "equality",
              "experience",
              "failure",
              "faith",
              "family",
              "famous",
              "fear",
              "fitness",
              "food",
              "forgiveness",
              "freedom",
              "friendship",
              "funny",
              "future",
              "god",
              "good",
              "government",
              "graduation",
              "great",
              "happiness",
              "health",
              "history",
              "home",
              "hope",
              "humor",
              "imagination",
              "inspirational",
              "intelligence",
              "jealousy",
              "knowledge",
              "leadership",
              "learning",
              "legal",
              "life",
              "love",
              "marriage",
              "medical",
              "men",
              "mom",
              "money",
              "morning",
              "movies",
              "success",
            ]}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
              handleCategory();
              fetchQuote();
            }}
            renderButton={(selectedItem, isOpened) => (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || category}
                </Text>
                <AntDesign
                  name={isOpened ? "caretup" : "caretdown"}
                  size={18}
                  color="#fff"
                />
              </View>
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#558B2F",
            flex: 1,
            flexDirection: "row",
            gap: 8,
            padding: 20,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 150,
            marginBottom: 5,
          }}
          onPress={() => router.replace("/screens/FavoritesScreen")}
        >
          <Text style={styles.largeButtonText}>Favorites</Text>
          <AntDesign
            onPress={() => {
              DeleteFromFavorities(quote, author);
              setFav(false);
            }}
            name="heart"
            size={25}
            color="#FF1900"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",

    padding: 20,
  },
  quoteText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
  },
  authorText: {
    fontSize: 12,
    color: "#D400FF",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF1900",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 60,
    paddingVertical: 40,
    gap: 5,
  },

  largeButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  dropdownButtonStyle: {
    width: 200,
    height: 40,
    backgroundColor: "black",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },

  dropdownMenuStyle: {
    backgroundColor: "black",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});

export default HomeScreen;
