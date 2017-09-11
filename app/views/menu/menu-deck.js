import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base'

const cards = [
  {
    text: 'Menu One',
    name: 'One',
    image: require('../../assets/img/menu1.jpg'),
  },
  {
    text: 'Menu Two',
    name: 'Two',
    image: require('../../assets/img/menu2.jpg'),
  }, {
    text: 'Menu Three',
    name: 'Three',
    image: require('../../assets/img/menu3.jpg'),
  },
]

export const MenuDeck = () => {

  return (
    <Container>
      <View>
        <DeckSwiper
          dataSource={cards}
          renderItem={item =>
            <Card style={{elevation: 3}}>
              <CardItem>
                <Left>
                  <Thumbnail source={item.image}/>
                  <Body>
                  <Text>{item.text}</Text>
                  <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{height: 300, flex: 1}} source={item.image}/>
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{color: '#ED4A6A'}}/>
                <Text>{item.name}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
    </Container>
  )

}