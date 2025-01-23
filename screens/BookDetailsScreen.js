import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Header from "../components/Header";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useWishlist } from "../context/WishListContext";

const BookDetailsScreen = ({ route, navigation }) => {
  const { book, addToCart } = route.params;
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Use Wishlist context
  const isWishlisted = wishlist.some((item) => item._id === book._id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(book._id); // Remove from wishlist
    } else {
      addToWishlist(book); // Add to wishlist
    }
  };

  return (
    <>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <ScrollView>
        <View style={tw`p-6 bg-gray-100 flex-1`}>
          <Image
            source={{ uri: book.imgLink }}
            style={tw`w-full h-80 rounded-lg`}
            resizeMode="cover"
          />
          <Text style={tw`text-3xl font-bold mt-6`}>{book.title}</Text>
          <Text style={tw`text-green-600 text-2xl font-semibold mt-2`}>
            ${book.price}
          </Text>
          <Text style={tw`text-gray-600 text-base mt-4`}>
            {book.description}
          </Text>

          {/* Static Reviews Section */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewerName}>John Doe:</Text>
              <Text style={styles.reviewText}>
                "Amazing book! Highly recommend to everyone."
              </Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewerName}>Jane Smith:</Text>
              <Text style={styles.reviewText}>
                "A truly captivating story with great lessons."
              </Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewerName}>Alex Johnson:</Text>
              <Text style={styles.reviewText}>
                "Good read, but a bit slow in the middle chapters."
              </Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewerName}>Emily Davis:</Text>
              <Text style={styles.reviewText}>
                "The best book I've read this year. Highly recommended!"
              </Text>
            </View>
          </View>

          <View style={tw`flex-row mt-4 justify-between items-center`}>
            {/* Add to Cart Icon */}
            <TouchableOpacity onPress={() => addToCart(book)} style={tw`mr-4`}>
              <Text>
                <Fontisto name="shopping-basket-add" size={28} color="black" />
              </Text>
            </TouchableOpacity>

            {/* Wishlist Icon */}
            <TouchableOpacity onPress={handleWishlistToggle}>
              <Text>
                <AntDesign
                  name="heart"
                  size={28}
                  color={isWishlisted ? "#ef4444" : "#9ca3af"}
                />
              </Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            style={tw`mt-8 px-6 py-4 bg-blue-600 rounded-lg`}
            onPress={() => addToCart(book)}
          >
            <Text style={tw`text-white text-center text-lg font-bold`}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`mt-4 px-6 py-3 bg-red-500 rounded-lg`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-white text-center text-lg font-bold`}>
              Back
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    width: "100%",
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  reviewItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default BookDetailsScreen;
