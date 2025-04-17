import { View, Image, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

interface CarouselItem {
  id: number;
  image: any;
}

interface RenderItemProps {
  item: CarouselItem;
  index: number;
}

const images: CarouselItem[] = [
  {
    id: 1,
    image: require('../../assets/top_carousel_images/hero.png'),
  },
  {
    id: 2,
    image: require('../../assets/top_carousel_images/jet.png'),
  },
];

const { width } = Dimensions.get('window');

const TopCarousel = () => {
  const renderItem = ({ item }: RenderItemProps) => (
    <View className="w-full h-[5.25rem]">
      <Image 
        source={item.image} 
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View className="w-full h-[5.25rem]">
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
        inactiveSlideScale={1} // Makes inactive slides same size as active
        inactiveSlideOpacity={1} // Makes inactive slides fully visible
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        removeClippedSubviews={false} // Prevents gaps on some devices
      />
    </View>
  );
};

export default TopCarousel;