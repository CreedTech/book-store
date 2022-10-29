import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [myBooks, setMyBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch(
        'https://fudap-books-api.herokuapp.com/books/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await response.json();
      // console.log(json);
      setMyBooks(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  function renderMyBookSection(myBooks) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate('BookDetail', {
              book: item,
            })
          }
        >
          {/* Book Cover */}
          <Image
            source={{ uri: item.imgUrl }}
            resizeMode="cover"
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={icons.page_icon}
              style={{
                marginLeft: SIZES.radius,
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
            >
              {item.pages} pages
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1}}>
        {/* Header */}
        <View
          style={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom:10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white, alignItems:'center', textAlign:'center' }}>My Book</Text>

          
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={myBooks}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    );
  }

  function renderCategoryData(myBooks) {
    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={() =>
              navigation.navigate('BookDetail', {
                book: item,
              })
            }
          >
            {/* Book Cover */}
            <Image
              source={{ uri: item.imgUrl }}
              resizeMode="cover"
              style={{ width: 100, height: 150, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
              {/* Book name and author */}
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.white,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  {item.author}
                </Text>
              </View>

              {/* Book Info */}
              <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                <Image
                  source={icons.page_filled_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  {item.pages}
                </Text>

                <Image
                  source={icons.read_icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.lightGray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.lightGray,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  {item.publisher}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 5, right: 15 }}
            onPress={() => console.log('Bookmark')}
          >
            <Image
              source={icons.bookmark_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightGray,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View
        style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}
      >
        <FlatList
          vertical
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Body Section */}
      <ScrollView style={{ marginTop: SIZES.radius }}>
        {/* Books Section */}
        <View>{renderMyBookSection(myBooks)}</View>

        {/* Categories Section */}
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderCategoryData(myBooks)}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
