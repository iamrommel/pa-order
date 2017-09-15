import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { Container, variables } from 'native-base'

const deviceWidth = Dimensions.get('window').width

const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505301138/ilabyo/choco-divine.png',
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505301138/ilabyo/black-forest.png',
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505301140/ilabyo/tropical-zest.png',
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505304110/ilabyo/choco-divine-bg.jpg',
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505304112/ilabyo/black-forest-bg.jpg',
  'http://res.cloudinary.com/tmmshauler/image/upload/v1505304106/ilabyo/tropical-zest-bg.jpg'

]

export class Scroller extends Component {

  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  render () {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{flex: 1, width: variables.deviceWidth, height: variables.deviceHeight, alignSelf: 'stretch',}}
          resizeMode="contain"
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  {translateX: scrollBarVal},
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <Container>
        <View
          style={styles.container}
          flex={1}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={
              Animated.event(
                [{nativeEvent: {contentOffset: {x: this.animVal}}}]
              )
            }
          >

            {imageArray}

          </ScrollView>
          <View
            style={styles.barContainer}
          >
            {barArray}
          </View>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})